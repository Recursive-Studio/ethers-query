# Function: useProvider()

> **useProvider**(): `null` \| `Provider`

Defined in: [packages/ethers-query/src/hooks/useProvider.ts:33](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useProvider.ts#L33)

**`Beta`**

Hook for accessing the current ethers Provider instance

## Returns

`null` \| `Provider`

The current ethers Provider instance or null if not connected

## Example

```tsx
import { useProvider } from 'ethers-query'

function Component() {
  const provider = useProvider()

  const getBlockNumber = async () => {
    if (!provider) return
    const blockNumber = await provider.getBlockNumber()
    console.log('Current block:', blockNumber)
  }

  return (
    <button onClick={getBlockNumber}>
      Get Block Number
    </button>
  )
}
```
