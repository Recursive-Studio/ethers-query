# Function: useBalance()

> **useBalance**(`__namedParameters`): `UseBalanceResult`

Defined in: [packages/ethers-query/src/hooks/useBalance.ts:67](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useBalance.ts#L67)

**`Beta`**

Hook for fetching account balances

## Parameters

### \_\_namedParameters

`UseBalanceConfig` = `{}`

## Returns

`UseBalanceResult`

Object containing the account balance and loading state

## Example

```tsx
import { useBalance } from 'ethers-query'

function Component() {
  const { 
    data: balance, 
    isLoading,
    error 
  } = useBalance({
    address: '0x...',
    formatUnits: true
  })

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error.message}</div>

  return <div>Balance: {balance} ETH</div>
}
```
