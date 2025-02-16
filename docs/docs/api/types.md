---
sidebar_position: 3
---

# Types Reference

ethers-query is built with TypeScript and provides comprehensive type definitions for all its features.

## Core Types

### AccountData

```tsx
interface AccountData {
  /** The connected account address */
  address: string | null;
  /** The current chain ID */
  chainId: number | null;
  /** Whether the account is connected */
  isConnected: boolean;
  /** Whether the account is currently connecting */
  isConnecting: boolean;
  /** Whether the account is disconnected */
  isDisconnected: boolean;
  /** Whether the account state has been initialized */
  isInitialized: boolean;
  /** Whether a provider is available */
  hasProvider: boolean;
}
```

### ConnectorData

```tsx
interface ConnectorData {
  /** The account address */
  account: string | null;
  /** The chain ID */
  chainId: number | null;
  /** The provider instance */
  provider: Provider | null;
}
```

### SmartContractConfig

```tsx
interface SmartContractConfig {
  /** Contract address */
  address: string;
  /** Contract ABI */
  abi: ContractInterface;
  /** Optional function name for specific function calls */
  functionName?: string;
  /** Optional arguments for the function call */
  args?: any[];
  /** Optional chain ID override */
  chainId?: number;
}
```

## Hook Return Types

### UseWalletResult

```tsx
interface UseWalletResult {
  /** Function to connect a wallet */
  connect: (args: ConnectArgs) => Promise<void>;
  /** Function to disconnect the current wallet */
  disconnect: () => Promise<void>;
  /** Whether a connection operation is in progress */
  isConnecting: boolean;
  /** Whether a disconnection operation is in progress */
  isDisconnecting: boolean;
  /** Error that occurred during the last operation */
  error: Error | null;
}
```

### ConnectArgs

```tsx
type ConnectArgs = {
  /** The connector ID to use for connecting */
  connectorId: string;
}
```

### UseAccountResult

```tsx
interface UseAccountResult {
  /** Account data */
  data: AccountData;
  /** Connect function */
  connect: () => Promise<void>;
  /** Disconnect function */
  disconnect: () => Promise<void>;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}
```

### UseBalanceResult

```tsx
interface UseBalanceResult {
  /** Balance data */
  data: {
    /** Raw balance value */
    value: bigint;
    /** Formatted balance string */
    formatted: string;
    /** Token symbol */
    symbol: string;
    /** Token decimals */
    decimals: number;
  } | null;
  /** Loading state */
  isLoading: boolean;
  /** Error state */
  error: Error | null;
}
```

## Utility Types

### NetworkConfig

```tsx
interface NetworkConfig {
  /** Chain ID */
  chainId: number;
  /** Network name */
  name: string;
  /** Network currency */
  nativeCurrency: {
    name: string;
    symbol: string;
    decimals: number;
  };
  /** RPC URLs */
  rpcUrls: string[];
}
```

### TransactionConfig

```tsx
interface TransactionConfig {
  /** Transaction hash */
  hash: string;
  /** From address */
  from: string;
  /** To address */
  to: string;
  /** Value in wei */
  value: bigint;
  /** Gas limit */
  gasLimit: bigint;
  /** Gas price */
  gasPrice: bigint;
  /** Transaction data */
  data: string;
}
```

## Best Practices

1. Use TypeScript for better type safety
2. Leverage type inference where possible
3. Use strict TypeScript configuration
4. Consider creating custom type guards for complex conditions
5. Document custom types thoroughly 