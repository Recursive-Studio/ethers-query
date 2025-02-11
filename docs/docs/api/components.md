---
sidebar_position: 2
---

# Components Reference

ethers-query provides React components for easy integration with Ethereum applications.

## EthersQueryProvider

The main provider component that must wrap your application:

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

### Props

```tsx
interface EthersQueryProviderProps {
  /** Optional custom configuration for the provider */
  config?: {
    /** Custom connectors for wallet integration */
    connectors?: Connector[];
    /** Auto-connect behavior configuration */
    autoConnect?: boolean;
    /** Cache time for queries (in milliseconds) */
    cacheTime?: number;
  };
  /** Child components */
  children: React.ReactNode;
}
```

### Configuration

#### Custom Connectors

You can provide custom wallet connectors:

```tsx
import { InjectedConnector } from 'ethers-query';

function App() {
  return (
    <EthersQueryProvider
      config={{
        connectors: [
          new InjectedConnector({
            name: 'MetaMask',
            shimDisconnect: true,
          }),
        ],
      }}
    >
      {/* Your app content */}
    </EthersQueryProvider>
  );
}
```

#### Auto-Connect

Enable automatic wallet connection on page load:

```tsx
<EthersQueryProvider
  config={{
    autoConnect: true,
  }}
>
  {/* Your app content */}
</EthersQueryProvider>
```

## Best Practices

1. Place the provider at the root of your application
2. Configure appropriate cache times for your use case
3. Consider implementing error boundaries
4. Use TypeScript for better type safety
5. Handle provider errors gracefully 