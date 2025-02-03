'use client'

import { useAppKit } from '@reown/appkit/react'

export default function ConnectButton() {
  // 4. Use modal hook
  const { open } = useAppKit()

  return (
    <>
      <button onClick={() => open()}>Open Connect Modal</button>
      
    </>
  )
}