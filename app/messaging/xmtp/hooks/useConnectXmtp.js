import { useCallback, useEffect } from "react";

import { useXMTP } from "@/xmtp/contexts/XMTPContext";
import { createEOASigner, createSCWSigner } from "@/xmtp/helpers/createSigner";

import { useAccount, chain } from "@/wallet";
import { useUnifiedSigning } from "@/hooks/useUnifiedSigning";


export const useConnectXmtp = () => {
  const { initializing, client, initialize, disconnect } = useXMTP();

  const { address, loggedIn, activeWalletType, signingMethod } = useAccount();
  const { signMessage, isReady: signingReady } = useUnifiedSigning();

  // Determine signer type based on wallet type
  const useSCW = activeWalletType === 'smart_wallet';
  const createSigner = useSCW ? createSCWSigner : createEOASigner;

  const connect = useCallback(() => {
    if (client) {
      console.log('🔗 XMTP client already exists, skipping connection');
      return;
    }

    if (!address) {
      console.log('❌ No address available for XMTP connection');
      return;
    }

    if (!signingReady) {
      console.log('❌ Signing not ready for XMTP connection');
      return;
    }

    console.log(`🚀 Connecting XMTP with ${activeWalletType} (${signingMethod})`);
    
    void initialize({
      env: 'dev',
      loggingLevel: 'off',
      signer: createSigner(address, signMessage, chain.id),
    });
  }, [
    client,
    initialize,
    address,
    signMessage,
    signingReady,
    activeWalletType,
    signingMethod,
    createSigner
  ]);

  useEffect(() => {
    if (loggedIn && !client) {
      connect();
    }
  }, [connect, client, loggedIn]);

  return {
    client,
    connect,
    disconnect,
    isConnecting: initializing,
  };
};