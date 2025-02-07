import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserProvider, JsonRpcProvider, type Provider } from 'ethers';
import { type FC, type PropsWithChildren, createContext, useContext, useEffect, useRef, useState } from 'react';

declare global {
    interface Window {
        ethereum?: any;
    }
}

export interface EthersQueryConfig {
    alchemyApiKey?: string;
    rpcUrl?: string;
}

interface EthersQueryContextValue {
    provider: Provider | null;
    isConnecting: boolean;
    error: Error | null;
    disconnect: () => void;
}

const EthersQueryContext = createContext<EthersQueryContextValue | undefined>(undefined);

// Create a client if one doesn't exist
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 5000,
            refetchOnWindowFocus: false,
        },
    },
});

export interface EthersQueryProviderProps extends PropsWithChildren {
    config?: EthersQueryConfig;
}

export const EthersQueryProvider: FC<EthersQueryProviderProps> = ({ children, config }) => {
    const [provider, setProvider] = useState<Provider | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const providerRef = useRef<Provider | null>(null);

    // Keep ref in sync with state
    useEffect(() => {
        providerRef.current = provider;
    }, [provider]);

    // Log provider changes
    useEffect(() => {
        console.log('[EthersQueryProvider] Provider state changed:', {
            hasProvider: !!provider,
            isConnecting,
            hasError: !!error
        });
    }, [provider, isConnecting, error]);

    // Disconnect function
    const disconnect = async () => {
        console.log('[EthersQueryProvider] Disconnecting...');
        try {
            if (window.ethereum) {
                // First clear the provider to prevent any queries from using it
                setProvider(null);
                
                // Clear any cached permissions/accounts
                try {
                    await window.ethereum.request({
                        method: 'eth_accounts'
                    });
                } catch (e) {
                    console.log('[EthersQueryProvider] Error clearing accounts:', e);
                }

                // Finally invalidate queries after provider is cleared
                queryClient.invalidateQueries({ queryKey: ['account'] });
            }
        } catch (e) {
            console.error('[EthersQueryProvider] Error during disconnect:', e);
        }
    };

    useEffect(() => {
        let mounted = true;

        const initProvider = async () => {
            try {
                setIsConnecting(true);
                console.log('[EthersQueryProvider] Initializing provider...');
                
                if (typeof window !== 'undefined' && window.ethereum) {
                    console.log('[EthersQueryProvider] Found window.ethereum');
                    
                    // First check if we're already connected using eth_accounts (doesn't trigger connection)
                    try {
                        const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                        console.log('[EthersQueryProvider] Checked accounts:', accounts);
                        
                        if (accounts && accounts.length > 0) {
                            console.log('[EthersQueryProvider] Found existing connection:', accounts[0]);
                            if (mounted) {
                                const browserProvider = new BrowserProvider(window.ethereum);
                                // Wait for provider to be ready before setting it
                                await browserProvider.getSigner();
                                setProvider(browserProvider);
                            }
                        } else {
                            console.log('[EthersQueryProvider] No existing connection found');
                            if (mounted) setProvider(null);
                        }
                    } catch (e) {
                        console.error('[EthersQueryProvider] Error checking accounts:', e);
                        if (mounted) setProvider(null);
                    }

                    // Listen to window.ethereum events
                    const handleAccountsChanged = async (accounts: string[]) => {
                        console.log('[EthersQueryProvider] Account changed:', accounts);
                        if (accounts.length === 0) {
                            console.log('[EthersQueryProvider] No accounts, disconnecting');
                            if (mounted) {
                                setProvider(null);
                                queryClient.invalidateQueries({ queryKey: ['account'] });
                            }
                        } else {
                            console.log('[EthersQueryProvider] Account connected:', accounts[0]);
                            if (mounted) {
                                try {
                                    const browserProvider = new BrowserProvider(window.ethereum);
                                    // Wait for provider to be ready before setting it
                                    await browserProvider.getSigner();
                                    setProvider(browserProvider);
                                    queryClient.invalidateQueries({ queryKey: ['account'] });
                                } catch (e) {
                                    console.error('[EthersQueryProvider] Error setting up provider after account change:', e);
                                    setProvider(null);
                                }
                            }
                        }
                    };

                    // Remove the automatic eth_requestAccounts call
                    window.ethereum.on('accountsChanged', handleAccountsChanged);

                    window.ethereum.on('chainChanged', async () => {
                        console.log('[EthersQueryProvider] Chain changed');
                        // Only update provider if we're already connected
                        if (provider && mounted) {
                            try {
                                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                                if (accounts && accounts.length > 0) {
                                    const browserProvider = new BrowserProvider(window.ethereum);
                                    // Wait for provider to be ready before setting it
                                    await browserProvider.getSigner();
                                    setProvider(browserProvider);
                                    queryClient.invalidateQueries({ queryKey: ['account'] });
                                } else {
                                    setProvider(null);
                                    queryClient.invalidateQueries({ queryKey: ['account'] });
                                }
                            } catch (e) {
                                console.error('[EthersQueryProvider] Error handling chain change:', e);
                                setProvider(null);
                                queryClient.invalidateQueries({ queryKey: ['account'] });
                            }
                        }
                    });

                    // Listen for connect event from AppKit
                    window.ethereum.on('connect', async () => {
                        console.log('[EthersQueryProvider] Received connect event');
                        if (mounted) {
                            try {
                                const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                                if (accounts && accounts.length > 0) {
                                    const browserProvider = new BrowserProvider(window.ethereum);
                                    await browserProvider.getSigner();
                                    setProvider(browserProvider);
                                    queryClient.invalidateQueries({ queryKey: ['account'] });
                                }
                            } catch (e) {
                                console.error('[EthersQueryProvider] Error handling connect event:', e);
                            }
                        }
                    });

                } else {
                    // Fallback to RPC provider
                    const rpcUrl = config?.rpcUrl || `https://eth-mainnet.g.alchemy.com/v2/${config?.alchemyApiKey || 'demo'}`;
                    const jsonRpcProvider = new JsonRpcProvider(rpcUrl);
                    if (mounted) setProvider(jsonRpcProvider);
                }
            } catch (e) {
                console.error('[EthersQueryProvider] Error initializing provider:', e);
                if (mounted) setError(e instanceof Error ? e : new Error('Failed to initialize provider'));
            } finally {
                if (mounted) setIsConnecting(false);
            }
        };

        initProvider();
        
        // Cleanup function
        return () => {
            mounted = false;
            if (window.ethereum) {
                window.ethereum.removeListener('accountsChanged', () => {});
                window.ethereum.removeListener('chainChanged', () => {});
                window.ethereum.removeListener('connect', () => {});
                window.ethereum.removeListener('disconnect', () => {});
            }
            if (providerRef.current instanceof BrowserProvider) {
                providerRef.current.removeAllListeners();
            }
        };
    }, [config]);

    const contextValue = {
        provider,
        isConnecting,
        error,
        disconnect,
    };

    console.log('[EthersQueryProvider] Rendering with context:', {
        hasProvider: !!contextValue.provider,
        isConnecting: contextValue.isConnecting,
        hasError: !!contextValue.error
    });

    return (
        <QueryClientProvider client={queryClient}>
            <EthersQueryContext.Provider value={contextValue}>
                {children}
            </EthersQueryContext.Provider>
        </QueryClientProvider>
    );
};

export const useEthersQuery = () => {
    const context = useContext(EthersQueryContext);
    if (context === undefined) {
        throw new Error('useEthersQuery must be used within an EthersQueryProvider');
    }
    console.log('[useEthersQuery] Called with context:', {
        hasProvider: !!context.provider,
        isConnecting: context.isConnecting,
        hasError: !!context.error
    });
    return context;
};
