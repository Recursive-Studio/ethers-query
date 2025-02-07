'use client'

import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { PropsWithChildren } from 'react';

// Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;

// Create AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true
  }
});

export function AppKit({ children }: PropsWithChildren) {
  return <>{children}</>;
}