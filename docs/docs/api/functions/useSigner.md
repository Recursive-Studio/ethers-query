# Function: useSigner()

> **useSigner**(): `null` \| `JsonRpcSigner`

Defined in: [packages/ethers-query/src/hooks/useSigner.ts:42](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useSigner.ts#L42)

**`Beta`**

Hook for accessing the current ethers Signer instance

## Returns

`null` \| `JsonRpcSigner`

The current ethers JsonRpcSigner instance or null if not connected

## Example

```tsx
import { useSigner } from 'ethers-query'

function Component() {
  const signer = useSigner()

  const sendTransaction = async () => {
    if (!signer) return
    
    try {
      const tx = await signer.sendTransaction({
        to: '0x...',
        value: '1000000000000000000' // 1 ETH
      })
      await tx.wait()
      console.log('Transaction confirmed')
    } catch (error) {
      console.error('Transaction failed:', error)
    }
  }

  return (
    <button onClick={sendTransaction} disabled={!signer}>
      Send 1 ETH
    </button>
  )
}
```
