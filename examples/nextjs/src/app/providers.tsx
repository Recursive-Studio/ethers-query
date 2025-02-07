'use client';

import { Client, EthersQueryProvider, InjectedConnector } from 'ethers-query';
import { PropsWithChildren } from 'react';

// Create the client outside of the component to ensure it's only created once
const client = new Client({
    connectors: [
        new InjectedConnector()
    ]
});

export function Providers({ children }: PropsWithChildren) {
    return (
        <EthersQueryProvider client={client}>
            {children}
        </EthersQueryProvider>
    );
} 