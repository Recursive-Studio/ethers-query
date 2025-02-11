import type { Provider } from 'ethers'
import type { Connector, ConnectorData } from './connectors/base.js'

/**
 * Configuration options for initializing the ethers-query Client
 * @category Core
 * @group Types
 * @beta
 */
export type ClientConfig = {
    /** Array of wallet connectors to use (e.g., InjectedConnector) */
    connectors: Connector[]
}

/**
 * Internal state of the Client
 * @category Core
 * @group Types
 * @beta
 */
type ClientState = {
    /** The currently active connector or null if not connected */
    connector: Connector | null
    /** Connection data from the active connector or null if not connected */
    data: ConnectorData | null
    /** Current connection status */
    status: 'connected' | 'connecting' | 'disconnected' | 'reconnecting'
    /** Whether the client has completed initialization */
    isInitialized: boolean
}

/**
 * Callback function type for state change subscriptions
 * @category Core
 * @group Types
 * @beta
 */
type StateListener = (state: ClientState) => void

/**
 * The core client for managing wallet connections and state
 * @category Core
 * @group Classes
 * @beta
 * 
 * @example
 * ```typescript
 * import { Client, InjectedConnector } from 'ethers-query'
 * 
 * const client = new Client({
 *   connectors: [new InjectedConnector()]
 * })
 * 
 * // Connect to the first available connector
 * await client.connect()
 * 
 * // Get the current state
 * const state = client.getState()
 * 
 * // Subscribe to state changes
 * const unsubscribe = client.subscribe((state) => {
 *   console.log('New state:', state)
 * })
 * 
 * // Disconnect
 * await client.disconnect()
 * ```
 */
export class Client {
    private connectors: Connector[]
    private state: ClientState
    private listeners: Set<StateListener> = new Set()
    
    /**
     * Creates a new Client instance
     */
    constructor(config: ClientConfig) {
        this.connectors = config.connectors
        this.state = {
            connector: null,
            data: null,
            status: 'disconnected',
            isInitialized: false
        }
        
        // Only initialize on the client side
        if (typeof window !== 'undefined') {
            // Initialize connectors
            this.initialize()
        }
    }
    
    private async initialize() {
        const connector = this.connectors[0]
        if (!connector) {
            this.setState({ isInitialized: false })
            return
        }
        
        // Set up event handlers
        this.setupEventHandlers(connector)
        
        // Check if already connected (e.g. through AppKit)
        const isConnected = await connector.isConnected()
        console.log('[Client] isConnected:', isConnected)
        
        if (isConnected) {
            try {
                const account = await connector.getAccount()
                const chainId = await connector.getChainId()
                const provider = await connector.getProvider()
                
                console.log('[Client] Initial connection state:', {
                    account,
                    chainId,
                    provider
                })
                
                if (account && chainId && provider) {
                    this.setState({
                        connector,
                        data: { account, chainId, provider },
                        status: 'connected',
                        isInitialized: true
                    })
                    return
                }
            } catch (error) {
                console.error('[Client] Error checking initial connection:', error)
            }
        }
        
        this.setState({ isInitialized: true })
    }
    
    private setupEventHandlers(connector: Connector) {
        connector.onAccountsChanged = async (accounts) => {
            console.log('[Client] Accounts changed:', accounts)
            if (accounts.length === 0) {
                this.disconnect()
            } else {
                const provider = await connector.getProvider()
                console.log('[Client] Provider after accounts changed:', provider)
                const chainId = await connector.getChainId()
                
                this.setState({
                    connector,
                    data: {
                        account: accounts[0],
                        chainId,
                        provider
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
            
            const provider = await connector.getProvider()
            console.log('[Client] Provider after chain changed:', provider)
            const account = await connector.getAccount()
                
            this.setState({
                connector,
                data: {
                    account,
                    chainId: numericChainId,
                    provider
                },
                status: 'connected'
            })
        }
        
        connector.onDisconnect = () => {
            console.log('[Client] Disconnect event received from connector')
            this.disconnect()
        }
    }
    
    private setState(newState: Partial<ClientState>) {
        console.log('[Client] State update:', {
            current: this.state,
            update: newState,
            result: { ...this.state, ...newState }
        })
        this.state = { ...this.state, ...newState }
        this.listeners.forEach(listener => listener(this.state))
    }
    
    /**
     * Subscribe to state changes
     * @returns A function to unsubscribe
     * 
     * @example
     * ```typescript
     * const unsubscribe = client.subscribe((state) => {
     *   console.log('State changed:', state)
     * })
     * 
     * // Later, to unsubscribe
     * unsubscribe()
     * ```
     */
    subscribe(listener: StateListener): () => void {
        this.listeners.add(listener)
        return () => this.listeners.delete(listener)
    }
    
    /**
     * Get the current client state
     * @returns The current state including connection status and wallet data
     */
    getState(): ClientState {
        const state = this.state
        console.log('[Client] Getting state:', state)
        return state
    }
    
    /**
     * Connect to a wallet
     * @param connectorId - Optional ID of the specific connector to use
     * @throws Error if connector is not found or connection fails
     * 
     * @example
     * ```typescript
     * // Connect using the first available connector
     * await client.connect()
     * 
     * // Connect using a specific connector
     * await client.connect('injected')
     * ```
     */
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
            console.log('[Client] Connected with data:', data)
            
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
    
    /**
     * Disconnect the current wallet connection
     * 
     * @example
     * ```typescript
     * await client.disconnect()
     * ```
     */
    async disconnect(): Promise<void> {
        console.log('[Client] Disconnect called with state:', {
            connector: this.state.connector,
            status: this.state.status
        })
        
        const { connector } = this.state
        if (!connector) {
            console.log('[Client] No connector to disconnect')
            return
        }
        
        try {
            await connector.disconnect()
            console.log('[Client] Connector disconnect completed')
        } catch (error) {
            console.error('[Client] Error during connector disconnect:', error)
        }
        
        this.setState({
            connector: null,
            data: null,
            status: 'disconnected'
        })
    }
    
    /**
     * Get the current provider instance
     * @returns The current ethers Provider or null if not connected
     * 
     * @example
     * ```typescript
     * const provider = await client.getProvider()
     * if (provider) {
     *   const blockNumber = await provider.getBlockNumber()
     * }
     * ```
     */
    async getProvider(): Promise<Provider | null> {
        const { connector } = this.state
        if (!connector) return null
        const provider = await connector.getProvider()
        console.log('[Client] getProvider returning:', provider)
        return provider
    }
} 