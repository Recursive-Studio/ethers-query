'use client'

import { useAppKit } from '@reown/appkit/react'
import { useEthersQuery } from 'ethers-query'
import { AppKit } from '../context/appkit'

export default function ConnectButton() {
  const appKit = useAppKit()
  const client = useEthersQuery()

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      // Open AppKit modal
      await appKit.open()
      // Our client will detect the connection through window.ethereum events
    } catch (error) {
      console.error('Failed to connect:', error)
    }
  }

  return (
    <AppKit>
      <button onClick={handleClick}>
        Connect Wallet
      </button>
    </AppKit>
  )
}