import { QueryClient, useQuery } from '@tanstack/react-query';
import { useEthersQuery } from '../provider.js';

export type AccountStatus = 'connecting' | 'connected' | 'disconnected' | 'error';

export interface AccountData {
    status: AccountStatus;
    address: string | null;
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

export function useAccount() {
    const { provider, isConnecting, error } = useEthersQuery();

    console.log('[useAccount] Hook called with:', {
        hasProvider: !!provider,
        isConnecting,
        hasError: !!error
    });

    return useQuery<AccountData>({
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
                console.log('[useAccount] Getting signer...');
                const signer = await currentProvider.getSigner();
                console.log('[useAccount] Got signer, getting address...');
                const address = await signer.getAddress();
                console.log('[useAccount] Got address:', address);

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
        enabled: !isConnecting, // Don't run query while provider is initializing
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
} 
