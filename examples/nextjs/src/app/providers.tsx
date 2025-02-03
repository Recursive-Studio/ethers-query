'use client';

import { ethersAdapter, metadata, projectId } from '@/config/appkit';
import { mainnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { EthersQueryProvider } from 'ethers-query';
import { PropsWithChildren } from 'react';

// Initialize AppKit outside component

  createAppKit({
  adapters: [ethersAdapter],
  projectId: projectId as string,
  networks: [mainnet],
  defaultNetwork: mainnet,
  metadata,
  features: {
    analytics: true
  }
  });


export function Providers({ children }: PropsWithChildren) {
  return (
      <EthersQueryProvider config={{
        alchemyApiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY
      }}>
        {children}
      </EthersQueryProvider>
  );
} 