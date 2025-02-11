import { type Provider } from 'ethers'

/**
 * Data returned by a wallet connector after successful connection
 * @category Connectors
 * @group Types
 * @beta
 */
export type ConnectorData = {
    /** The connected account address or null if not available */
    account: string | null
    /** The current chain ID or null if not available */
    chainId: number | null
    /** The ethers Provider instance or null if not available */
    provider: Provider | null
}

/**
 * Base interface for wallet connectors
 * @category Connectors
 * @group Interfaces
 * @beta
 *
 * @example
 * ```typescript
 * class MyConnector implements Connector {
 *   readonly id = 'my-connector'
 *   readonly name = 'My Wallet'
 *   
 *   async connect() {
 *     // Implementation
 *   }
 *   
 *   // ... other methods
 * }
 * ```
 */
export interface Connector {
    /** Unique identifier for the connector */
    readonly id: string

    /** Human-readable name for the connector */
    readonly name: string
    
    /**
     * Connect to the wallet
     * @returns Connection data including account, chain ID, and provider
     * @throws If connection fails or is rejected
     */
    connect(): Promise<ConnectorData>

    /**
     * Disconnect from the wallet
     * Cleans up any connections and event listeners
     */
    disconnect(): Promise<void>

    /**
     * Get the current provider instance
     * @returns The ethers Provider instance
     * @throws If no provider is available
     */
    getProvider(): Promise<Provider | null>

    /**
     * Check if wallet is currently connected
     * @returns True if connected, false otherwise
     */
    isConnected(): Promise<boolean>

    /**
     * Get the current account address
     * @returns The connected account address or null if not connected
     */
    getAccount(): Promise<string | null>

    /**
     * Get the current chain ID
     * @returns The current chain ID or null if not connected
     */
    getChainId(): Promise<number | null>
    
    /**
     * Handler for account changes from the wallet
     * @param accounts Array of new account addresses
     */
    onAccountsChanged?(accounts: string[]): void

    /**
     * Handler for chain changes from the wallet
     * @param chainId New chain ID (decimal or hex)
     */
    onChainChanged?(chainId: string | number): void

    /**
     * Handler for disconnect events from the wallet
     */
    onDisconnect?(): void
} 