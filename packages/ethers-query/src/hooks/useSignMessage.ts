import { useMutation } from '@tanstack/react-query'
import { verifyMessage as ethersVerifyMessage } from 'ethers'
import { useSigner } from './useSigner.js'

export type SignMessageArgs = {
  message: string | Uint8Array
}

export type VerifyMessageArgs = {
  message: string | Uint8Array
  signature: string
}

export type VerificationResult = {
  isValid: boolean
  recoveredAddress: string
}

export type SignMessageResult = {
  data?: string
  error: Error | null
  isLoading: boolean
  signMessage: (args: SignMessageArgs) => Promise<string>
  verifyMessage: (args: VerifyMessageArgs) => Promise<boolean>
  verificationData?: VerificationResult
  verificationError: Error | null
  isVerifying: boolean
}

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