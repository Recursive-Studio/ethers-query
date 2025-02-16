import { BrowserProvider, type Provider } from 'ethers';
import type { Connector, ConnectorData } from './base.js';

declare global {
    interface Window {
        ethereum?: any
    }
}

/**
 * Connector for injected Web3 providers (e.g., MetaMask)
 * @module Connectors
 * @beta
 * 
 * This connector supports any EIP-1193 compliant injected provider,
 * but is primarily tested with MetaMask.
 * 
 * @example
 * ```typescript
 * import { Client, InjectedConnector } from 'ethers-query'
 * 
 * const client = new Client({
 *   connectors: [new InjectedConnector()]
 * })
 * 
 * // Connect using injected provider (e.g., MetaMask)
 * await client.connect()
 * ```
 */
export class InjectedConnector implements Connector {
    /** Unique identifier for the injected connector */
    readonly id = 'injected'

    /** Human-readable name for the injected connector */
    readonly name = 'Browser Wallet'
    
    private provider: BrowserProvider | null = null
    private initializing: boolean = false
    
    /**
     * Initialize the connector by setting up the provider and event listeners
     * @internal
     */
    private async initialize(): Promise<void> {
        if (this.initializing) return
        this.initializing = true
        
        try {
            if (typeof window === 'undefined') {
                console.log('[InjectedConnector] Window is undefined')
                return
            }
            
            const ethereum = window.ethereum
            if (!ethereum?.request) {
                console.log('[InjectedConnector] No ethereum provider found')
                return
            }
            
            console.log('[InjectedConnector] Initializing with ethereum:', {
                isMetaMask: ethereum.isMetaMask,
                selectedAddress: ethereum.selectedAddress,
                chainId: ethereum.chainId
            })
            
            this.provider = new BrowserProvider(ethereum)
            console.log('[InjectedConnector] Provider initialized:', this.provider)
            
            // Set up event listeners
            ethereum.on('accountsChanged', (accounts: string[]) => {
                console.log('[InjectedConnector] accountsChanged event:', accounts)
                this.onAccountsChanged(accounts)
            })
            ethereum.on('chainChanged', (chainId: string) => {
                console.log('[InjectedConnector] chainChanged event:', chainId)
                this.onChainChanged(chainId)
            })
            ethereum.on('disconnect', () => {
                console.log('[InjectedConnector] disconnect event')
                this.onDisconnect()
            })
        } finally {
            this.initializing = false
        }
    }
    
    /**
     * Connect to the injected provider
     * @returns Connection data including account, chain ID, and provider
     * @throws If no provider is available or connection fails
     */
    async connect(): Promise<ConnectorData> {
        console.log('[InjectedConnector] Connecting...')
        await this.initialize()
        if (!this.provider) throw new Error('No provider available')
        
        const accounts = await this.provider.send('eth_requestAccounts', [])
        console.log('[InjectedConnector] Got accounts:', accounts)
        const account = accounts[0] ?? null
        const chainId = await this.getChainId()
        
        console.log('[InjectedConnector] Returning provider in connect:', this.provider)
        return {
            account,
            chainId,
            provider: this.provider
        }
    }
    
