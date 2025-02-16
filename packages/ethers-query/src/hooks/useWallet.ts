import { useMutation } from '@tanstack/react-query'
import { useEthersQuery } from '../context.js'
import { useAccount } from './useAccount.js'

/**
 * Arguments for connecting a wallet
 * @category Hooks
 * @beta
 */
export type ConnectArgs = {
  /** The connector ID to use for connecting */
  connectorId: string
}

/**
 * Return type of the useWallet hook
 * @category Hooks
 * @beta
 */
export type UseWalletResult = {
  /** Function to connect a wallet */
  connect: (args: ConnectArgs) => Promise<void>
  /** Function to disconnect the current wallet */
  disconnect: () => Promise<void>
  /** Whether a connection operation is in progress */
  isConnecting: boolean
  /** Whether a disconnection operation is in progress */
  isDisconnecting: boolean
  /** Error that occurred during the last operation */
  error: Error | null
}

/**
 * Hook for managing wallet connections
 * @category Hooks
 * @beta
 * 
 * @returns Object containing wallet connection management functions and state
 * 
 * @example
 * ```tsx
 * import { useWallet } from 'ethers-query'
 * 
 * function Component() {
 *   const { 
 *     connect, 
 *     disconnect,
 *     isConnecting,
 *     isDisconnecting,
 *     error 
 *   } = useWallet()
 * 
 *   const handleConnect = async () => {
 *     try {
 *       await connect({ connectorId: 'injected' })
 *     } catch (error) {
 *       console.error('Failed to connect:', error)
 *     }
 *   }
 * 
 *   const handleDisconnect = async () => {
 *     try {
 *       await disconnect()
 *     } catch (error) {
 *       console.error('Failed to disconnect:', error)
 *     }
 *   }
 * 
 *   return (
 *     <div>
 *       <button onClick={handleConnect} disabled={isConnecting}>
 *         {isConnecting ? 'Connecting...' : 'Connect Wallet'}
 *       </button>
 *       <button onClick={handleDisconnect} disabled={isDisconnecting}>
 *         {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
 *       </button>
 *       {error && <div>Error: {error.message}</div>}
 *     </div>
 *   )
 * }
 * ```
 */
export function useWallet(): UseWalletResult {
  const client = useEthersQuery()
  const { isConnected } = useAccount()

  const {
    mutateAsync: connectAsync,
    isPending: isConnecting,
    error: connectError
  } = useMutation({
    mutationKey: ['connect'],
    mutationFn: async ({ connectorId }: ConnectArgs) => {
      await client.connect(connectorId)
    }
  })

  const {
    mutateAsync: disconnectAsync,
    isPending: isDisconnecting,
    error: disconnectError
  } = useMutation({
    mutationKey: ['disconnect'],
    mutationFn: async () => {
      if (!isConnected) return
      await client.disconnect()
    }
  })

  return {
    connect: connectAsync,
    disconnect: disconnectAsync,
    isConnecting,
    isDisconnecting,
    error: connectError || disconnectError
  }
} 