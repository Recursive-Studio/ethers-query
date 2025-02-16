
import { useAccount, useWallet } from "ethers-query";

export const WalletActions = () => {
    const { disconnect, isDisconnecting, connect } = useWallet()
    const {isConnected} = useAccount();

    const handleConnect = async () => {
        try {
            await connect({connectorId: 'injected'})
        } catch (error) {
            console.error('Failed to connect:', error)
        }
    }

    return (
        <div className="flex flex-col gap-6 p-4">
            <div className="p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
                <h2 className="text-xl font-semibold text-white-800">Wallet Actions</h2>
                <p className="text-gray-300 text-sm">
                    Connect or disconnect your wallet to interact with the application. 
                    {isDisconnecting && <span className="text-yellow-400 ml-2">Disconnecting wallet...</span>}
                </p>
                <div className="flex gap-4">
                    {isConnected && <button 
                        onClick={disconnect}
                        disabled={isDisconnecting}
                        className="px-4 py-2 bg-red-500 text-white rounded disabled:bg-gray-400 hover:bg-red-600 transition-colors"
                    >
                        {isDisconnecting ? 'Disconnecting...' : 'Disconnect'}
                    </button>}
                    {!isConnected && <button 
                        onClick={handleConnect}
                        className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400 hover:bg-blue-600 transition-colors"
                    >
                        Connect
                    </button>}
                </div>
            </div>
        </div>
    )
}