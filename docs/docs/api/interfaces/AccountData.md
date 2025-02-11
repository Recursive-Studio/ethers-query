# Interface: AccountData

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:11](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L11)

**`Beta`**

Data returned by the useAccount hook

## Properties

### address

> **address**: `null` \| `string`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:13](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L13)

**`Beta`**

The connected account address or null if not connected

***

### chainId

> **chainId**: `null` \| `number`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:15](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L15)

**`Beta`**

The current chain ID or null if not connected

***

### isConnected

> **isConnected**: `boolean`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:17](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L17)

**`Beta`**

Whether the wallet is currently connected

***

### isConnecting

> **isConnecting**: `boolean`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:19](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L19)

**`Beta`**

Whether the wallet is in the process of connecting

***

### isDisconnected

> **isDisconnected**: `boolean`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:21](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L21)

**`Beta`**

Whether the wallet is disconnected

***

### isInitialized

> **isInitialized**: `boolean`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:23](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L23)

**`Beta`**

Whether the wallet connection has been initialized

***

### provider

> **provider**: `null` \| `Provider`

Defined in: [packages/ethers-query/src/hooks/useAccount.ts:25](https://github.com/Recursive-Studio/ethers-query/blob/1bdb1b329b122727a817aadaea601cbc34f09e37/packages/ethers-query/src/hooks/useAccount.ts#L25)

**`Beta`**

The current ethers Provider instance or null if not connected
