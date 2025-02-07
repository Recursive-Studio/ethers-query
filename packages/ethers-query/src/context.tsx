import { type FC, type PropsWithChildren, createContext, useContext } from 'react'
import type { Client } from './client.js'

const EthersQueryContext = createContext<Client | undefined>(undefined)

export interface EthersQueryProviderProps extends PropsWithChildren {
    client: Client
}

export const EthersQueryProvider: FC<EthersQueryProviderProps> = ({ 
    children, 
    client 
}) => {
    return (
        <EthersQueryContext.Provider value={client}>
            {children}
        </EthersQueryContext.Provider>
    )
}

export function useEthersQuery(): Client {
    const client = useContext(EthersQueryContext)
    if (!client) {
        throw new Error('useEthersQuery must be used within an EthersQueryProvider')
    }
    return client
} 