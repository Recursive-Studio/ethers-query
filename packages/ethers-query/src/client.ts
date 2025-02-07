import type { Provider } from 'ethers'
import type { Connector, ConnectorData } from './connectors/base.js'

export type ClientConfig = {
    connectors: Connector[]
}

type ClientState = {
    connector: Connector | null
    data: ConnectorData | null
    status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
}

type StateListener = (state: ClientState) => void

export class Client {
    private connectors: Connector[]
    private state: ClientState
    private listeners: Set<StateListener> = new Set()
    
    constructor(config: ClientConfig) {
        this.connectors = config.connectors
        this.state = {
            connector: null,
            data: null,
            status: 'disconnected'
        }
        
        // Initialize connectors
        this.initialize()
    }
    
    private async initialize() {
        const connector = this.connectors[0]
        if (!connector) return
        
        // Set up event handlers
        this.setupEventHandlers(connector)
        
        // Check if already connected (e.g. through AppKit)
        const isConnected = await connector.isConnected()
        if (isConnected) {
            try {
                const account = await connector.getAccount()
                const chainId = await connector.getChainId()
                const provider = await connector.getProvider()
                
                if (account && chainId && provider) {
                    this.setState({
                        connector,
                        data: { account, chainId, provider },
                        status: 'connected'
                    })
                }
            } catch (error) {
                console.error('[Client] Error checking initial connection:', error)
            }
        }
    }
    
    private setupEventHandlers(connector: Connector) {
        connector.onAccountsChanged = (accounts) => {
            console.log('[Client] Accounts changed:', accounts)
            if (accounts.length === 0) {
                this.disconnect()
            } else {
                this.setState({
                    data: {
                        ...this.state.data!,
                        account: accounts[0]
                    },
                    status: 'connected'
                })
            }
        }
        
        connector.onChainChanged = async (chainId) => {
            console.log('[Client] Chain changed:', chainId)
            const numericChainId = typeof chainId === 'string' 
                ? parseInt(chainId, 16)
                : chainId
                
            this.setState({
                data: {
                    ...this.state.data!,
                    chainId: numericChainId
                }
            })
        }
        
        connector.onDisconnect = () => {
            console.log('[Client] Disconnected')
            this.disconnect()
        }
    }
    
    private setState(newState: Partial<ClientState>) {
        console.log('[Client] State update:', newState)
        this.state = { ...this.state, ...newState }
        this.listeners.forEach(listener => listener(this.state))
    }
    
    subscribe(listener: StateListener): () => void {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }
    
    getState(): ClientState {
        return this.state
    }
    
    async connect(connectorId?: string): Promise<void> {
        const connector = connectorId 
            ? this.connectors.find(c => c.id === connectorId)
            : this.connectors[0]
            
        if (!connector) throw new Error('Connector not found')
        
        try {
            this.setState({ status: 'connecting' })
            
            // Set up event handlers
            this.setupEventHandlers(connector)
            
            const data = await connector.connect()
            
            this.setState({
                connector,
                data,
                status: 'connected'
            })
        } catch (error) {
            console.error('[Client] Connection error:', error)
            this.setState({
                connector: null,
                data: null,
                status: 'disconnected'
            })
            throw error
        }
    }
    
    async disconnect(): Promise<void> {
        const { connector } = this.state
        if (!connector) return
        
        await connector.disconnect()
        
        this.setState({
            connector: null,
            data: null,
            status: 'disconnected'
        })
    }
    
    async getProvider(): Promise<Provider | null> {
        const { connector } = this.state
        if (!connector) return null
        return connector.getProvider()
    }
} 