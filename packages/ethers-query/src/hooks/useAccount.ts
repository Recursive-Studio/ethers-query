import type { Provider } from 'ethers'
import { useMemo } from 'react'
import { useEthersQuery } from '../context.js'
import { useSyncExternalStoreWithTracked } from './useSyncExternalStoreWithTracked.js'

export interface AccountData {
    address: string | null
    chainId: number | null
    isConnected: boolean
    isConnecting: boolean
    isDisconnected: boolean
    isInitialized: boolean
    provider: Provider | null
}

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
