---
sidebar_position: 1
---

# Wallet Connection

ethers-query provides multiple ways to connect to Web3 wallets. Here are the available methods:

## App Kit Integration (Recommended)

The recommended way to handle wallet connections is through [Reown App Kit](../getting-started/app-kit.md). App Kit provides a beautiful, customizable UI and handles all the complexities of wallet connections for you.

```tsx
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'ethers-query';

function ConnectButton() {
  const appKit = useAppKit();
  const account = useAccount();

  const handleClick = () => {
    appKit.open();
  };

  return (
    <button onClick={handleClick}>
      {account.isConnected ? 'Connected' : 'Connect Wallet'}
    </button>
  );
}
```

## Direct Connection

If you prefer more control, you can use ethers-query's built-in connector:

```tsx
import { useConnect } from 'ethers-query';

function ConnectButton() {
  const { connect, connectors } = useConnect();
  
  const handleConnect = async () => {
    try {
      await connect({ connector: connectors[0] });
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  return <button onClick={handleConnect}>Connect Wallet</button>;
}
```

## Custom Connectors

You can also implement your own connectors by extending the base `Connector` class:

```tsx
import { Connector } from 'ethers-query';

class CustomConnector extends Connector {
  constructor() {
    super({
      id: 'custom',
      name: 'Custom Wallet',
    });
  }

  async connect() {
    // Your connection logic here
  }

  async disconnect() {
    // Your disconnection logic here
  }
}
```

## Account Status

Track the connection status and account details:

```tsx
import { useAccount } from 'ethers-query';

function AccountStatus() {
  const {
    address,
    chainId,
    isConnected,
    isConnecting,
    isDisconnected,
  } = useAccount();

  if (isConnecting) {
    return <div>Connecting...</div>;
  }

  if (isDisconnected) {
    return <div>Disconnected</div>;
  }

  return (
    <div>
      <p>Connected to {address}</p>
      <p>Network: {chainId}</p>
    </div>
  );
}
```

## Error Handling

Always handle connection errors gracefully:

```tsx
import { useConnect } from 'ethers-query';

function ConnectWithError() {
  const { connect, connectors, error } = useConnect();

  return (
    <div>
      <button onClick={() => connect({ connector: connectors[0] })}>
        Connect
      </button>
      {error && (
        <div className="error">
          {error.message}
        </div>
      )}
    </div>
  );
}
```

## Best Practices

1. Use App Kit for the best user experience
2. Always handle connection errors
3. Show loading states during connection
4. Provide clear feedback on connection status
5. Support multiple wallet types when possible
6. Consider implementing auto-connect functionality
7. Test with different wallet providers 