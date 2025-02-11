import { useQuery } from '@tanstack/react-query'
import { formatEther, type Provider } from 'ethers'
import { useProvider } from './useProvider.js'

/**
 * Configuration options for the useBalance hook
 * @category Hooks
 * @beta
 */
export type UseBalanceConfig = {
  /** The address to check the balance for */
  address?: string
  /** Whether to format the balance in ETH (default: false) */
  formatUnits?: boolean
  /** Whether to enable automatic balance updates */
  enabled?: boolean
  /** How frequently to poll for balance updates (in ms) */
  pollingInterval?: number
}

/**
 * Return type of the useBalance hook
 * @category Hooks
 * @beta
 */
export type UseBalanceResult = {
  /** The account balance in wei (or ETH if formatUnits is true) */
  data?: string
  /** Error that occurred while fetching balance */
  error: Error | null
  /** Whether the balance is currently being fetched */
  isLoading: boolean
  /** Whether the last fetch resulted in an error */
  isError: boolean
  /** Function to manually refetch the balance */
  refetch: () => Promise<string>
}

/**
 * Hook for fetching account balances
 * @category Hooks
 * @beta
 * 
 * @returns Object containing the account balance and loading state
 * 
 * @example
 * ```tsx
 * import { useBalance } from 'ethers-query'
 * 
 * function Component() {
 *   const { 
 *     data: balance, 
 *     isLoading,
 *     error 
 *   } = useBalance({
 *     address: '0x...',
 *     formatUnits: true
 *   })
 * 
 *   if (isLoading) return <div>Loading...</div>
 *   if (error) return <div>Error: {error.message}</div>
 * 
 *   return <div>Balance: {balance} ETH</div>
 * }
 * ```
 */
export function useBalance({
  address,
  formatUnits = false,
  enabled = true,
  pollingInterval = 4_000
}: UseBalanceConfig = {}): UseBalanceResult {
  const provider = useProvider()
  console.log('[useBalance] provider', provider);
  const fetchBalance = async (provider: Provider, address: string) => {
    const balance = await provider.getBalance(address)
    console.log('[useBalance] balance', balance);
    return formatUnits ? formatEther(balance) : balance.toString()
  }

  const {
    data,
    error,
    isLoading,
    refetch: queryRefetch
  } = useQuery({
    queryKey: ['balance', address],
    queryFn: async () => {
      console.log('[useBalance] queryFn', provider, address);
      if (!provider || !address) throw new Error('Provider or address not available')
      return fetchBalance(provider, address)
    },
    enabled: Boolean(provider && address && enabled),
    refetchInterval: enabled ? pollingInterval : false
  })

  const refetch = async (): Promise<string> => {
    const result = await queryRefetch()
    if (result.error) throw result.error
    return result.data as string
  }

  return {
    data,
    error,
    isLoading,
    isError: !!error,
    refetch
  }
} 