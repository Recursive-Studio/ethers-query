import { BrowserProvider, type Provider } from 'ethers'
import type { Connector, ConnectorData } from './base.js'

declare global {
    interface Window {
        ethereum?: any
    }
}

export class InjectedConnector implements Connector {
    readonly id = 'injected'
    readonly name = 'Browser Wallet'
    
    private provider: BrowserProvider | null = null
    private initializing: boolean = false
    
    private async initialize(): Promise<void> {
        if (this.initializing) return
        this.initializing = true
        
        try {
            if (typeof window === 'undefined') return
            
            const ethereum = window.ethereum
            if (!ethereum?.request) return
            
            console.log('[InjectedConnector] Initializing with ethereum:', {
                isMetaMask: ethereum.isMetaMask,
                selectedAddress: ethereum.selectedAddress,
                chainId: ethereum.chainId
            })
            
            this.provider = new BrowserProvider(ethereum)
            
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
    
    async connect(): Promise<ConnectorData> {
        console.log('[InjectedConnector] Connecting...')
        await this.initialize()
        if (!this.provider) throw new Error('No provider available')
        
        const accounts = await this.provider.send('eth_requestAccounts', [])
        console.log('[InjectedConnector] Got accounts:', accounts)
        const account = accounts[0] ?? null
        const chainId = await this.getChainId()
        
        return {
            account,
            chainId,
            provider: this.provider
        }
    }
    
    async disconnect(): Promise<void> {
        console.log('[InjectedConnector] Disconnecting')
        this.provider = null
    }
    
    async getProvider(): Promise<Provider | null> {
        await this.initialize()
        return this.provider
    }
    
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
    
    onAccountsChanged(accounts: string[]): void {
        // This will be implemented by the client
    }
    
    onChainChanged(chainId: string): void {
        // This will be implemented by the client
    }
    
    onDisconnect(): void {
        // This will be implemented by the client
        this.provider = null
    }
}