'use client'

import { EthersAdapter } from '@reown/appkit-adapter-ethers'
import { mainnet, sepolia } from '@reown/appkit/networks'
import { createAppKit } from '@reown/appkit/react'
import { Client, EthersQueryProvider, InjectedConnector } from 'ethers-query'
import { type ReactNode } from 'react'
import QueryProvider from './query-provider'

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


export default function Providers({ children }: { children: ReactNode }) {
  return (
    
      <EthersQueryProvider client={ethersClient}>
        <QueryProvider>
          {children}
        </QueryProvider>
      </EthersQueryProvider>
    
  )
} 