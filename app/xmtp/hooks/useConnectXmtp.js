import { useCallback, useEffect } from "react";

import { useSignMessage as useWagmiSignMessage } from "wagmi";

import { useXMTP } from "@/xmtp/contexts/XMTPContext";
import { createEOASigner, createSCWSigner } from "@/xmtp/helpers/createSigner";

import { useAccount, chain } from "@/wallet";


export const useConnectXmtp = () => {
  const { initializing, client, initialize, disconnect } = useXMTP();

  const { address, loggedIn, smartWallet, smartWalletClient } = useAccount();

  const { signMessageAsync: wagmiSignMessage } = useWagmiSignMessage();

  const useSCW = !!smartWallet;

  const createSigner = useSCW ? createSCWSigner : createEOASigner;
  const signMessage = (useSCW && smartWalletClient) 
    ? async ({ message }) => {
        try {
          const signature = await smartWalletClient.signMessage({
            message: typeof message === 'string' ? message : new TextEncoder().encode(message)
          });
          return signature;
        } catch (error) {
          console.error('Smart wallet signing failed:', error);
          throw error;
        }
      }
    : wagmiSignMessage;

  const connect = useCallback(() => {
    if (client) {
      return;
    }

    if (!address) {
      return;
    }

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
    useSCW,
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