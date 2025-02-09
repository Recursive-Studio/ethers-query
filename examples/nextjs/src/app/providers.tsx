'use client'

import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Client, EthersQueryProvider, InjectedConnector } from 'ethers-query'
import { PropsWithChildren, useState } from 'react'

// Create the ethers client outside of the component
const ethersClient = new Client({
  connectors: [new InjectedConnector()]
})

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