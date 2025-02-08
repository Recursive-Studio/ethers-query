import { type BrowserProvider, type JsonRpcSigner } from 'ethers'
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useEthersQuery } from '../context.js'

export const useSigner = () => {
    const client = useEthersQuery()
    const [signer, setSigner] = useState<JsonRpcSigner | null>(null)
    console.log('[useSigner] signer', signer)

    const getSnapshot = useMemo(() => {
        return () => {
            const state = client.getState()

            if (!state.data?.provider || !state.isInitialized || state.status !== 'connected') {
                return null
            }
            
            return state.data.provider as BrowserProvider
        }
    }, [client])

    const provider = useSyncExternalStore<BrowserProvider | null>(
        (onChange) => client.subscribe(onChange),
        getSnapshot,
        getSnapshot
    )

    console.log('[useSigner] testing provider', provider)

    useEffect(() => {
        let mounted = true

        const updateSigner = async () => {
            if (!provider) {
                if (mounted) setSigner(null)
                return
            }

            try {

                const newSigner = await provider.getSigner()
                if (mounted) setSigner(newSigner)
            } catch (error) {
                console.error('[useSigner] Error getting signer:', error)
                if (mounted) setSigner(null)
            }
        }

        updateSigner()
        return () => {
            mounted = false
        }
    }, [provider])

    console.log('[useSigner] returning signer', signer)
    return signer
}