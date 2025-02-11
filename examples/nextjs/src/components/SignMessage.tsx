import { useSignMessage } from 'ethers-query';
import { useState } from 'react';

export const SignMessage = () => {
    const [message, setMessage] = useState<string>('');
    const [verifyMessage, setVerifyMessage] = useState<string>('');
    const [verifySignature, setVerifySignature] = useState<string>('');
    const { 
        data: signature, 
        error, 
        isLoading, 
        signMessage,
        verifyMessage: verify,
        verificationData,
        verificationError,
        isVerifying
    } = useSignMessage();

    const handleSignMessage = async () => {
        if (!message) return;
        try {
            await signMessage({ message });
        } catch (err) {
            console.error('Failed to sign message:', err);
        }
    };

    const handleVerifyMessage = async () => {
        if (!verifyMessage || !verifySignature) return;
        try {
            await verify({
                message: verifyMessage,
                signature: verifySignature
            });
        } catch (err) {
            console.error('Failed to verify message:', err);
        }
    };

    return (
        <div className="p-6 rounded-lg border border-gray-200 shadow-sm space-y-4">
            {/* Signing Section */}
            <div className="space-y-4">
                <h2 className="text-xl font-semibold text-white-800">Sign Message</h2>
                
                <div className="space-y-2">
                    <label htmlFor="message" className="block text-sm font-medium text-white-700">
                        Message to Sign
                    </label>
                    <textarea
                        id="message"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Enter a message to sign..."
                        rows={3}
                    />
                </div>

                <button
                    onClick={handleSignMessage}
                    disabled={isLoading || !message}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isLoading ? 'Signing...' : 'Sign Message'}
                </button>

                {error && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{error.message}</p>
                    </div>
                )}

                {signature && (
                    <div className="p-3 rounded-md bg-green-50 border border-green-200">
                        <p className="text-sm font-medium text-green-800">Message signed successfully!</p>
                        <p className="mt-1 text-xs font-mono break-all text-green-600">{signature}</p>
                    </div>
                )}
            </div>

            {/* Verification Section */}
            <div className="mt-8 pt-8 border-t border-gray-200 space-y-4">
                <h2 className="text-xl font-semibold text-white-800">Verify Signature</h2>
                
                <div className="space-y-2">
                    <label htmlFor="verifyMessage" className="block text-sm font-medium text-white-700">
                        Message to Verify
                    </label>
                    <textarea
                        id="verifyMessage"
                        value={verifyMessage}
                        onChange={(e) => setVerifyMessage(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Enter the original message..."
                        rows={3}
                    />
                </div>

                <div className="space-y-2">
                    <label htmlFor="signature" className="block text-sm font-medium text-white-700">
                        Signature
                    </label>
                    <textarea
                        id="signature"
                        value={verifySignature}
                        onChange={(e) => setVerifySignature(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 text-black"
                        placeholder="Enter the signature to verify..."
                        rows={3}
                    />
                </div>

                <button
                    onClick={handleVerifyMessage}
                    disabled={isVerifying || !verifyMessage || !verifySignature}
                    className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
                >
                    {isVerifying ? 'Verifying...' : 'Verify Signature'}
                </button>

                {verificationError && (
                    <div className="p-3 rounded-md bg-red-50 border border-red-200">
                        <p className="text-sm text-red-600">{verificationError.message}</p>
                    </div>
                )}

                {verificationData && (
                    <div className={`p-3 rounded-md ${verificationData.isValid ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'} border`}>
                        <p className={`text-sm font-medium ${verificationData.isValid ? 'text-green-800' : 'text-red-800'}`}>
                            {verificationData.isValid ? 'Signature is valid!' : 'Signature is invalid!'}
                        </p>
                        {verificationData.isValid && (
                            <p className="mt-1 text-xs font-mono break-all text-green-600">
                                Recovered Address: {verificationData.recoveredAddress}
                            </p>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}; 