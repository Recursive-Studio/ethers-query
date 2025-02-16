import { useAppKit } from '@reown/appkit/react'
import { useWallet } from "ethers-query"


export const WalletActions = () => {
    const {disconnect} = useWallet()

    const appKit = useAppKit()

    const handleConnect = async () => {

        // try {
        //     await appKit.open()
        // } catch (error) {
        //     console.error('Failed to connect:', error)
        // }
    }

    return <div>
        <button onClick={disconnect}>Disconnect</button>
        <button onClick={handleConnect}>connect</button>
    </div>
}