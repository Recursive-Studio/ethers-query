---
slug: /
sidebar_position: 1
---

# Introduction

ethers-query is a powerful React hooks library built on top of ethers.js, designed to simplify Ethereum integration in React applications. It provides a collection of hooks for wallet connections, smart contract interactions, and blockchain data management.

## Features

- 🔌 **Easy Wallet Integration** - Seamless wallet connection with `useAccount` and `useSigner` hooks
- 📝 **Smart Contract Interaction** - Simple interface for contract calls using `useSmartContract`
- 🔄 **Auto-Refresh** - Built-in data synchronization using React Query
- 🎣 **React Hooks** - Familiar React hooks pattern for all blockchain interactions
- 🛠 **TypeScript Support** - Full TypeScript support with type inference
- ⚡️ **Performance Optimized** - Efficient caching and request deduplication

## Quick Links

- [Installation Guide](getting-started/installation.md)
- [Quick Start](getting-started/quick-start.md)
- [API Reference](api)

## Basic Usage

```tsx
import { useAccount, useSmartContract } from 'ethers-query';

function App() {
  const { address, isConnected } = useAccount();
  
  const contract = useSmartContract({
    address: '0x...',
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: [address]
  });

  return (
    <div>
      {isConnected ? (
        <div>Connected to {address}</div>
      ) : (
        <button>Connect Wallet</button>
      )}
    </div>
  );
}
```
