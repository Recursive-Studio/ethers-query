# Installation

## Automatic Installation

For new projects, it is recommended to use our [create-ethers-query](#) package to automatically install and configure Ethers Query.
However at this time this package is not yet available.

```bash
pnpm create ethers-query
```

## Manual Installation

To manually add ethers-query to your project, you will need the following packages:

```bash
pnpm add ethers-query ethers@6.x @tanstack/react-query
```

- [Ethers](https://docs.ethers.org/v6/) is a library for interacting with the Ethereum blockchain.
- [TanStack Query](https://tanstack.com/query) is a library for managing and caching data in React.

## Configuration

To configure ethers-query, you will need to create a `QueryClient` and pass it to the `QueryClientProvider` component.

```tsx
import { configureEthers, EthersQueryProvider } from 'ethers-query';

const config = configureEthers({
    client: /* todo */,
});

const MyApp = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <EthersQueryProvider config={config}>
                <App />
            </EthersQueryProvider>
        </QueryClientProvider>
    );
};
```
