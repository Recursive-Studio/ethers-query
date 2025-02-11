# Function: useEthersQuery()

> **useEthersQuery**(): [`Client`](../classes/Client.md)

Defined in: [packages/ethers-query/src/context.tsx:82](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/context.tsx#L82)

**`Beta`**

Hook for accessing the ethers-query Client instance

## Returns

[`Client`](../classes/Client.md)

The ethers-query Client instance

## Throws

Error if used outside of EthersQueryProvider

## Example

```tsx
import { useEthersQuery } from 'ethers-query'

function Component() {
  const client = useEthersQuery()

  const handleConnect = async () => {
    await client.connect()
  }

  return (
    <button onClick={handleConnect}>
      Connect Wallet
    </button>
  )
}
```
