'use client';

import { useAccount, useBalance } from 'ethers-query';

export function AccountStatus() {
    const account = useAccount();
    const balance = useBalance({
        address: account?.address ?? undefined,
        enabled: account?.isConnected ?? false,
        pollingInterval: 1000,
        formatUnits: true
    });

    console.log('AccountStatus:', {
        address: account.address,
        chainId: account.chainId,
        isConnected: account.isConnected,
        isConnecting: account.isConnecting,
        isDisconnected: account.isDisconnected,
        isInitialized: account.isInitialized,
        hasProvider: !!account.provider
    });

    // Always show loading during SSR or before initialization
    if (!account.isInitialized || account.isConnecting) {
        return (
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-white-800 mb-4">Account Status</h2>
                <div className="flex items-center gap-2 text-gray-500">
                    <div className="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
                    Loading...
                </div>
            </div>
        );
    }

    if (account.isDisconnected) {
        return (
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm">
                <h2 className="text-xl font-semibold text-white-800 mb-4">Account Status</h2>
                <div className="flex items-center gap-2 text-red-500">
                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                    Disconnected
                </div>
            </div>
        );
    }

    return (
        <div className="p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            <h2 className="text-xl font-semibold text-white-800">Account Status</h2>
            <div className="space-y-3">
                <div className="flex items-center gap-2 text-green-500">
                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                    Connected
                </div>
                {account.address && (
                    <div className="text-white-700">
                        <span className="font-medium">Address: </span>
                        <span className="font-mono">{account.address}</span>
                    </div>
                )}
                {account.chainId && (
                    <div className="text-white-700">
                        <span className="font-medium">Chain ID: </span>
                        <span>{account.chainId}</span>
                    </div>
                )}
                {balance.data && (
                    <div className="text-white-700">
                        <span className="font-medium">Balance: </span>
                        <span>{balance.data} ETH</span>
                    </div>
                )}
            </div>
        </div>
    );
} 