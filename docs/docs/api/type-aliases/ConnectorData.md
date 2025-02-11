# Type Alias: ConnectorData

> **ConnectorData**: `object`

Defined in: [packages/ethers-query/src/connectors/base.ts:9](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L9)

**`Beta`**

Data returned by a wallet connector after successful connection

## Type declaration

### account

> **account**: `string` \| `null`

The connected account address or null if not available

### chainId

> **chainId**: `number` \| `null`

The current chain ID or null if not available

### provider

> **provider**: `Provider` \| `null`

The ethers Provider instance or null if not available
