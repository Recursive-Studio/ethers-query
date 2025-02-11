# Interface: Connector

Defined in: [packages/ethers-query/src/connectors/base.ts:38](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L38)

**`Beta`**

Base interface for wallet connectors

## Example

```typescript
class MyConnector implements Connector {
  readonly id = 'my-connector'
  readonly name = 'My Wallet'
  
  async connect() {
    // Implementation
  }
  
  // ... other methods
}
```

## Properties

### id

> `readonly` **id**: `string`

Defined in: [packages/ethers-query/src/connectors/base.ts:40](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L40)

**`Beta`**

Unique identifier for the connector

***

### name

> `readonly` **name**: `string`

Defined in: [packages/ethers-query/src/connectors/base.ts:43](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L43)

**`Beta`**

Human-readable name for the connector

## Methods

### connect()

> **connect**(): `Promise`\<[`ConnectorData`](../type-aliases/ConnectorData.md)\>

Defined in: [packages/ethers-query/src/connectors/base.ts:50](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L50)

**`Beta`**

#### Returns

`Promise`\<[`ConnectorData`](../type-aliases/ConnectorData.md)\>

Connection data including account, chain ID, and provider

#### Throws

If connection fails or is rejected

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: [packages/ethers-query/src/connectors/base.ts:56](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L56)

**`Beta`**

#### Returns

`Promise`\<`void`\>

***

### getAccount()

> **getAccount**(): `Promise`\<`null` \| `string`\>

Defined in: [packages/ethers-query/src/connectors/base.ts:75](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L75)

**`Beta`**

#### Returns

`Promise`\<`null` \| `string`\>

The connected account address or null if not connected

***

### getChainId()

> **getChainId**(): `Promise`\<`null` \| `number`\>

Defined in: [packages/ethers-query/src/connectors/base.ts:81](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L81)

**`Beta`**

#### Returns

`Promise`\<`null` \| `number`\>

The current chain ID or null if not connected

***

### getProvider()

> **getProvider**(): `Promise`\<`null` \| `Provider`\>

Defined in: [packages/ethers-query/src/connectors/base.ts:63](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L63)

**`Beta`**

#### Returns

`Promise`\<`null` \| `Provider`\>

The ethers Provider instance

#### Throws

If no provider is available

***

### isConnected()

> **isConnected**(): `Promise`\<`boolean`\>

Defined in: [packages/ethers-query/src/connectors/base.ts:69](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L69)

**`Beta`**

#### Returns

`Promise`\<`boolean`\>

True if connected, false otherwise

***

### onAccountsChanged()?

> `optional` **onAccountsChanged**(`accounts`): `void`

Defined in: [packages/ethers-query/src/connectors/base.ts:87](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L87)

**`Beta`**

#### Parameters

##### accounts

`string`[]

Array of new account addresses

#### Returns

`void`

***

### onChainChanged()?

> `optional` **onChainChanged**(`chainId`): `void`

Defined in: [packages/ethers-query/src/connectors/base.ts:93](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L93)

**`Beta`**

#### Parameters

##### chainId

New chain ID (decimal or hex)

`string` | `number`

#### Returns

`void`

***

### onDisconnect()?

> `optional` **onDisconnect**(): `void`

Defined in: [packages/ethers-query/src/connectors/base.ts:98](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/base.ts#L98)

**`Beta`**

#### Returns

`void`
