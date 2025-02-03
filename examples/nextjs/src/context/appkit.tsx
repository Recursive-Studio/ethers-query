'use client'

import { EthersAdapter } from '@reown/appkit-adapter-ethers';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { createAppKit } from '@reown/appkit/react';
import { PropsWithChildren } from 'react';

// 1. Get projectId at https://cloud.reown.com
const projectId = process.env.NEXT_PUBLIC_PROJECT_ID as string;



// 3. Create the AppKit instance
createAppKit({
  adapters: [new EthersAdapter()],
  metadata,
  networks: [mainnet, arbitrum],
  projectId,
  features: {
    analytics: true // Optional - defaults to your Cloud configuration
  }
})

export function AppKit({children}: PropsWithChildren) {
  return (
    <>
      {children}
    </>
  )
}