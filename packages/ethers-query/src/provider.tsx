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
                                    
                                    // Set up provider event listeners
                                    browserProvider.provider.on('accountsChanged', handleAccountsChanged);
                                    browserProvider.provider.on('chainChanged', async () => {
                                        console.log('[EthersQueryProvider] Chain changed');
                                        if (mounted) {
                                            try {
                                                const browserProvider = new BrowserProvider(window.ethereum);
                                                await browserProvider.getSigner();
                                                setProvider(browserProvider);
                                                queryClient.invalidateQueries({ queryKey: ['account'] });
                                            } catch (e) {
                                                console.error('[EthersQueryProvider] Error handling chain change:', e);
                                                setProvider(null);
                                                queryClient.invalidateQueries({ queryKey: ['account'] });
                                            }
                                        }
                                    });
                                    browserProvider.provider.on('disconnect', () => {
                                        console.log('[EthersQueryProvider] Provider disconnected');
                                        if (mounted) {
                                            setProvider(null);
                                            queryClient.invalidateQueries({ queryKey: ['account'] });
                                        }
                                    });
                                    
                                    setProvider(browserProvider);
                                    queryClient.invalidateQueries({ queryKey: ['account'] });
                                } catch (e) {
                                    console.error('[EthersQueryProvider] Error setting up provider after account change:', e);
                                    setProvider(null);
                                }
                            }
                        }
                    };

                    // Initial setup of provider if we have an account
                    const setupInitialProvider = async () => {
                        try {
                            const accounts = await window.ethereum.request({ method: 'eth_accounts' });
                            if (accounts && accounts.length > 0) {
                                const browserProvider = new BrowserProvider(window.ethereum);
                                await browserProvider.getSigner();
                                
                                // Set up provider event listeners
                                browserProvider.provider.on('accountsChanged', handleAccountsChanged);
                                browserProvider.provider.on('chainChanged', async () => {
                                    console.log('[EthersQueryProvider] Chain changed');
                                    if (mounted) {
                                        try {
                                            const browserProvider = new BrowserProvider(window.ethereum);
                                            await browserProvider.getSigner();
                                            setProvider(browserProvider);
                                            queryClient.invalidateQueries({ queryKey: ['account'] });
                                        } catch (e) {
                                            console.error('[EthersQueryProvider] Error handling chain change:', e);
                                            setProvider(null);
                                            queryClient.invalidateQueries({ queryKey: ['account'] });
                                        }
                                    }
                                });
                                browserProvider.provider.on('disconnect', () => {
                                    console.log('[EthersQueryProvider] Provider disconnected');
                                    if (mounted) {
                                        setProvider(null);
                                        queryClient.invalidateQueries({ queryKey: ['account'] });
                                    }
                                });
                                
                                setProvider(browserProvider);
                            }
                        } catch (e) {
                            console.error('[EthersQueryProvider] Error setting up initial provider:', e);
                            setProvider(null);
                        }
                    };

                    await setupInitialProvider();
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
