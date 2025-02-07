'use client';

import { useAccount } from 'ethers-query';

export function AccountStatus() {
    const account = useAccount();

    console.log('AccountStatus:', {
        address: account.address,
        chainId: account.chainId,
        isConnected: account.isConnected,
        isConnecting: account.isConnecting,
        isDisconnected: account.isDisconnected,
        hasProvider: !!account.provider
    });

    if (account.isConnecting) {
        return (
            <div>
                <h2>Account Status</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (account.isDisconnected) {
        return (
            <div>
                <h2>Account Status</h2>
                <p>Disconnected</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Account Status</h2>
            <p>Connected</p>
            {account.address && (
                <p>Address: {account.address}</p>
            )}
            {account.chainId && (
                <p>Chain ID: {account.chainId}</p>
            )}
        </div>
    );
} 