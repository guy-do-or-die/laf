import { useCallback, useEffect } from "react";

import { useWaku } from "./WakuContext";

import { useAccount } from "@/wallet";

export const useConnectWaku = () => {
  const { initializing, client, initialize, disconnect } = useWaku();

  const { address, loggedIn } = useAccount();

  const connect = useCallback(() => {
    if (client) {
      console.log('🔗 Waku client already exists, skipping connection');
      return;
    }

    if (!address) {
      console.log('❌ No address available for Waku connection');
      return;
    }

    console.log(`🚀 Connecting Waku for address: ${address}`);
    
    void initialize({
      walletAddress: address,
      // Waku-specific configuration
      defaultBootstrap: true,
    });
  }, [
    client,
    initialize,
    address,
  ]);

  // Auto-connect when wallet is connected
  useEffect(() => {
    if (loggedIn && address && !client && !initializing) {
      console.log('🔄 Auto-connecting Waku...');
      connect();
    }
  }, [loggedIn, address, client, initializing, connect]);

  // Disconnect when wallet is disconnected
  useEffect(() => {
    if (!loggedIn && client) {
      console.log('🔌 Wallet disconnected, disconnecting Waku...');
      disconnect();
    }
  }, [loggedIn, client, disconnect]);

  return {
    client,
    isConnecting: initializing,
    connect,
    disconnect,
  };
};
