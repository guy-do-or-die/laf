import { useState } from "react";

import { useXMTP } from "@/xmtp/contexts/XMTPContext";


export const useConversations = () => {
  const { client } = useXMTP();
  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [conversations, setConversations] = useState([]);

  if (!client) {
    throw new Error("XMTP client not initialized");
  }

  const list = async (options, syncFromNetwork) => {
    if (syncFromNetwork) {
      await sync();
    }

    setLoading(true);

    try {
      const convos = await client.conversations.list(options);
      setConversations(convos);
      return convos;
    } finally {
      setLoading(false);
    }
  };

  const sync = async () => {
    setSyncing(true);

    try {
      await client.conversations.sync();
    } finally {
      setSyncing(false);
    }
  };

  const syncAll = async () => {
    setSyncing(true);

    try {
      await client.conversations.syncAll();
    } finally {
      setSyncing(false);
    }
  };

  const getConversationById = async (conversationId) => {
    setLoading(true);

    try {
      const conversation =
        await client.conversations.getConversationById(conversationId);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const getMessageById = async (messageId) => {
    setLoading(true);

    try {
      const message = await client.conversations.getMessageById(messageId);
      return message;
    } finally {
      setLoading(false);
    }
  };

  const newGroup = async (inboxIds, options) => {
    setLoading(true);

    try {
      const conversation = await client.conversations.newGroup(
        inboxIds,
        options,
      );
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newGroupWithIdentifiers = async (identifiers, options) => {
    setLoading(true);

    try {
      const conversation = await client.conversations.newGroupWithIdentifiers(
        identifiers,
        options,
      );
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newDm = async (inboxId) => {
    setLoading(true);

    try {
      const conversation = await client.conversations.newDm(inboxId);
      return conversation;
    } finally {
      setLoading(false);
    }
  };

  const newDmWithIdentifier = async (identifier) => {
    setLoading(true);
    console.log('Starting newDmWithIdentifier with identifier:', identifier);

    try {
      // Make sure we have a valid identifier object
      if (!identifier || !identifier.identifier || !identifier.identifierKind) {
        throw new Error('Invalid identifier provided to newDmWithIdentifier');
      }

      // First try the direct method
      console.log('Calling client.conversations.newDmWithIdentifier...');
      const conversation = await client.conversations.newDmWithIdentifier(identifier);
      console.log('Successfully created conversation:', conversation);
      return conversation;
    } catch (error) {
      console.error('Error in newDmWithIdentifier:', error);
      
      // If storage error or inbox ID not found, try V3 API pattern
      if (error.message?.includes('storage error') || error.message?.includes('inbox id') || error.message?.includes('not found')) {
        try {
          console.log('Attempting V3 API fallback with canMessage...');
          
          // Use proper V3 API pattern: canMessage first to get inbox ID
          const identifiers = [{
            identifier: identifier.identifier,
            identifierKind: identifier.identifierKind || 'Ethereum'
          }];
          
          console.log('Checking if recipient can receive messages...');
          const canMessageResult = await client.canMessage(identifiers);
          const addressInfo = canMessageResult.get(identifier.identifier);
          
          if (!addressInfo || !addressInfo.canMessage) {
            throw new Error('Recipient cannot receive messages or is not registered with XMTP');
          }
          
          console.log('Recipient can receive messages, creating DM with inbox ID:', addressInfo.inboxId);
          const conversation = await client.conversations.newDm(addressInfo.inboxId);
          console.log('Successfully created conversation using V3 API fallback:', conversation);
          return conversation;
        } catch (fallbackError) {
          console.error('V3 API fallback also failed:', fallbackError);
          
          // If it's still a storage error, suggest database cleanup
          if (fallbackError.message?.includes('storage error') || fallbackError.message?.includes('inbox id')) {
            throw new Error('XMTP database appears to be corrupted. Please try refreshing the page or clearing your browser data.');
          }
          
          throw fallbackError;
        }
      }
      
      // Re-throw the original error if it's not a storage issue
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const stream = async () => {
    const onConversation = (error, conversation) => {
      if (conversation) {
        const shouldAdd =
          conversation.metadata?.conversationType === "dm" ||
          conversation.metadata?.conversationType === "group";
        if (shouldAdd) {
          setConversations((prev) => [conversation, ...prev]);
        }
      }
    };

    const stream = await client.conversations.stream(onConversation);

    return () => {
      void stream.return(undefined);
    };
  };

  return {
    conversations,
    getConversationById,
    getMessageById,
    list,
    loading,
    newDm,
    newDmWithIdentifier,
    newGroup,
    newGroupWithIdentifiers,
    stream,
    sync,
    syncAll,
    syncing,
  };
};
