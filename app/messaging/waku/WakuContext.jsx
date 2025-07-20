import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useState,
} from "react";

import { WakuClient } from './WakuClient.js';
import { MessagingStatus } from '../types.js';

export const useWaku = () => {
  return useContext(WakuContext);
};

export const WakuContext = createContext({
  setClient: () => {},
  initialize: () => Promise.reject(new Error("WakuProvider not available")),
  initializing: false,
  error: null,
  disconnect: () => {},
  canMessage: () => Promise.resolve(false),
  getConversation: () => Promise.reject(new Error("WakuProvider not available")),
  getConversations: () => Promise.resolve([]),
});

export default function WakuProvider({ children, client: initialClient }) {
  const [client, setClient] = useState(initialClient);
  const [initializing, setInitializing] = useState(false);
  const [error, setError] = useState(null);
  const initializingRef = useRef(false);

  const initialize = useCallback(
    async ({
      walletAddress,
      ...config
    }) => {
      // only initialize a client if one doesn't already exist
      if (!client) {
        // if the client is already initializing, don't do anything
        if (initializingRef.current) {
          console.log('Waku client already initializing, skipping');
          return undefined;
        }

        // flag the client as initializing
        initializingRef.current = true;

        // reset error state
        setError(null);
        // reset initializing state
        setInitializing(true);

        let wakuClient;

        try {
          // Create a new Waku client
          console.log(`Creating new Waku client for wallet ${walletAddress ? walletAddress.slice(0, 8) : 'unknown'}...`);

          wakuClient = new WakuClient(null, walletAddress); // Pass wallet address as sender
          await wakuClient.initialize(config);
          
          setClient(wakuClient);
        } catch (e) {
          setClient(undefined);
          setError(e);
          throw e;
        } finally {
          initializingRef.current = false;
          setInitializing(false);
        }

        return wakuClient;
      }
      return client;
    },
    [client],
  );

  const disconnect = useCallback(async () => {
    if (client) {
      await client.disconnect();
      setClient(undefined);
    }
  }, [client, setClient]);

  const canMessage = useCallback(async (peerAddress) => {
    if (!client) {
      return false;
    }
    return await client.canMessage(peerAddress);
  }, [client]);

  const getConversation = useCallback(async (peerAddress, secretHash = null) => {
    if (!client) {
      throw new Error('Waku client not available');
    }
    return await client.getConversation(peerAddress, secretHash);
  }, [client]);

  const getConversations = useCallback(async () => {
    if (!client) {
      return [];
    }
    return await client.getConversations();
  }, [client]);

  const value = useMemo(
    () => ({
      client,
      setClient,
      initialize,
      initializing,
      error,
      disconnect,
      canMessage,
      getConversation,
      getConversations,
      // Status properties for compatibility with UI components
      isConnecting: initializing,
      isConnected: client?.status === MessagingStatus.CONNECTED,
      autoMessagingEnabled: true, // Waku doesn't have installation limits like XMTP
      setAutoMessagingEnabled: () => {}, // No-op for Waku
    }),
    [client, initialize, initializing, error, disconnect, canMessage, getConversation, getConversations],
  );

  return <WakuContext.Provider value={value}>{children}</WakuContext.Provider>;
}
