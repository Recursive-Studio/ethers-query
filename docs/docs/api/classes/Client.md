# Class: Client

Defined in: [packages/ethers-query/src/client.ts:69](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L69)

**`Beta`**

The core client for managing wallet connections and state

## Example

```typescript
import { Client, InjectedConnector } from 'ethers-query'

const client = new Client({
  connectors: [new InjectedConnector()]
})

// Connect to the first available connector
await client.connect()

// Get the current state
const state = client.getState()

// Subscribe to state changes
const unsubscribe = client.subscribe((state) => {
  console.log('New state:', state)
})

// Disconnect
await client.disconnect()
```

## Constructors

### new Client()

> **new Client**(`config`): [`Client`](Client.md)

Defined in: [packages/ethers-query/src/client.ts:77](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L77)

**`Beta`**

#### Parameters

##### config

`ClientConfig`

#### Returns

[`Client`](Client.md)

## Methods

### connect()

> **connect**(`connectorId`?): `Promise`\<`void`\>

Defined in: [packages/ethers-query/src/client.ts:238](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L238)

**`Beta`**

#### Parameters

##### connectorId?

`string`

Optional ID of the specific connector to use

#### Returns

`Promise`\<`void`\>

#### Throws

Error if connector is not found or connection fails

#### Example

```typescript
// Connect using the first available connector
await client.connect()

// Connect using a specific connector
await client.connect('injected')
```

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: [packages/ethers-query/src/client.ts:278](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L278)

**`Beta`**

#### Returns

`Promise`\<`void`\>

#### Example

```typescript
await client.disconnect()
```

***

### getProvider()

> **getProvider**(): `Promise`\<`null` \| `Provider`\>

Defined in: [packages/ethers-query/src/client.ts:316](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L316)

**`Beta`**

#### Returns

`Promise`\<`null` \| `Provider`\>

The current ethers Provider or null if not connected

#### Example

```typescript
const provider = await client.getProvider()
if (provider) {
  const blockNumber = await provider.getBlockNumber()
}
```

***

### getState()

> **getState**(): `ClientState`

Defined in: [packages/ethers-query/src/client.ts:218](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L218)

**`Beta`**

#### Returns

`ClientState`

The current state including connection status and wallet data

***

### subscribe()

> **subscribe**(`listener`): () => `void`

Defined in: [packages/ethers-query/src/client.ts:209](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/client.ts#L209)

**`Beta`**

#### Parameters

##### listener

`StateListener`

#### Returns

`Function`

A function to unsubscribe

##### Returns

`void`

#### Example

```typescript
const unsubscribe = client.subscribe((state) => {
  console.log('State changed:', state)
})

// Later, to unsubscribe
unsubscribe()
```
