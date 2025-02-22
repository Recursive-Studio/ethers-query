---
id: intro
title: Introduction
slug: /
sidebar_position: 1
---

# Introduction

ethers-query is a powerful React hooks library that seamlessly integrates [ethers.js](https://docs.ethers.org/v6/) with [@tanstack/react-query](https://tanstack.com/query/latest), providing a simple yet powerful interface for building Ethereum-enabled React applications.

## Features

- 🔌 **Easy Wallet Integration** - Simple hooks for connecting to and managing Web3 wallets
- 📊 **Smart Contract Interactions** - Type-safe hooks for reading from and writing to smart contracts
- 💾 **Automatic Caching** - Built on React Query for efficient data caching and synchronization
- 🔄 **Real-time Updates** - Automatic balance updates and contract state synchronization
- 📝 **Message Signing** - Streamlined hooks for signing and verifying messages
- 🛠️ **Type-Safe** - Full TypeScript support with type inference
- 🎣 **React-First** - Designed specifically for React applications

## Core Concepts

ethers-query is built around a few core concepts:

### Client

The `Client` is the central piece that manages wallet connections and provider state. It's configured with wallet connectors and wrapped in the `EthersQueryProvider` to make it available throughout your app.

### Hooks

ethers-query provides a collection of hooks for common Web3 operations:

- `useAccount()` - Access the current account state (address, chain ID, connection status)
- `useWallet()` - Manage wallet connections
- `useProvider()` - Access the ethers Provider instance
- `useSigner()` - Access the ethers Signer instance
- `useBalance()` - Fetch and watch account balances
- `useSmartContract()` - Interact with smart contracts
- `useSignMessage()` - Sign and verify messages

### Providers

Two provider components set up the required context:

- `EthersQueryProvider` - Makes the client instance available to hooks
- `EthersQueryClientProvider` - Configures React Query with optimized defaults for blockchain data

## Quick Example

Here's a simple example of connecting a wallet and displaying the account balance:

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

Ready to get started? Head over to the [Installation](getting-started/installation) guide! 