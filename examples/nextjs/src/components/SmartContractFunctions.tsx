import { useSmartContract } from 'ethers-query';
import abi from '../contracts/EQT/abi.json';
import { EQT_ADDRESS } from '../contracts/EQT/constants';

export const SmartContractFunctions = () => {
    const { data, error, isLoading, write, read } = useSmartContract({
        address: EQT_ADDRESS,
        abi: abi,
        functionName: 'name',
        args: [],
    });

    const handleRead = async () => {
        try {
            await read();
        } catch (err) {
            console.error('Failed to read:', err);
        }
    };

    return (
        <div className="flex flex-col gap-4 p-4">
            <div className="flex gap-4">
                <button 
                    onClick={handleRead}
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-400"
                >
                    {isLoading ? 'Loading...' : 'Read'}
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded">
                    Write   
                </button>
            </div>
            {error && (
                <div className="text-red-500">
                    {error.message}
                </div>
            )}
            {data && (
                <div className="text-green-500">
                    Data: {data.toString()}
                </div>
            )}
        </div>
    );
};