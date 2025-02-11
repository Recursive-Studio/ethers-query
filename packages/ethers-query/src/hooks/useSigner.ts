import { type BrowserProvider, type JsonRpcSigner } from 'ethers'
import { useEffect, useMemo, useState, useSyncExternalStore } from 'react'
import { useEthersQuery } from '../context.js'

/**
 * Hook for accessing the current ethers Signer instance
 * @category Hooks
 * @beta
 * 
 * @returns The current ethers JsonRpcSigner instance or null if not connected
 * 
 * @example
 * ```tsx
 * import { useSigner } from 'ethers-query'
 * 
 * function Component() {
 *   const signer = useSigner()
 * 
 *   const sendTransaction = async () => {
 *     if (!signer) return
 *     
 *     try {
 *       const tx = await signer.sendTransaction({
 *         to: '0x...',
 *         value: '1000000000000000000' // 1 ETH
 *       })
 *       await tx.wait()
 *       console.log('Transaction confirmed')
 *     } catch (error) {
 *       console.error('Transaction failed:', error)
 *     }
 *   }
 * 
 *   return (
 *     <button onClick={sendTransaction} disabled={!signer}>
 *       Send 1 ETH
 *     </button>
 *   )
 * }
 * ```
 */
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