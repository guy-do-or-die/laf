import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { useXMTP } from "./XMTPContext";

// Create the context with default values
const ConversationsContext = createContext({
  conversations: [],
  loading: false,
  syncing: false,
  error: null,
  list: async () => [],
  sync: async () => {},
  syncAll: async () => {},
});

export const ConversationsProvider = ({ children }) => {
  const { client } = useXMTP();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);
  const [lastSyncTime, setLastSyncTime] = useState(null);

  // List all conversations
  const list = useCallback(async (options = {}, syncFromNetwork = true) => {
    if (!client) return [];
    
    if (syncFromNetwork) {
      await sync();
    }

    setLoading(true);
    setError(null);

    try {
      console.log('[ConversationsContext] Listing conversations...');
      const dms = await client.conversations.listDms(options);
      setConversations(dms);
      return dms;
    } catch (err) {
      console.error('[ConversationsContext] Error listing conversations:', err);
      setError(err);
      return [];
    } finally {
      setLoading(false);
    }
  }, [client]);

  // Sync conversations (incremental)
  const sync = useCallback(async () => {
    if (!client) return;
    
    setSyncing(true);
    setError(null);

    try {
      console.log('[ConversationsContext] Syncing conversations...');
      await client.conversations.sync();
      setLastSyncTime(Date.now());
    } catch (err) {
      console.error('[ConversationsContext] Error syncing conversations:', err);
      setError(err);
    } finally {
      setSyncing(false);
    }
  }, [client]);

  // Sync all conversations (full sync)
  const syncAll = useCallback(async () => {
    if (!client) return;
    
    setSyncing(true);
    setError(null);

    try {
      console.log('[ConversationsContext] Syncing all conversations...');
      await client.conversations.syncAll();
      setLastSyncTime(Date.now());
    } catch (err) {
      console.error('[ConversationsContext] Error syncing all conversations:', err);
      setError(err);
    } finally {
      setSyncing(false);
    }
  }, [client]);

  useEffect(() => {
    if (!client) return;
    
    const initialSync = async () => {
      try {
        setLoading(true);
        await syncAll();
        await list({}, false); // Don't sync again since we just did
      } catch (err) {
        console.error('[ConversationsContext] Initial sync error:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    
    initialSync();
  }, [client, syncAll, list]);

  // Create the context value
  const value = {
    conversations,
    loading,
    syncing,
    error,
    list,
    sync,
    syncAll,
    lastSyncTime,
  };

  return (
    <ConversationsContext.Provider value={value}>
      {children}
    </ConversationsContext.Provider>
  );
};

export const useConversations = () => {
  const context = useContext(ConversationsContext);
  if (context === undefined) {
    throw new Error("useConversations must be used within a ConversationsProvider");
  }
  return context;
};
