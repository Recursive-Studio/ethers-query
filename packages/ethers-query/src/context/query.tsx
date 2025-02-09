import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { type PropsWithChildren, useState } from 'react'

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