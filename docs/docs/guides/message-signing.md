---
sidebar_position: 3
---

# Message Signing

This guide explains how to implement message signing functionality using ethers-query.

## Basic Message Signing

Use the `useSignMessage` hook for basic message signing:

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

## Typed Data Signing (EIP-712)

For signing typed data according to EIP-712:

```tsx
function TypedDataSigner() {
  const { signTypedData, isLoading } = useSignTypedData();

  const domain = {
    name: 'My App',
    version: '1',
    chainId: 1,
    verifyingContract: '0x...',
  };

  const types = {
    Person: [
      { name: 'name', type: 'string' },
      { name: 'wallet', type: 'address' },
    ],
    Mail: [
      { name: 'from', type: 'Person' },
      { name: 'to', type: 'Person' },
      { name: 'contents', type: 'string' },
    ],
  };

  const value = {
    from: {
      name: 'Alice',
      wallet: '0x...',
    },
    to: {
      name: 'Bob',
      wallet: '0x...',
    },
    contents: 'Hello!',
  };

  const handleSign = async () => {
    try {
      const signature = await signTypedData({
        domain,
        types,
        value,
      });
      console.log('Signature:', signature);
    } catch (error) {
      console.error('Error signing typed data:', error);
    }
  };

  return (
    <button onClick={handleSign} disabled={isLoading}>
      Sign Typed Data
    </button>
  );
}
```

## Message Verification

Verify signed messages:

```tsx
function MessageVerifier() {
  const { verifyMessage } = useVerifyMessage();
  const [isValid, setIsValid] = useState(false);

  const handleVerify = async (message: string, signature: string, address: string) => {
    try {
      const valid = await verifyMessage({
        message,
        signature,
        address,
      });
      setIsValid(valid);
    } catch (error) {
      console.error('Error verifying message:', error);
    }
  };

  return (
    <div>
      <button onClick={() => handleVerify(message, signature, address)}>
        Verify Signature
      </button>
      {isValid !== null && (
        <p>Signature is {isValid ? 'valid' : 'invalid'}</p>
      )}
    </div>
  );
}
```

## Best Practices

1. Always provide clear feedback during the signing process
2. Handle errors gracefully and show user-friendly error messages
3. Consider implementing signature verification
4. Use typed data signing for structured data
5. Store signatures securely if needed for later verification
6. Implement proper loading states during signing
7. Consider implementing signature expiration for time-sensitive operations 