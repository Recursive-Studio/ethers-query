# Class: InjectedConnector

Defined in: [packages/ethers-query/src/connectors/injected.ts:30](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L30)

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

## Implements

- [`Connector`](../interfaces/Connector.md)

## Constructors

### new InjectedConnector()

> **new InjectedConnector**(): [`InjectedConnector`](InjectedConnector.md)

#### Returns

[`InjectedConnector`](InjectedConnector.md)

## Properties

### id

> `readonly` **id**: `"injected"` = `'injected'`

Defined in: [packages/ethers-query/src/connectors/injected.ts:32](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L32)

Unique identifier for the injected connector

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`id`](../interfaces/Connector.md#id)

***

### name

> `readonly` **name**: `"Browser Wallet"` = `'Browser Wallet'`

Defined in: [packages/ethers-query/src/connectors/injected.ts:35](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L35)

Human-readable name for the injected connector

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`name`](../interfaces/Connector.md#name)

## Methods

### connect()

> **connect**(): `Promise`\<[`ConnectorData`](../type-aliases/ConnectorData.md)\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:92](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L92)

#### Returns

`Promise`\<[`ConnectorData`](../type-aliases/ConnectorData.md)\>

Connection data including account, chain ID, and provider

#### Throws

If no provider is available or connection fails

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`connect`](../interfaces/Connector.md#connect)

***

### disconnect()

> **disconnect**(): `Promise`\<`void`\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:114](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L114)

#### Returns

`Promise`\<`void`\>

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`disconnect`](../interfaces/Connector.md#disconnect)

***

### getAccount()

> **getAccount**(): `Promise`\<`null` \| `string`\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:149](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L149)

#### Returns

`Promise`\<`null` \| `string`\>

The connected account address or null if not connected

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`getAccount`](../interfaces/Connector.md#getaccount)

***

### getChainId()

> **getChainId**(): `Promise`\<`null` \| `number`\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:165](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L165)

#### Returns

`Promise`\<`null` \| `number`\>

The current chain ID or null if not connected

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`getChainId`](../interfaces/Connector.md#getchainid)

***

### getProvider()

> **getProvider**(): `Promise`\<`null` \| `Provider`\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:123](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L123)

#### Returns

`Promise`\<`null` \| `Provider`\>

The ethers Provider instance or null if not connected

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`getProvider`](../interfaces/Connector.md#getprovider)

***

### isConnected()

> **isConnected**(): `Promise`\<`boolean`\>

Defined in: [packages/ethers-query/src/connectors/injected.ts:133](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L133)

#### Returns

`Promise`\<`boolean`\>

True if connected, false otherwise

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`isConnected`](../interfaces/Connector.md#isconnected)

***

### onAccountsChanged()

> **onAccountsChanged**(`accounts`): `void`

Defined in: [packages/ethers-query/src/connectors/injected.ts:181](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L181)

#### Parameters

##### accounts

`string`[]

Array of new account addresses

#### Returns

`void`

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`onAccountsChanged`](../interfaces/Connector.md#onaccountschanged)

***

### onChainChanged()

> **onChainChanged**(`chainId`): `void`

Defined in: [packages/ethers-query/src/connectors/injected.ts:189](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L189)

#### Parameters

##### chainId

`string`

New chain ID (hex string)

#### Returns

`void`

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`onChainChanged`](../interfaces/Connector.md#onchainchanged)

***

### onDisconnect()

> **onDisconnect**(): `void`

Defined in: [packages/ethers-query/src/connectors/injected.ts:197](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/connectors/injected.ts#L197)

#### Returns

`void`

#### Implementation of

[`Connector`](../interfaces/Connector.md).[`onDisconnect`](../interfaces/Connector.md#ondisconnect)
