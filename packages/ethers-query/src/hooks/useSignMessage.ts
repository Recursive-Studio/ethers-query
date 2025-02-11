import { useMutation } from '@tanstack/react-query'
import { verifyMessage as ethersVerifyMessage } from 'ethers'
import { useSigner } from './useSigner.js'

/**
 * Arguments for signing a message
 * @category Hooks
 * @beta
 */
export type SignMessageArgs = {
  /** The message to sign (string or byte array) */
  message: string | Uint8Array
}

/**
 * Arguments for verifying a message signature
 * @category Hooks
 * @beta
 */
export type VerifyMessageArgs = {
  /** The original message that was signed */
  message: string | Uint8Array
  /** The signature to verify */
  signature: string
}

/**
 * Result of a signature verification
 * @category Hooks
 * @beta
 */
export type VerificationResult = {
  /** Whether the signature is valid */
  isValid: boolean
  /** The address that was recovered from the signature */
  recoveredAddress: string
}

/**
 * Return type of the useSignMessage hook
 * @category Hooks
 * @beta
 * 
 * @example
 * ```typescript
 * const result: SignMessageResult = useSignMessage()
 * 
 * // Sign a message
 * const signature = await result.signMessage({ 
 *   message: 'Hello World' 
 * })
 * 
 * // Verify a signature
 * const isValid = await result.verifyMessage({
 *   message: 'Hello World',
 *   signature: '0x...'
 * })
 * 
 * if (result.verificationData?.isValid) {
 *   console.log('Signer:', result.verificationData.recoveredAddress)
 * }
 * ```
 */
export type SignMessageResult = {
  /** The signature if message was signed successfully */
  data?: string
  /** Error that occurred during signing */
  error: Error | null
  /** Whether a signing operation is in progress */
  isLoading: boolean
  /** Function to sign a message */
  signMessage: (args: SignMessageArgs) => Promise<string>
  /** Function to verify a message signature */
  verifyMessage: (args: VerifyMessageArgs) => Promise<boolean>
  /** Result of the last verification attempt */
  verificationData?: VerificationResult
  /** Error that occurred during verification */
  verificationError: Error | null
  /** Whether a verification operation is in progress */
  isVerifying: boolean
}

/**
 * Hook for signing and verifying messages using the connected wallet
 * @category Hooks
 * @beta
 * 
 * @returns Object containing signing and verification functions and their states
 * 
 * @example
 * ```tsx
 * import { useSignMessage } from 'ethers-query'
 * 
 * function Component() {
 *   const { 
 *     signMessage, 
 *     verifyMessage,
 *     data: signature,
 *     verificationData,
 *     isLoading,
 *     isVerifying
 *   } = useSignMessage()
 * 
 *   const handleSign = async () => {
 *     const sig = await signMessage({ message: 'Hello World' })
 *     console.log('Signature:', sig)
 *   }
 * 
 *   const handleVerify = async () => {
 *     const isValid = await verifyMessage({
 *       message: 'Hello World',
 *       signature: '0x...'
 *     })
 *     console.log('Is valid:', isValid)
 *     console.log('Signer:', verificationData?.recoveredAddress)
 *   }
 * 
 *   return (
 *     <div>
 *       <button onClick={handleSign} disabled={isLoading}>
 *         {isLoading ? 'Signing...' : 'Sign Message'}
 *       </button>
 *       {signature && <div>Signature: {signature}</div>}
 *     </div>
 *   )
 * }
 * ```
 */
export function useSignMessage(): SignMessageResult {
  const signer = useSigner()

  const {
    data,
    error,
    isPending,
    mutateAsync: signMessageAsync
  } = useMutation({
    mutationKey: ['signMessage'],
    mutationFn: async ({ message }: SignMessageArgs) => {
      if (!signer) throw new Error('Signer not available')
      return signer.signMessage(message)
    }
  })

  const {
    data: verificationData,
    error: verificationError,
    isPending: isVerifying,
    mutateAsync: verifyMessageAsync
  } = useMutation<VerificationResult, Error, VerifyMessageArgs>({
    mutationKey: ['verifyMessage'],
    mutationFn: async ({ message, signature }: VerifyMessageArgs): Promise<VerificationResult> => {
      try {
        const recoveredAddress = await ethersVerifyMessage(message as string, signature)
        return {
          isValid: true,
          recoveredAddress
        }
      } catch (error) {
        return {
          isValid: false,
          recoveredAddress: ''
        }
      }
    }
  })

  const signMessage = async (args: SignMessageArgs): Promise<string> => {
    return signMessageAsync(args)
  }

  const verifyMessage = async (args: VerifyMessageArgs): Promise<boolean> => {
    const result = await verifyMessageAsync(args)
    return result.isValid
  }

  return {
    data,
    error,
    isLoading: isPending,
    signMessage,
    verifyMessage,
    verificationData,
    verificationError,
    isVerifying
  }
} 