import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

/**
 * Provider component for configuring React Query with ethers-query defaults
 * @category Context
 * @beta
 * 
 * This provider sets up React Query with optimized defaults for blockchain data:
 * - 5 second stale time for queries
 * - Disabled window focus refetching
 * - No retries for failed queries/mutations
 * - Error throwing enabled for better error handling
 * 
 * @example
 * ```tsx
 * import { EthersQueryClientProvider } from 'ethers-query'
 * 
 * function App() {
 *   return (
 *     <EthersQueryClientProvider>
 *       <YourApp />
 *     </EthersQueryClientProvider>
 *   )
 * }
 * ```
 */
export function EthersQueryClientProvider({ children }: PropsWithChildren) {
    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 5 * 1000,
                refetchOnWindowFocus: false,
                retry: false,
                throwOnError: true
            },
            mutations: {
                retry: false,
                throwOnError: true
            }
        }
    }))

    return (
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
    )
} 