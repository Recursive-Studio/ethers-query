# ethers-query

ethers-query is a React hooks library for interacting with Ethereum using ethers.js.
It provides a simple, powerful interface for connecting wallets, managing accounts,
signing messages, and interacting with smart contracts.

## Installation
```bash
pnpm add ethers-query ethers@6.x @tanstack/react-query
```

## Basic Setup
```tsx
import { EthersQueryProvider, Client, InjectedConnector } from 'ethers-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Create a client with desired connectors
const client = new Client({
  connectors: [new InjectedConnector()]
})

// Create a query client
const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EthersQueryProvider client={client}>
        <YourApp />
      </EthersQueryProvider>
    </QueryClientProvider>
  )
}
```

## Usage Examples

### Connecting to a Wallet
```tsx
import { useAccount, useEthersQuery } from 'ethers-query'

function ConnectButton() {
  const client = useEthersQuery()
  const { isConnected } = useAccount()

  return (
    <button onClick={() => client.connect()}>
      {isConnected ? 'Connected' : 'Connect Wallet'}
    </button>
  )
}
```

### Reading Account Data
```tsx
import { useAccount } from 'ethers-query'

function AccountInfo() {
  const { address, chainId, isConnected } = useAccount()

  if (!isConnected) return <div>Not connected</div>

  return (
    <div>
      Connected to {address} on chain {chainId}
    </div>
  )
}
```

### Interacting with Smart Contracts
```tsx
import { useSmartContract } from 'ethers-query'

// ERC20 token example
function TokenBalance() {
  const contract = useSmartContract({
    address: '0x...',
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: ['0x...'] // address to check
  })

  return (
    <div>
      {contract.data && <div>Balance: {contract.data.toString()}</div>}
    </div>
  )
}
```

### Signing Messages
```tsx
import { useSignMessage } from 'ethers-query'

function SignMessage() {
  const { signMessage, data: signature } = useSignMessage()

  const handleSign = async () => {
    await signMessage({ message: 'Hello World' })
  }

  return (
    <div>
      <button onClick={handleSign}>Sign Message</button>
      {signature && <div>Signature: {signature}</div>}
    </div>
  )
}
```

## Connectors

- [InjectedConnector](classes/InjectedConnector.md)
- [Connector](interfaces/Connector.md)
- [ConnectorData](type-aliases/ConnectorData.md)

## Context

- [EthersQueryProviderProps](interfaces/EthersQueryProviderProps.md)
- [EthersQueryProvider](functions/EthersQueryProvider.md)
- [useEthersQuery](functions/useEthersQuery.md)

## Core

- [Client](classes/Client.md)

## Hooks

- [AccountData](interfaces/AccountData.md)
- [useAccount](functions/useAccount.md)
- [useBalance](functions/useBalance.md)
- [useProvider](functions/useProvider.md)
- [useSigner](functions/useSigner.md)
- [useSignMessage](functions/useSignMessage.md)
- [useSmartContract](functions/useSmartContract.md)
