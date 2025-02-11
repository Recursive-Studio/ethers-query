import { useMemo } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { useEthersQuery } from "../context.js";

/**
 * Hook for accessing the current ethers Provider instance
 * @category Hooks
 * @beta
 * 
 * @returns The current ethers Provider instance or null if not connected
 * 
 * @example
 * ```tsx
 * import { useProvider } from 'ethers-query'
 * 
 * function Component() {
 *   const provider = useProvider()
 * 
 *   const getBlockNumber = async () => {
 *     if (!provider) return
 *     const blockNumber = await provider.getBlockNumber()
 *     console.log('Current block:', blockNumber)
 *   }
 * 
 *   return (
 *     <button onClick={getBlockNumber}>
 *       Get Block Number
 *     </button>
 *   )
 * }
 * ```
 */
export const useProvider = () => {
  const client = useEthersQuery();

  const getSnapshot = useMemo(() => {
    return () => {
      const state = client.getState();
      console.log('[useProvider] Getting provider from state:', {
        provider: state.data?.provider,
        status: state.status,
        isInitialized: state.isInitialized
      });
      return state.data?.provider ?? null;
    };
  }, [client]);

  const provider = useSyncExternalStore(
    (onChange) => client.subscribe(onChange),
    getSnapshot,
    getSnapshot
  );

  console.log('[useProvider] Returning provider:', provider);
  return provider;
}