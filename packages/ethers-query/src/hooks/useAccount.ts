import type { Provider } from 'ethers'
import { useEffect, useState } from 'react'
import { useEthersQuery } from '../context.js'

export interface AccountData {
    address: string | null
    chainId: number | null
    isConnected: boolean
    isConnecting: boolean
    isDisconnected: boolean
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
                provider: state.data?.provider ?? null
            })
        })
    }, [client])
    
    return data
} 
