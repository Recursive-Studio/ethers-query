# ethers-query

React Query hooks for ethers.js - Build Web3 apps with ease.

[![npm version](https://badge.fury.io/js/ethers-query.svg)](https://badge.fury.io/js/ethers-query)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL%203.0-blue.svg)](https://opensource.org/licenses/GPL-3.0)

## Features

- 🔌 **Easy Wallet Integration** - Simple hooks for connecting to and managing Web3 wallets
- 📊 **Smart Contract Interactions** - Type-safe hooks for reading from and writing to smart contracts
- 💾 **Automatic Caching** - Built on React Query for efficient data caching and synchronization
- 🔄 **Real-time Updates** - Automatic balance updates and contract state synchronization
- 📝 **Message Signing** - Streamlined hooks for signing and verifying messages
- 🛠️ **Type-Safe** - Full TypeScript support with type inference

## Quick Start

```bash
npm install ethers-query @tanstack/react-query ethers@6
```

```tsx
import { EthersQueryProvider, Client } from 'ethers-query'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const client = new Client({
  connectors: [new InjectedConnector()]
})

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

## Usage Example

```tsx
import { useAccount, useBalance, useWallet } from 'ethers-query'

function WalletConnection() {
  const { connect } = useWallet()
  const { address, isConnected } = useAccount()
  const { data: balance } = useBalance({
    address,
    formatUnits: true
  })

  if (!isConnected) {
    return (
      <button onClick={() => connect({ connectorId: 'injected' })}>
        Connect Wallet
      </button>
    )
  }

  return (
    <div>
      <div>Connected: {address}</div>
      <div>Balance: {balance} ETH</div>
    </div>
  )
}
```

## Documentation

For full documentation, visit [ethers-query.recursive.so](https://ethers-query.recursive.so)

## License

GPL-3.0 