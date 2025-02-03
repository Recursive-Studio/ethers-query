import { QueryClient, useQuery } from '@tanstack/react-query';
import { useEthersQuery } from '../provider.js';

export type AccountStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface AccountData {
    status: AccountStatus;
    address: string | null;
}

export interface UseAccountResult {
    data: AccountData;
    isLoading: boolean;
    error: Error | null;
    disconnect: () => void;
}

// Create a client if one doesn't exist
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
        },
    },
});

export function useAccount(): UseAccountResult {
    const { provider, isConnecting, error, disconnect } = useEthersQuery();

    console.log('[useAccount] Hook called with:', {
        hasProvider: !!provider,
        isConnecting,
        hasError: !!error
    });

    const query = useQuery<AccountData>({
        queryKey: ['account', !!provider],
        queryFn: async () => {
            const currentProvider = provider;
            console.log('[useAccount] queryFn called with provider:', !!currentProvider);
            
            if (!currentProvider) {
                console.log('[useAccount] No provider available');
                return {
                    status: 'disconnected' as const,
                    address: null,
                };
            }

            try {
                // Check if provider is still valid before proceeding
                const accounts = await window.ethereum?.request({ method: 'eth_accounts' });
                if (!accounts || accounts.length === 0) {
                    console.log('[useAccount] No accounts available');
                    return {
                        status: 'disconnected' as const,
                        address: null,
                    };
                }

                console.log('[useAccount] Getting signer...');
                const signer = await currentProvider.getSigner();
                console.log('[useAccount] Got signer, getting address...');
                const address = await signer.getAddress();
                console.log('[useAccount] Got address:', address);

                // Verify the address matches the current account
                if (address.toLowerCase() !== accounts[0].toLowerCase()) {
                    console.log('[useAccount] Address mismatch, returning disconnected state');
                    return {
                        status: 'disconnected' as const,
                        address: null,
                    };
                }

                return {
                    status: 'connected' as const,
                    address,
                };
            } catch (e) {
                console.error('[useAccount] Error getting signer/address:', e);
                return {
                    status: 'disconnected' as const,
                    address: null,
                };
            }
        },
        enabled: !isConnecting && !!provider, // Only run query when provider is available and not connecting
        staleTime: Infinity, // Cache the result until explicitly invalidated
        initialData: () => {
            // If we're connecting, show connecting state
            if (isConnecting) {
                return {
                    status: 'connecting' as const,
                    address: null,
                };
            }
            // If we have an error, show error state
            if (error) {
                return {
                    status: 'error' as const,
                    address: null,
                };
            }
            // If we have a provider, let the query run
            if (provider) {
                return undefined; // Let the query run to get the actual state
            }
            // Otherwise, we're disconnected
            return {
                status: 'disconnected' as const,
                address: null,
            };
        },
    });

    return {
        ...query,
        disconnect,
    };
} 
