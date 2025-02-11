import { type FC, type ReactNode, createContext, useContext } from 'react'
import type { Client } from './client.js'

/**
 * Internal context for sharing the ethers-query Client instance
 * @internal
 */
const EthersQueryContext = createContext<Client | undefined>(undefined)

/**
 * Props for the EthersQueryProvider component
 * @category Context
 * @beta
 */
export interface EthersQueryProviderProps {
    /** The ethers-query Client instance */
    client: Client
    /** React children */
    children: ReactNode
}

/**
 * Provider component for making the ethers-query Client available throughout the app
 * @category Context
 * @beta
 * 
 * @example
 * ```tsx
 * import { EthersQueryProvider, Client, InjectedConnector } from 'ethers-query'
 * 
 * const client = new Client({
 *   connectors: [new InjectedConnector()]
 * })
 * 
 * function App() {
 *   return (
 *     <EthersQueryProvider client={client}>
 *       <YourApp />
 *     </EthersQueryProvider>
 *   )
 * }
 * ```
 */
export const EthersQueryProvider: FC<EthersQueryProviderProps> = ({ 
    children, 
    client 
}) => {
    return (
        <EthersQueryContext.Provider value={client}>
            {children}
        </EthersQueryContext.Provider>
    )
}

/**
 * Hook for accessing the ethers-query Client instance
 * @category Context
 * @beta
 * 
 * @returns The ethers-query Client instance
 * @throws Error if used outside of EthersQueryProvider
 * 
 * @example
 * ```tsx
 * import { useEthersQuery } from 'ethers-query'
 * 
 * function Component() {
 *   const client = useEthersQuery()
 * 
 *   const handleConnect = async () => {
 *     await client.connect()
 *   }
 * 
 *   return (
 *     <button onClick={handleConnect}>
 *       Connect Wallet
 *     </button>
 *   )
 * }
 * ```
 */
export function useEthersQuery(): Client {
    const client = useContext(EthersQueryContext)
    if (!client) {
        throw new Error('useEthersQuery must be used within an EthersQueryProvider')
    }
    return client
} 