---
sidebar_position: 3
---

# App Kit Integration

ethers-query seamlessly integrates with Reown App Kit to provide a smooth wallet connection experience.

## Setup

First, install the required dependencies:

```bash
pnpm add ethers-query @reown/appkit @reown/appkit-adapter-ethers
```

## Initialize App Kit

Create a providers file (e.g., `providers.tsx`) to set up App Kit and ethers-query:

```tsx
'use client'

import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Client, EthersQueryProvider, InjectedConnector } from 'ethers-query'
import { PropsWithChildren, useState } from 'react'

// Create the ethers client
const ethersClient = new Client({
  connectors: [new InjectedConnector()]
})

// Initialize App Kit with your project configuration
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, sepolia],
  projectId,
  features: {
    analytics: true
  }
});

export default function Providers({ children }: PropsWithChildren) {
  const [queryClient] = useState(() => new QueryClient())

  return (
    <QueryClientProvider client={queryClient}>
      <EthersQueryProvider client={ethersClient}>
        {children}
      </EthersQueryProvider>
    </QueryClientProvider>
  )
}
```

Make sure to wrap your application with the providers:

```tsx
// app/layout.tsx or your root component
import Providers from './providers'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
```

## Connect Button

Create a connect button that uses App Kit:

```tsx
import { useAppKit } from '@reown/appkit/react';
import { useAccount } from 'ethers-query';

function ConnectButton() {
  const appKit = useAppKit();
  const account = useAccount();

  const handleClick = async () => {
    try {
      await appKit.open();
      // ethers-query will automatically detect the connection
    } catch (error) {
      console.error('Failed to connect:', error);
    }
  };

  if (account.isConnected && account.address) {
    return (
      <button onClick={handleClick}>
        {truncateAddress(account.address)}
      </button>
    );
  }

  return <button onClick={handleClick}>Connect Wallet</button>;
}

// Utility function to truncate addresses
const truncateAddress = (address: string) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};
```

## Account Status

Use ethers-query hooks with App Kit:

```tsx
import { useAccount, useBalance, useProvider, useSigner } from 'ethers-query';

function AccountStatus() {
  const provider = useProvider();
  const signer = useSigner();
  const { address, chainId, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return <p>Not connected</p>;
  }

  return (
    <div>
      <p>Address: {address}</p>
      <p>Chain ID: {chainId}</p>
      <p>Balance: {balance?.formatted} {balance?.symbol}</p>
    </div>
  );
}
```

## Smart Contract Integration

Use ethers-query's contract hooks with App Kit:

```tsx
import { useSmartContract } from 'ethers-query';

function SmartContractExample() {
  const contract = useSmartContract({
    address: '0x...',
    abi: ['function balanceOf(address) view returns (uint256)'],
    functionName: 'balanceOf',
  });

  // Contract reads and writes work seamlessly with App Kit
  const handleInteraction = async () => {
    try {
      const result = await contract.read();
      console.log('Balance:', result.toString());
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <button onClick={handleInteraction}>
      Interact with Contract
    </button>
  );
}
```

## Configuration Options

When initializing App Kit, you can configure various options:

```tsx
createAppKit({
  // Required: Adapters for different wallet types
  adapters: [new EthersAdapter()],
  
  // Required: Supported networks
  networks: [mainnet, sepolia],
  
  // Required: Your project ID from Reown
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  
  // Optional: Additional features
  features: {
    analytics: true,
    // Add other features as needed
  },
  
  // Optional: Custom theme configuration
  theme: {
    // Your theme options
  }
});
```

## Best Practices

1. Always handle connection errors gracefully
2. Use App Kit's built-in UI components when available
3. Let ethers-query handle the Web3 state management
4. Implement proper loading states during connections
5. Consider implementing auto-connect functionality
6. Keep your project ID secure using environment variables
7. Configure appropriate networks for your use case 