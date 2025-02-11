'use client'

import { useAppKit } from '@reown/appkit/react'
import { useAccount, useProvider, useSigner } from 'ethers-query'

const truncateAddress = (address: string) => {
  if (!address) return ''
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export default function ConnectButton() {
  const appKit = useAppKit()
  const provider = useProvider()
  const signer = useSigner()
  const account = useAccount()

  console.log('[ConnectButton] provider', provider)
  console.log('[ConnectButton] signer', signer)

  const handleClick = async (e: React.MouseEvent) => {
    try {
      await appKit.open()
      // Our client will detect the connection through window.ethereum events
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  const buttonClasses = "px-4 py-2 rounded-md font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2"
  const connectedClasses = "bg-green-100 text-green-800 hover:bg-green-200 focus:ring-green-500 border border-green-300"
  const disconnectedClasses = "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"

  if (account && account.isConnected && account.address) {
    return (
      
        <button 
          onClick={handleClick}
          className={`${buttonClasses} ${connectedClasses} flex items-center gap-2`}
        >
          <div className="w-2 h-2 rounded-full bg-green-500"></div>
          {truncateAddress(account.address)}
        </button>
        
    )
  }

  return (
    <button 
      onClick={handleClick}
      className={`${buttonClasses} ${disconnectedClasses}`}
    >
      Connect Wallet
    </button>
  )
}