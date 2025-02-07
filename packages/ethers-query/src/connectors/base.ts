import { type Provider } from 'ethers'

export type ConnectorData = {
    account: string | null
    chainId: number | null
    provider: Provider | null
}

export interface Connector {
    readonly id: string
    readonly name: string
    
    connect(): Promise<ConnectorData>
    disconnect(): Promise<void>
    getProvider(): Promise<Provider | null>
    isConnected(): Promise<boolean>
    getAccount(): Promise<string | null>
    getChainId(): Promise<number | null>
    
    onAccountsChanged?(accounts: string[]): void
    onChainChanged?(chainId: string | number): void
    onDisconnect?(): void
} 