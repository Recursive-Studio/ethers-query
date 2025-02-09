import { useMutation, useQuery } from '@tanstack/react-query'
import type { ContractRunner, InterfaceAbi } from 'ethers'
import { Contract } from 'ethers'
import { useProvider } from './useProvider.js'
import { useSigner } from './useSigner.js'

export type ContractFunctionType = 'pure' | 'view' | 'nonpayable' | 'payable'

export type UseSmartContractConfig<
  TAbi extends InterfaceAbi = InterfaceAbi,
  TFunctionName extends string = string,
  TArgs extends readonly unknown[] = readonly unknown[]
> = {
  address: string
  abi: TAbi
  functionName: TFunctionName
  args?: TArgs
  enabled?: boolean
}

export type UseSmartContractResult<TData = unknown> = {
  data: TData | undefined
  error: Error | null
  isLoading: boolean
  isError: boolean
  read: () => Promise<TData>
  write: () => Promise<TData>
}

export function useSmartContract<
  TAbi extends InterfaceAbi,
  TFunctionName extends string,
  TArgs extends readonly unknown[] = readonly unknown[],
  TData = unknown
>({
  address,
  abi,
  functionName,
  args = [] as unknown as TArgs,
  enabled = true
}: UseSmartContractConfig<TAbi, TFunctionName, TArgs>): UseSmartContractResult<TData> {
  const provider = useProvider()
  const signer = useSigner()

  // Helper to create contract instance
  const getContract = (runner: ContractRunner) => {
    return new Contract(address, abi, runner)
  }

  // Determine if the function is read-only or write
  const isReadFunction = (contract: Contract) => {
    const fragment = contract.interface.getFunction(functionName)
    if (!fragment) throw new Error(`Function ${functionName} not found in contract`)
    return fragment.stateMutability === 'view' || fragment.stateMutability === 'pure'
  }

  // Query for read operations
  const {
    data: readData,
    error: readError,
    isLoading: readLoading,
    refetch
  } = useQuery({
    queryKey: ['contract', address, functionName, args],
    queryFn: async () => {
      if (!provider) throw new Error('Provider not available')
      const contract = getContract(provider)
      
      if (!isReadFunction(contract)) {
        throw new Error('Function is not a read operation')
      }

      return contract[functionName](...args) as Promise<TData>
    },
    enabled: false // Disable by default, let the provider control this
  })

  // Mutation for write operations
  const {
    mutateAsync: executeMutation,
    error: writeError,
    status: writeStatus
  } = useMutation({
    mutationKey: ['contract', address, functionName, args],
    mutationFn: async () => {
      if (!signer) throw new Error('Signer not available')
      const contract = getContract(signer)
      
      if (isReadFunction(contract)) {
        throw new Error('Function is not a write operation')
      }

      const tx = await contract[functionName](...args)
      const receipt = await tx.wait()
      return receipt as TData
    }
  })

  const read = async () => {
    const result = await refetch()
    if (result.error) throw result.error
    return result.data as TData
  }

  const write = async () => {
    const result = await executeMutation()
    return result
  }

  return {
    data: readData,
    error: readError || writeError,
    isLoading: readLoading || writeStatus === 'pending',
    isError: !!readError || !!writeError,
    read,
    write
  }
} 