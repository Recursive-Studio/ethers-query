import { useSmartContract } from 'ethers-query';
import abi from '../contracts/EQT/abi.json';
import { EQT_ADDRESS } from '../contracts/EQT/constants';

export const SmartContractFunctions = () => {
    // Read contract name
    const { data: name, error: nameError, isLoading: nameLoading, read: readName } = useSmartContract<
        typeof abi,
        'name',
        [],
        string
    >({
        address: EQT_ADDRESS,
        abi: abi,
        functionName: 'name',
        args: [],
    });

    // Approve spending
    const { error: approveError, isLoading: approveLoading, write: approve } = useSmartContract<
        typeof abi,
        'approve',
        [string, string],
        boolean
    >({
        address: EQT_ADDRESS,
        abi: abi,
        functionName: 'approve',
        args: [EQT_ADDRESS, (BigInt(1000000) * BigInt(10 ** 18)).toString()] // 1M tokens with 18 decimals
    });

    const handleRead = async () => {
        try {
            await readName();
        } catch (err) {
            console.error('Failed to read:', err);
        }
    };

    const handleWrite = async () => {
        try {
            await approve();
        } catch (err) {
            console.error('Failed to approve:', err);
        }
    };

    const isLoading = nameLoading || approveLoading;
    const error = nameError || approveError;

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-4">
                <button 
                    onClick={handleRead}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    {nameLoading ? 'Loading...' : 'Read Name'}
                </button>
                <button 
                    onClick={handleWrite}
                    disabled={isLoading}
                    className="px-4 py-2 bg-green-500 text-white rounded disabled:bg-gray-400"
                >
                    {approveLoading ? 'Approving...' : 'Approve Tokens'}
                </button>
            </div>
            {error && (
                <div className="text-red-500">
                    {error.message}
                </div>
            )}
            {name && (
                <div className="text-green-500">
                    Token Name: {name}
                </div>
            )}
        </div>
    );
};