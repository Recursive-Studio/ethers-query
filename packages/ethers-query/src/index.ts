/**
 * @packageDocumentation
 * ethers-query is a React hooks library for interacting with Ethereum using ethers.js.
 * It provides a simple, powerful interface for connecting wallets, managing accounts,
 * signing messages, and interacting with smart contracts.
 * 
 * ## Installation
 * ```bash
 * pnpm add ethers-query ethers@6.x @tanstack/react-query
 * ```
 * 
 * ## Basic Setup
 * ```tsx
 * import { EthersQueryProvider, Client, InjectedConnector } from 'ethers-query'
 * import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 * 
 * // Create a client with desired connectors
 * const client = new Client({
 *   connectors: [new InjectedConnector()]
 * })
 * 
 * // Create a query client
 * const queryClient = new QueryClient()
 * 
 * function App() {
 *   return (
 *     <QueryClientProvider client={queryClient}>
 *       <EthersQueryProvider client={client}>
 *         <YourApp />
 *       </EthersQueryProvider>
 *     </QueryClientProvider>
 *   )
 * }
 * ```
 * 
 * ## Usage Examples
 * 
 * ### Connecting to a Wallet
 * ```tsx
 * import { useAccount, useEthersQuery } from 'ethers-query'
 * 
 * function ConnectButton() {
 *   const client = useEthersQuery()
 *   const { isConnected } = useAccount()
 * 
 *   return (
 *     <button onClick={() => client.connect()}>
 *       {isConnected ? 'Connected' : 'Connect Wallet'}
 *     </button>
 *   )
 * }
 * ```
 * 
 * ### Reading Account Data
 * ```tsx
 * import { useAccount } from 'ethers-query'
 * 
 * function AccountInfo() {
 *   const { address, chainId, isConnected } = useAccount()
 * 
 *   if (!isConnected) return <div>Not connected</div>
 * 
 *   return (
 *     <div>
 *       Connected to {address} on chain {chainId}
 *     </div>
 *   )
 * }
 * ```
 * 
 * ### Interacting with Smart Contracts
 * ```tsx
 * import { useSmartContract } from 'ethers-query'
 * 
 * // ERC20 token example
 * function TokenBalance() {
 *   const contract = useSmartContract({
 *     address: '0x...',
 *     abi: ['function balanceOf(address) view returns (uint256)'],
 *     functionName: 'balanceOf',
 *     args: ['0x...'] // address to check
 *   })
 * 
 *   return (
 *     <div>
 *       {contract.data && <div>Balance: {contract.data.toString()}</div>}
 *     </div>
 *   )
 * }
 * ```
 * 
 * ### Signing Messages
 * ```tsx
 * import { useSignMessage } from 'ethers-query'
 * 
 * function SignMessage() {
 *   const { signMessage, data: signature } = useSignMessage()
 * 
 *   const handleSign = async () => {
 *     await signMessage({ message: 'Hello World' })
 *   }
 * 
 *   return (
 *     <div>
 *       <button onClick={handleSign}>Sign Message</button>
 *       {signature && <div>Signature: {signature}</div>}
 *     </div>
 *   )
 * }
 * ```
 */

/**
 * @module Core
 */
export { Client } from './client.js'

/**
 * @module Connectors
 */
export { type Connector, type ConnectorData } from './connectors/base.js'

/**
 * @module Connectors
 * @beta
 * 
 * @example
 * ```typescript
 * import { InjectedConnector } from 'ethers-query'
 * 
 * const connector = new InjectedConnector()
 * ```
 */
export { InjectedConnector } from './connectors/injected.js'

/**
 * @module Context
 * @beta
 * 
 * @example
 * ```tsx
 * import { EthersQueryProvider } from 'ethers-query'
 * 
 * function App() {
 *   return (
 *     <EthersQueryProvider>
 *       <YourApp />
 *     </EthersQueryProvider>
 *   )
 * }
 * ```
 */
export { EthersQueryProvider, useEthersQuery, type EthersQueryProviderProps } from './context.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useAccount } from 'ethers-query'
 * 
 * function Component() {
 *   const { address, isConnected } = useAccount()
 *   return <div>Account: {address}</div>
 * }
 * ```
 */
export { useAccount, type AccountData } from './hooks/useAccount.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useProvider } from 'ethers-query'
 * 
 * function Component() {
 *   const provider = useProvider()
 *   // Use provider for read-only operations
 * }
 * ```
 */
export { useProvider } from './hooks/useProvider.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useSigner } from 'ethers-query'
 * 
 * function Component() {
 *   const signer = useSigner()
 *   // Use signer for transactions
 * }
 * ```
 */
export { useSigner } from './hooks/useSigner.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useSignMessage } from 'ethers-query'
 * 
 * function Component() {
 *   const { signMessage, data: signature } = useSignMessage()
 *   
 *   const handleSign = async () => {
 *     await signMessage({ message: 'Hello World' })
 *   }
 * }
 * ```
 */
export { useSignMessage } from './hooks/useSignMessage.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useSmartContract } from 'ethers-query'
 * 
 * function Component() {
 *   const contract = useSmartContract({
 *     address: '0x...',
 *     abi: [...],
 *     functionName: 'balanceOf'
 *   })
 *   
 *   const balance = await contract.read()
 * }
 * ```
 */
export { useSmartContract } from './hooks/useSmartContract.js'

/**
 * @module Hooks
 * @beta
 * 
 * @example
 * ```tsx
 * import { useBalance } from 'ethers-query'
 * 
 * function Component() {
 *   const balance = useBalance()
 * }
 */
export { useBalance } from './hooks/useBalance.js'
