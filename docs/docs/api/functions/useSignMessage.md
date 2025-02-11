# Function: useSignMessage()

> **useSignMessage**(): `SignMessageResult`

Defined in: [packages/ethers-query/src/hooks/useSignMessage.ts:129](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useSignMessage.ts#L129)

**`Beta`**

Hook for signing and verifying messages using the connected wallet

## Returns

`SignMessageResult`

Object containing signing and verification functions and their states

## Example

```tsx
import { useSignMessage } from 'ethers-query'

function Component() {
  const { 
    signMessage, 
    verifyMessage,
    data: signature,
    verificationData,
    isLoading,
    isVerifying
  } = useSignMessage()

  const handleSign = async () => {
    const sig = await signMessage({ message: 'Hello World' })
    console.log('Signature:', sig)
  }

  const handleVerify = async () => {
    const isValid = await verifyMessage({
      message: 'Hello World',
      signature: '0x...'
    })
    console.log('Is valid:', isValid)
    console.log('Signer:', verificationData?.recoveredAddress)
  }

  return (
    <div>
      <button onClick={handleSign} disabled={isLoading}>
        {isLoading ? 'Signing...' : 'Sign Message'}
      </button>
      {signature && <div>Signature: {signature}</div>}
    </div>
  )
}
```
