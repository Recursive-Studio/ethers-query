import type { Provider } from 'ethers'
import { useEffect, useState } from 'react'
import { useEthersQuery } from '../context.js'

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
    const [data, setData] = useState<AccountData>(() => {
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
    })
    
    useEffect(() => {
        return client.subscribe((state) => {
            setData({
                address: state.data?.account ?? null,
                chainId: state.data?.chainId ?? null,
                isConnected: state.status === 'connected',
                isConnecting: state.status === 'connecting' || state.status === 'reconnecting',
                isDisconnected: state.status === 'disconnected',
                isInitialized: state.isInitialized,
                provider: state.data?.provider ?? null
            })
        })
    }, [client])
    
    // During SSR or before initialization, return a loading state
    if (!data.isInitialized) {
        return {
            address: null,
            chainId: null,
            isConnected: false,
            isConnecting: true,
            isDisconnected: false,
            isInitialized: false,
            provider: null
        }
    }
    
    return data
} 
