import { useMemo } from "react";
import { useSyncExternalStore } from "use-sync-external-store/shim";
import { useEthersQuery } from "../context.js";

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