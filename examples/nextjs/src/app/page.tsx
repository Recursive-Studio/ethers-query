'use client';

import { AccountStatus } from '@/components/AccountStatus';
import { useSigner } from 'ethers-query';
import ConnectButton from '../components/ConnectButton';
import { SignMessage } from '../components/SignMessage';
import { SmartContractFunctions } from '../components/SmartContractFunctions';
import { WalletActions } from '../components/WalletActions';

export default function Home() {
  const signer = useSigner();
  
  return (
    <main className="min-h-screen p-8 max-w-6xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">ethers-query Demo</h1>
        <p className="text-lg text-gray-400 max-w-2xl mx-auto">
          A powerful React hooks library for seamless Ethereum integration. Connect wallets, interact with smart contracts, and build Web3 applications with ease.
        </p>
      </div>

      <div className="grid gap-8">
        {/* Wallet Connection Section */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Wallet Connection</h2>
              <p className="text-gray-400">
                Use <code className="text-blue-400">useAccount</code> and <code className="text-blue-400">useSigner</code> hooks 
                to manage wallet connections and account state.
              </p>
              <p className="text-gray-400">
                Use <code className="text-blue-400">useBalance</code> hook to get the balance of the connected account.
              </p>
            </div>
            <ConnectButton />
          </div>
          <AccountStatus />
          <WalletActions />
        </section>

        {signer && (
          <>
            {/* Smart Contract Interaction Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mb-2">Smart Contract Interaction</h2>
              <p className="text-gray-400 mb-4">
                Use <code className="text-blue-400">useSmartContract</code> hook for reading from and writing to smart contracts. 
                Includes real-time data updates and transaction handling.
              </p>
              <SmartContractFunctions />
            </section>

            {/* Message Signing Section */}
            <section className="space-y-4">
              <h2 className="text-2xl font-semibold mb-2">Message Signing</h2>
              <p className="text-gray-400 mb-4">
                Use <code className="text-blue-400">useSignMessage</code> hook for signing and verifying messages. 
                Useful for authentication and proving wallet ownership.
              </p>
              <SignMessage />
            </section>
          </>
        )}

        {/* Documentation Link */}
        <section className="text-center pt-8">
          <a 
            href="https://github.com/Recursive-Studio/ethers-query" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-500 transition-colors"
          >
            <span>View Documentation on GitHub</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
              <polyline points="15 3 21 3 21 9"></polyline>
              <line x1="10" y1="14" x2="21" y2="3"></line>
            </svg>
          </a>
        </section>
      </div>
    </main>
  );
}
