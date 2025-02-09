'use client';

import { AccountStatus } from '@/components/AccountStatus';
import ConnectButton from '../components/ConnectButton';
import { SmartContractFunctions } from '../components/SmartContractFunctions';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <AccountStatus />
      <div className="z-10 w-full max-w-5xl items-center justify-center text-center">
        <h1 className="mb-8 text-4xl font-bold">Welcome to Your Web3 App</h1>
        <div className="flex justify-center">
          <ConnectButton />
          <SmartContractFunctions />
        </div>
      </div>
    </main>
  );
}
