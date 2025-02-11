---
sidebar_position: 2
---

# Smart Contract Interaction

This guide explains how to interact with smart contracts using ethers-query.

## Reading Contract Data

Use the `useSmartContract` hook to read data from a smart contract:

```tsx
import { useSmartContract } from 'ethers-query';

function TokenBalance({ tokenAddress }) {
  const { address } = useAccount();
  
  const { data: balance } = useSmartContract({
    address: tokenAddress,
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
    args: [address],
  });

  return <div>Balance: {balance?.toString()}</div>;
}
```

## Writing to Contracts

For contract writes (transactions), use the write method:

```tsx
function TokenTransfer({ tokenAddress }) {
  const contract = useSmartContract({
    address: tokenAddress,
    abi: ['function transfer(address to, uint256 amount) returns (bool)'],
    functionName: 'transfer',
  });

  const handleTransfer = async (to: string, amount: bigint) => {
    try {
      const tx = await contract.write({
        args: [to, amount],
      });
      await tx.wait();
      console.log('Transfer successful!');
    } catch (error) {
      console.error('Transfer failed:', error);
    }
  };

  return <button onClick={() => handleTransfer(recipient, amount)}>Transfer</button>;
}
```

## Contract Events

Listen to contract events:

```tsx
function TransferEvents({ tokenAddress }) {
  const [events, setEvents] = useState([]);
  
  const contract = useSmartContract({
    address: tokenAddress,
    abi: ['event Transfer(address indexed from, address indexed to, uint256 value)'],
  });

  useEffect(() => {
    const listener = (from, to, value) => {
      setEvents(prev => [...prev, { from, to, value }]);
    };

    contract.on('Transfer', listener);
    return () => contract.off('Transfer', listener);
  }, [contract]);

  return (
    <div>
      <h3>Recent Transfers</h3>
      {events.map((event, i) => (
        <div key={i}>
          From: {event.from} To: {event.to} Value: {event.value.toString()}
        </div>
      ))}
    </div>
  );
}
```

## Best Practices

1. Always validate user input before sending transactions
2. Handle errors gracefully and provide user feedback
3. Use TypeScript for better type safety with contract interactions
4. Cache and reuse contract instances when possible
5. Consider gas costs and network conditions
6. Implement proper loading and success states
7. Add proper error boundaries for contract interactions 