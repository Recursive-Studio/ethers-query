import { useMutation, useQuery } from '@tanstack/react-query'
import type { ContractRunner, InterfaceAbi } from 'ethers'
import { Contract } from 'ethers'
import { useProvider } from './useProvider.js'
import { useSigner } from './useSigner.js'

/**
 * Type of contract function (read or write)
 * @category Hooks
 * @beta
 */
export type ContractFunctionType = 'pure' | 'view' | 'nonpayable' | 'payable'

/**
 * Configuration options for the useSmartContract hook
 * @category Hooks
 * @beta
 */
export type UseSmartContractConfig<
  TAbi extends InterfaceAbi = InterfaceAbi,
  TFunctionName extends string = string,
  TArgs extends readonly unknown[] = readonly unknown[]
> = {
  /** The contract address */
  address: string
  /** The contract ABI */
  abi: TAbi
  /** The name of the function to call */
  functionName: TFunctionName
  /** Arguments to pass to the function */
  args?: TArgs
  /** Whether to enable automatic data fetching for read functions */
  enabled?: boolean
}

/**
 * Return type of the useSmartContract hook
 * @category Hooks
 * @beta
 */
export type UseSmartContractResult<TData = unknown> = {
  /** The data returned from the last successful read operation */
  data: TData | undefined
  /** Error that occurred during the last operation */
  error: Error | null
  /** Whether an operation is in progress */
  isLoading: boolean
  /** Whether the last operation resulted in an error */
  isError: boolean
  /** Function to execute a read operation */
  read: () => Promise<TData>
  /** Function to execute a write operation */
  write: () => Promise<TData>
}

/**
 * Hook for interacting with smart contracts
 * @category Hooks
 * @beta
 * 
 * @returns Object containing contract interaction methods and state
 * 
 * @example
 * ```tsx
 * import { useSmartContract } from 'ethers-query'
 * 
 * // ERC20 token example
 * function TokenBalance() {
 *   const contract = useSmartContract({
 *     address: '0x...',
 *     abi: ['function balanceOf(address) view returns (uint256)'],
 *     functionName: 'balanceOf',
 *     args: ['0x...'] // address to check
 *   })
 * 
 *   const fetchBalance = async () => {
 *     try {
 *       const balance = await contract.read()
 *       console.log('Balance:', balance.toString())
 *     } catch (error) {
 *       console.error('Error:', error)
 *     }
 *   }
 * 
 *   return (
 *     <div>
 *       <button onClick={fetchBalance} disabled={contract.isLoading}>
 *         Get Balance
 *       </button>
 *       {contract.data && <div>Balance: {contract.data.toString()}</div>}
 *       {contract.error && <div>Error: {contract.error.message}</div>}
 *     </div>
 *   )
 * }
 * 
 * // Write function example
 * function Transfer() {
 *   const contract = useSmartContract({
 *     address: '0x...',
 *     abi: ['function transfer(address,uint256)'],
 *     functionName: 'transfer',
 *     args: ['0x...', '1000000000000000000'] // recipient and amount
 *   })
 * 
 *   const handleTransfer = async () => {
 *     try {
 *       const tx = await contract.write()
 *       console.log('Transaction:', tx)
 *     } catch (error) {
 *       console.error('Error:', error)
 *     }
 *   }
 * 
 *   return (
 *     <button onClick={handleTransfer} disabled={contract.isLoading}>
 *       Transfer
 *     </button>
 *   )
 * }
 * ```
 */
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