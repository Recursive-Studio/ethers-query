'use client';

import { useAccount } from 'ethers-query';

export function AccountStatus() {
    const { data: account, isLoading, error } = useAccount();

    console.log({account, isLoading, error});

    if (isLoading) {
        return (
            <div>
                <h2>Account Status</h2>
                <p>Loading...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div>
                <h2>Account Status</h2>
                <p>Error: {error.message}</p>
            </div>
        );
    }

    return (
        <div>
            <h2>Account Status</h2>
            <p>Status: {account.status}</p>
            {account.address && (
                <p>Address: {account.address}</p>
            )}
        </div>
    );
} 