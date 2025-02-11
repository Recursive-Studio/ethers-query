# Function: EthersQueryProvider()

> **EthersQueryProvider**(`props`, `context`?): `ReactNode`

Defined in: [packages/ethers-query/src/context.tsx:44](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/context.tsx#L44)

**`Beta`**

Provider component for making the ethers-query Client available throughout the app

## Parameters

### props

[`EthersQueryProviderProps`](../interfaces/EthersQueryProviderProps.md)

### context?

`any`

## Returns

`ReactNode`

## Example

```tsx
import { EthersQueryProvider, Client, InjectedConnector } from 'ethers-query'

const client = new Client({
  connectors: [new InjectedConnector()]
})

function App() {
  return (
    <EthersQueryProvider client={client}>
      <YourApp />
    </EthersQueryProvider>
  )
}
```
