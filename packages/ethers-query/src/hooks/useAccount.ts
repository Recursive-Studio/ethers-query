import type { Provider } from 'ethers'
import { useMemo } from 'react'
import { useEthersQuery } from '../context.js'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

/**
 * Data returned by the useAccount hook
 * @category Hooks
 * @beta
 */
export interface AccountData {
    /** The connected account address or null if not connected */
    address: string | null
    /** The current chain ID or null if not connected */
    chainId: number | null
    /** Whether the wallet is currently connected */
    isConnected: boolean
    /** Whether the wallet is in the process of connecting */
    isConnecting: boolean
    /** Whether the wallet is disconnected */
    isDisconnected: boolean
    /** Whether the wallet connection has been initialized */
    isInitialized: boolean
    /** The current ethers Provider instance or null if not connected */
    provider: Provider | null
}

/**
 * Hook for accessing the current account state
 * @category Hooks
 * @beta
 * 
 * @returns Account data including connection status, address, and chain ID
 * 
 * @example
 * ```tsx
 * import { useAccount } from 'ethers-query'
 * 
 * function Component() {
 *   const { 
 *     address, 
 *     chainId,
 *     isConnected,
 *     isConnecting 
 *   } = useAccount()
 * 
 *   if (isConnecting) return <div>Connecting...</div>
 *   if (!isConnected) return <div>Not connected</div>
 * 
 *   return (
 *     <div>
 *       Connected to {address} on chain {chainId}
 *     </div>
 *   )
 * }
 * ```
 */
export function useAccount(): AccountData {
    const client = useEthersQuery()
    
    const getSnapshot = useMemo(() => {
        return () => {
            const state = client.getState()
            return {
                address: state.data?.account ?? null,
                chainId: state.data?.chainId ?? null,
                isConnected: state.status === 'connected',
                isConnecting: state.status === 'connecting' || state.status === 'reconnecting',
                isDisconnected: state.status === 'disconnected',
                isInitialized: state.isInitialized,
                provider: state.data?.provider ?? null
            }
        }
    }, [client])

    return useSyncExternalStoreWithTracked(
        (onChange) => client.subscribe(onChange),
        getSnapshot
    )
} 
