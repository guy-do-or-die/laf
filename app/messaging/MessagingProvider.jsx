import { createContext, useContext, useMemo } from "react";

// Import messaging providers
import WakuProvider, { useWaku } from "./waku/WakuContext";
import XMTPProvider, { useXMTP } from "./xmtp/contexts/XMTPContext";

// Import connection hooks
import { useConnectWaku } from "./waku/useConnectWaku";
import { useConnectXmtp } from "./xmtp/hooks/useConnectXmtp";

// Import conversation hooks
import { useWakuConversation } from "./waku/useWakuConversation";
import { useConversation as useXMTPConversation } from "./xmtp/hooks/useConversation";

// Messaging provider types
export const MessagingProviders = {
  WAKU: 'waku',
  XMTP: 'xmtp',
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

  // Only call hooks for the active provider to avoid "Provider not available" errors
  if (CURRENT_PROVIDER === MessagingProviders.WAKU) {
    return useConnectWaku();
  } else {
    return useConnectXmtp();
  }
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

  // Only call hooks for the active provider to avoid "Provider not available" errors
  if (CURRENT_PROVIDER === MessagingProviders.WAKU) {
    return useWakuConversation(recipientAddress, secretHash);
  } else {
    // XMTP doesn't support secretHash-based topics, use regular conversation
    return useXMTPConversation(recipientAddress);
  }
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
  // Only call hooks for the active provider to avoid "Provider not available" errors
  const wakuContext = CURRENT_PROVIDER === MessagingProviders.WAKU ? useWaku() : null;
  const xmtpContext = CURRENT_PROVIDER === MessagingProviders.XMTP ? useXMTP() : null;

  const value = useMemo(() => {
    const currentContext = CURRENT_PROVIDER === MessagingProviders.WAKU ? wakuContext : xmtpContext;

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
  }, [wakuContext, xmtpContext]);

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
  
  if (CURRENT_PROVIDER === MessagingProviders.WAKU) {
    return (
      <WakuProvider>
        <ActiveMessagingProviderAdapter>
          {children}
        </ActiveMessagingProviderAdapter>
      </WakuProvider>
    );
  } else {
    return (
      <XMTPProvider>
        <ActiveMessagingProviderAdapter>
          {children}
        </ActiveMessagingProviderAdapter>
      </XMTPProvider>
    );
  }
}