    /**
     * Disconnect from the injected provider
     * Cleans up the provider instance and removes event listeners
     */
    async disconnect(): Promise<void> {
        console.log('[InjectedConnector] Disconnecting, current provider:', this.provider)
        
        try {
            // Clear any stored connection state first
            try {
                localStorage.removeItem('ethers-query:connected')
            } catch (error) {
                console.error('[InjectedConnector] Failed to clear localStorage:', error)
            }

            // Only attempt cleanup if we have a provider
            if (this.provider) {
                const ethereum = window.ethereum
                
                // Remove event listeners if ethereum object exists
                if (ethereum) {
                    ethereum.removeListener('accountsChanged', this.onAccountsChanged)
                    ethereum.removeListener('chainChanged', this.onChainChanged)
                    ethereum.removeListener('disconnect', this.onDisconnect)
                    
                    // Try to revoke wallet permissions if supported
                    try {
                        console.log('[InjectedConnector] Revoking permissions')
                        await ethereum.request({
                            method: 'wallet_revokePermissions',
                            params: [{ eth_accounts: {} }]
                        })
                    } catch (error) {
                        // Not all wallets support revoking permissions
                        console.log('[InjectedConnector] Wallet does not support revoking permissions:', error)
                    }
                }
                
                // Safely destroy provider if it's in a valid state
                try {
                    // Check if the provider is in a valid state before destroying
                    const isValid = await this.provider.getNetwork()
                        .then(() => true)
                        .catch(() => false)
                    
                    if (isValid) {
                        await this.provider.destroy()
                    } else {
                        console.log('[InjectedConnector] Provider is not in a valid state, skipping destroy')
                    }
                } catch (error) {
                    console.error('[InjectedConnector] Error destroying provider:', error)
                }
            }
        } catch (error) {
            console.error('[InjectedConnector] Error during disconnect:', error)
        } finally {
            // Always ensure provider is nullified at the end
            this.provider = null
        }
    }
    
    /**
     * Get the current provider instance
     * @returns The ethers Provider instance or null if not connected
     */
    async getProvider(): Promise<Provider | null> {
        await this.initialize()
        console.log('[InjectedConnector] getProvider returning:', this.provider)
        return this.provider
    }
    
    /**
     * Check if wallet is currently connected
     * @returns True if connected, false otherwise
     */
    async isConnected(): Promise<boolean> {
        await this.initialize()
        if (!this.provider) return false
        
        try {
            const accounts = await this.provider.send('eth_accounts', [])
            return accounts.length > 0
        } catch {
            return false
        }
    }
    
    /**
     * Get the current account address
     * @returns The connected account address or null if not connected
     */
    async getAccount(): Promise<string | null> {
        await this.initialize()
        if (!this.provider) return null
        
        try {
            const accounts = await this.provider.send('eth_accounts', [])
            return accounts[0] ?? null
        } catch {
            return null
        }
    }
    
    /**
     * Get the current chain ID
     * @returns The current chain ID or null if not connected
     */
    async getChainId(): Promise<number | null> {
        await this.initialize()
        if (!this.provider) return null
        
        try {
            const network = await this.provider.getNetwork()
            return Number(network.chainId)
        } catch {
            return null
        }
    }
    
    /**
     * Handler for account changes from the provider
     * @param accounts Array of new account addresses
     */
    onAccountsChanged(accounts: string[]): void {
        // This will be implemented by the client
    }
    
    /**
     * Handler for chain changes from the provider
     * @param chainId New chain ID (hex string)
     */
    onChainChanged(chainId: string): void {
        // This will be implemented by the client
    }
    
    /**
     * Handler for disconnect events from the provider
     * Cleans up the provider instance and connection state
     */
    onDisconnect(): void {
        console.log('[InjectedConnector] onDisconnect called')
        
        try {
            // Clear connection state immediately
            try {
                localStorage.removeItem('ethers-query:connected')
            } catch (error) {
                console.error('[InjectedConnector] Failed to clear localStorage:', error)
            }
            
            // Schedule provider cleanup to avoid race conditions
            setTimeout(() => {
                if (this.provider) {
                    try {
                        const ethereum = window.ethereum
                        if (ethereum) {
                            ethereum.removeListener('accountsChanged', this.onAccountsChanged)
                            ethereum.removeListener('chainChanged', this.onChainChanged)
                            ethereum.removeListener('disconnect', this.onDisconnect)
                        }
                        
                        this.provider.destroy()
                        this.provider = null
                        console.log('[InjectedConnector] Provider cleanup completed')
                    } catch (error) {
                        console.error('[InjectedConnector] Error during provider cleanup:', error)
                        this.provider = null
                    }
                }
            }, 0)
        } catch (error) {
            console.error('[InjectedConnector] Error in onDisconnect:', error)
            this.provider = null
        }
    }
}