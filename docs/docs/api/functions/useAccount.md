# Function: useAccount()

> **useAccount**(): [`AccountData`](../interfaces/AccountData.md)

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:58](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L58)

**`Beta`**

Hook for accessing the current account state

## Returns

[`AccountData`](../interfaces/AccountData.md)

Account data including connection status, address, and chain ID

## Example

```tsx
import { useAccount } from 'ethers-query'

function Component() {
  const { 
    address, 
    chainId,
    isConnected,
    isConnecting 
  } = useAccount()

  if (isConnecting) return <div>Connecting...</div>
  if (!isConnected) return <div>Not connected</div>

  return (
    <div>
      Connected to {address} on chain {chainId}
    </div>
  )
}
```
