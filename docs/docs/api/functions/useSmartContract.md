# Function: useSmartContract()

> **useSmartContract**\<`TAbi`, `TFunctionName`, `TArgs`, `TData`\>(`__namedParameters`): `UseSmartContractResult`\<`TData`\>

Defined in: [packages/ethers-query/src/hooks/useSmartContract.ts:122](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useSmartContract.ts#L122)

**`Beta`**

Hook for interacting with smart contracts

## Type Parameters

• **TAbi** *extends* `InterfaceAbi`

• **TFunctionName** *extends* `string`

• **TArgs** *extends* readonly `unknown`[] = readonly `unknown`[]

• **TData** = `unknown`

## Parameters

### \_\_namedParameters

`UseSmartContractConfig`\<`TAbi`, `TFunctionName`, `TArgs`\>

## Returns

`UseSmartContractResult`\<`TData`\>

Object containing contract interaction methods and state

## Example

```tsx
import { useSmartContract } from 'ethers-query'

// ERC20 token example
function TokenBalance() {
  const contract = useSmartContract({
    address: '0x...',
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: ['0x...'] // address to check
  })

  const fetchBalance = async () => {
    try {
      const balance = await contract.read()
      console.log('Balance:', balance.toString())
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div>
      <button onClick={fetchBalance} disabled={contract.isLoading}>
        Get Balance
      </button>
      {contract.data && <div>Balance: {contract.data.toString()}</div>}
      {contract.error && <div>Error: {contract.error.message}</div>}
    </div>
  )
}

// Write function example
function Transfer() {
  const contract = useSmartContract({
    address: '0x...',
    abi: ['function transfer(address,uint256)'],
    functionName: 'transfer',
    args: ['0x...', '1000000000000000000'] // recipient and amount
  })

  const handleTransfer = async () => {
    try {
      const tx = await contract.write()
      console.log('Transaction:', tx)
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <button onClick={handleTransfer} disabled={contract.isLoading}>
      Transfer
    </button>
  )
}
```
