---
sidebar_position: 2
---

# Quick Start

This guide will help you get started with ethers-query by walking through a simple example.

## Basic Wallet Connection

Here's a simple example of connecting a wallet and displaying the account information:

```tsx
import { useAccount, useBalance } from 'ethers-query';

function WalletStatus() {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return <button>Connect Wallet</button>;
  }

  return (
    <div>
      <p>Connected Address: {address}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
    </div>
  );
}
```

## Smart Contract Interaction

Here's how to interact with a smart contract:

```tsx
import { useSmartContract } from 'ethers-query';

function TokenBalance({ tokenAddress }) {
  const { address } = useAccount();
  
  const contract = useSmartContract({
    address: tokenAddress,
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: [address]
  });

  const checkBalance = async () => {
    try {
      const balance = await contract.read();
      console.log('Balance:', balance.toString());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={checkBalance} disabled={contract.isLoading}>
      Check Token Balance
    </button>
  );
}
```

## Message Signing

Example of signing messages:

```tsx
import { useSignMessage } from 'ethers-query';

function MessageSigner() {
  const { signMessage, isLoading, data: signature } = useSignMessage();

  const handleSign = async () => {
    try {
      await signMessage({ message: 'Hello World!' });
    } catch (error) {
      console.error('Error signing message:', error);
    }
  };

  return (
    <div>
      <button onClick={handleSign} disabled={isLoading}>
        {isLoading ? 'Signing...' : 'Sign Message'}
      </button>
      {signature && <div>Signature: {signature}</div>}
    </div>
  );
}
```

## Next Steps

- Check out the [API Documentation](../api) for detailed information about all available hooks
- See the API reference for specific hooks:
  - [useAccount](../api/functions/useAccount)
  - [useSigner](../api/functions/useSigner)
  - [useSmartContract](../api/functions/useSmartContract)
  - [useSignMessage](../api/functions/useSignMessage) 