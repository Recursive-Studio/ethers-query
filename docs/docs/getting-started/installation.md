---
sidebar_position: 1
---

# Installation

## Requirements

Before installing ethers-query, make sure you have the following prerequisites:

- Node.js 16 or later
- pnpm, npm, or yarn
- React 18 or later

## Installation Steps

1. Install the package and its peer dependencies:

```bash
# Using pnpm (recommended)
pnpm add ethers-query ethers @tanstack/react-query

# Using npm
npm install ethers-query ethers @tanstack/react-query

# Using yarn
yarn add ethers-query ethers @tanstack/react-query
```

2. Wrap your application with the necessary providers:

```tsx
import { EthersQueryProvider } from 'ethers-query';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <EthersQueryProvider>
        {/* Your app content */}
      </EthersQueryProvider>
    </QueryClientProvider>
  );
}
```

## Next Steps

- Check out the [Quick Start](quick-start.md) guide to learn how to use ethers-query
- Browse the [API Reference](../api) for detailed API documentation 