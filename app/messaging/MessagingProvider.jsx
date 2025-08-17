import { createContext, useContext, useMemo } from "react";

// Import messaging providers
import WakuProvider, { useWaku } from "./waku/WakuContext";

// Import connection hooks
import { useConnectWaku } from "./waku/useConnectWaku";

// Import conversation hooks
import { useWakuConversation } from "./waku/useWakuConversation";

// Messaging provider types
export const MessagingProviders = {
  WAKU: 'waku',
  DISABLED: null
};

// Configuration - can be changed to switch providers
// Set to DISABLED to turn off all messaging functionality
const CURRENT_PROVIDER = MessagingProviders.WAKU;

// Abstract messaging context
export const MessagingContext = createContext({
  provider: CURRENT_PROVIDER,
  client: null,
  isConnecting: false,
  isConnected: false,
  error: null,
  connect: () => {},
  disconnect: () => {},
  canMessage: () => Promise.resolve(false),
  getConversation: () => Promise.reject(new Error("MessagingProvider not available")),
  autoMessagingEnabled: true,
  setAutoMessagingEnabled: () => {},
});

// Hook to use the current messaging provider
export const useMessaging = () => {
  return useContext(MessagingContext);
};

// Hook to use messaging connection (abstracts XMTP/Waku connection hooks)
export const useMessagingConnection = () => {
  // Return disabled state if messaging is turned off
  if (CURRENT_PROVIDER === MessagingProviders.DISABLED) {
    return {
      client: null,
      isConnecting: false,
      connect: () => {},
      disconnect: () => {}
    };
  }

  // Only call hooks for the active provider (Waku)
  return useConnectWaku();
};

// Hook to use conversation (abstracts XMTP/Waku conversation hooks)
export const useMessagingConversation = (recipientAddress, secretHash = null) => {
  // Return disabled state if messaging is turned off
  if (CURRENT_PROVIDER === MessagingProviders.DISABLED) {
    return {
      conversation: null,
      messages: [],
      loading: false,
      error: null,
      sending: false,
      sendMessage: async () => {},
      refresh: () => {}
    };
  }

  // Use Waku conversation
  return useWakuConversation(recipientAddress, secretHash);
};

// Disabled messaging provider component
function DisabledMessagingProvider({ children }) {
  const value = useMemo(() => ({
    provider: 'disabled',
    client: null,
    isConnecting: false,
    isConnected: false,
    error: null,
    connect: () => {},
    disconnect: () => {},
    canMessage: () => Promise.resolve(false),
    getConversation: () => Promise.reject(new Error("Messaging disabled")),
    autoMessagingEnabled: false,
    setAutoMessagingEnabled: () => {},
  }), []);

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

// Active messaging provider adapter component
function ActiveMessagingProviderAdapter({ children }) {
  // Only call hooks for the active provider (Waku)
  const wakuContext = useWaku();

  const value = useMemo(() => {
    const currentContext = wakuContext;

    return {
      provider: CURRENT_PROVIDER,
      client: currentContext?.client || null,
      isConnecting: currentContext?.initializing || currentContext?.isConnecting || false,
      isConnected: currentContext?.isConnected || (currentContext?.client && !currentContext?.error) || false,
      error: currentContext?.error || null,
      connect: currentContext?.connect || (() => {}),
      disconnect: currentContext?.disconnect || (() => {}),
      canMessage: currentContext?.canMessage || (() => Promise.resolve(false)),
      getConversation: currentContext?.getConversation || (() => Promise.reject(new Error("Not available"))),
      autoMessagingEnabled: currentContext?.autoMessagingEnabled !== undefined ? currentContext.autoMessagingEnabled : true,
      setAutoMessagingEnabled: currentContext?.setAutoMessagingEnabled || (() => {}),
    };
  }, [wakuContext]);

  return (
    <MessagingContext.Provider value={value}>
      {children}
    </MessagingContext.Provider>
  );
}

// Main messaging provider component
export default function MessagingProvider({ children }) {
  // If messaging is disabled, use the disabled provider
  if (CURRENT_PROVIDER === MessagingProviders.DISABLED) {
    return (
      <DisabledMessagingProvider>
        {children}
      </DisabledMessagingProvider>
    );
  }
  
  return (
    <WakuProvider>
      <ActiveMessagingProviderAdapter>
        {children}
      </ActiveMessagingProviderAdapter>
    </WakuProvider>
  );
}
