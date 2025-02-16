# Function: useWallet()

> **useWallet**(): `UseWalletResult`

Defined in: [packages/ethers-query/src/hooks/useWallet.ts:67](https://github.com/Recursive-Studio/ethers-query/blob/main/packages/ethers-query/src/hooks/useWallet.ts#L67)

**`Beta`**

Hook for managing wallet connections. Provides functions and state for connecting and disconnecting wallets.

## Returns

`UseWalletResult`

Object containing wallet connection management functions and state:
- `connect`: Function to connect a wallet with specified connector
- `disconnect`: Function to disconnect the current wallet
- `isConnecting`: Whether a connection operation is in progress
- `isDisconnecting`: Whether a disconnection operation is in progress
- `error`: Error that occurred during the last operation

## Basic Example

```tsx
import { useWallet } from 'ethers-query'

function ConnectButton() {
  const { 
    connect, 
    disconnect,
    isConnecting,
    isDisconnecting,
    error 
  } = useWallet()

  const handleConnect = async () => {
    try {
      await connect({ connectorId: 'injected' })
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const handleDisconnect = async () => {
    try {
      await disconnect()
    } catch (error) {
      console.error('Failed to disconnect:', error)
    }
  }

  return (
    <div>
      <button onClick={handleConnect} disabled={isConnecting}>
        {isConnecting ? 'Connecting...' : 'Connect Wallet'}
      </button>
      <button onClick={handleDisconnect} disabled={isDisconnecting}>
        {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
      </button>
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

## Advanced Example with Multiple Connectors

```tsx
import { useWallet } from 'ethers-query'

function WalletConnector() {
  const { 
    connect, 
    isConnecting,
    error 
  } = useWallet()

  const connectors = [
    { id: 'injected', name: 'MetaMask' },
    { id: 'walletConnect', name: 'WalletConnect' },
    { id: 'coinbaseWallet', name: 'Coinbase Wallet' }
  ]

  return (
    <div>
      {connectors.map(({ id, name }) => (
        <button
          key={id}
          onClick={() => connect({ connectorId: id })}
          disabled={isConnecting}
        >
          Connect with {name}
        </button>
      ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  )
}
```

## Common Error Scenarios

1. User Rejection
```tsx
try {
  await connect({ connectorId: 'injected' })
} catch (error) {
  if (error.code === 4001) {
    // User rejected the connection request
  }
}
```

2. No Provider Available
```tsx
try {
  await connect({ connectorId: 'injected' })
} catch (error) {
  if (error.message.includes('No provider available')) {
    // MetaMask or other wallet not installed
  }
}
```

## Best Practices

1. Always handle connection errors gracefully
2. Show loading states during connection/disconnection
3. Provide clear feedback for user actions
4. Consider implementing auto-reconnect functionality
5. Support multiple wallet providers when possible
6. Store and restore the last used connector ID
7. Implement proper error messages for different scenarios 