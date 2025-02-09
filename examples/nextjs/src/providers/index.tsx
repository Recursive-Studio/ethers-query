'use client'

import { Client, EthersQueryProvider, InjectedConnector } from 'ethers-query'
import { type ReactNode } from 'react'
import QueryProvider from './query-provider'

// Create the ethers client outside of the component
const ethersClient = new Client({
  connectors: [new InjectedConnector()]
})

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <EthersQueryProvider client={ethersClient}>
        {children}
      </EthersQueryProvider>
    </QueryProvider>
  )
} 