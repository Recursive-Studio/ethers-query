---
sidebar_position: 1
---

# Hooks Reference

ethers-query provides a set of React hooks for interacting with Ethereum. Here's a comprehensive list of available hooks:

## Account Management

### useAccount

```tsx
const { 
  address,
  isConnected,
  chainId,
  connect,
  disconnect
} = useAccount()
```

Manages wallet connection and account state.

### useBalance

```tsx
const { 
  data: balance,
  isLoading,
  error 
} = useBalance({ address })
```

Fetches the native token balance for an address.

## Contract Interaction

### useSmartContract

```tsx
const contract = useSmartContract({
  address: string,
  abi: ContractInterface,
  functionName?: string
})
```

Creates a contract instance for reading and writing.

### useContractRead

```tsx
const { 
  data,
  isLoading,
  error 
} = useContractRead({
  address,
  abi,
  functionName,
  args
})
```

Reads data from a contract.

## Signing

### useSignMessage

```tsx
const { 
  signMessage,
  isLoading,
  data: signature 
} = useSignMessage()
```

Signs messages using the connected wallet.

### useSignTypedData

```tsx
const {
  signTypedData,
  isLoading,
  data: signature
} = useSignTypedData()
```

Signs EIP-712 typed data.

## Network

### useProvider

```tsx
const provider = useProvider()
```

Access the current ethers provider.

### useSigner

```tsx
const signer = useSigner()
```

Access the current ethers signer.

## Common Properties

Most hooks return objects with these common properties:

- `isLoading`: Boolean indicating if an operation is in progress
- `error`: Any error that occurred during the operation
- `data`: The result data (type varies by hook)

## Error Handling

All hooks use a consistent error pattern:

```tsx
try {
  await someHook.someAction()
} catch (error) {
  if (error.code === 'ACTION_REJECTED') {
    // User rejected the action
  } else {
    // Other errors
  }
}
```

## Best Practices

1. Always check `isLoading` and `error` states
2. Use TypeScript for better type safety
3. Handle errors gracefully
4. Implement proper loading states
5. Cache results when appropriate 