import { useState, useEffect, useCallback, useRef } from "react";
import { useWaku } from "./WakuContext";

export const useWakuConversation = (recipientAddress, secretHash = null) => {
  const { client, canMessage } = useWaku();
  
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const streamCleanupRef = useRef(null);

  // Initialize conversation when client and recipient are available
  useEffect(() => {
    if (!client || !recipientAddress) {
      setLoading(false);
      return;
    }

    const initializeConversation = async () => {
      try {
        console.log('🔄 Initializing Waku conversation...', { recipientAddress, secretHash, hasClient: !!client });
        setLoading(true);
        setError(null);

        // Check if we can message this recipient
        console.log('🔍 Checking if we can message recipient...');
        const canMsg = await canMessage(recipientAddress);
        console.log('✅ Can message result:', canMsg);
        if (!canMsg) {
          throw new Error('Cannot message this recipient - Waku client not connected');
        }

        // Get or create conversation (with secretHash for item-specific messaging)
        console.log('🔍 HOOK DEBUG: useWakuConversation called with:');
        console.log('  - recipientAddress:', recipientAddress);
        console.log('  - secretHash:', secretHash);
        console.log('  - secretHash type:', typeof secretHash);
        console.log('  - secretHash length:', secretHash?.length);

        const conv = await client.getConversation(recipientAddress, secretHash);
        console.log('✅ Conversation created/retrieved');
        setConversation(conv);

        // Load existing messages from Store
        console.log('📥 Loading existing messages from Waku Store...');
        try {
          const existingMessages = await conv.getMessages();
          console.log(`📝 Store query result: ${existingMessages.length} messages found`);
          
          if (existingMessages.length > 0) {
            console.log('First message sample:', {
              content: existingMessages[0].content,
              senderAddress: existingMessages[0].senderAddress,
              timestamp: existingMessages[0].timestamp,
              id: existingMessages[0].id
            });
          } else {
            console.log('🔍 No historical messages found in Store - this could mean:');
            console.log('  1. This is the first conversation on this topic');
            console.log('  2. Store nodes are unavailable');
            console.log('  3. Messages were sent with different content topic');
            console.log('  4. Store query timeout occurred');
          }
          
          setMessages(existingMessages);
        } catch (msgError) {
          console.error('❌ Failed to load existing messages from Store:', msgError);
          console.log('Continuing with empty message array...');
          setMessages([]);
        }

        // Start streaming new messages (streamMessages is now async)
        console.log('🔄 Setting up message streaming...');
        try {
          const cleanup = await conv.streamMessages((newMessage) => {
            console.log('📨 New message received:', newMessage);
            setMessages(prev => {
              // Avoid duplicates
              const exists = prev.some(msg => msg.id === newMessage.id);
              if (exists) return prev;
              
              return [...prev, newMessage].sort((a, b) => a.timestamp - b.timestamp);
            });
          });
          console.log('✅ Message streaming setup complete');
          streamCleanupRef.current = cleanup;
        } catch (streamError) {
          console.warn('⚠️ Failed to setup message streaming, continuing without real-time updates:', streamError);
        }
        
      } catch (err) {
        console.error('Failed to initialize Waku conversation:', err);
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    initializeConversation();

    // Cleanup on unmount or dependency change
    return () => {
      if (streamCleanupRef.current) {
        streamCleanupRef.current();
        streamCleanupRef.current = null;
      }
    };
  }, [client, recipientAddress, canMessage, retryCount]);

  const sendMessage = useCallback(async (content) => {
    if (!conversation || !content.trim()) {
      return;
    }

    try {
      setSending(true);
      setError(null);

      await conversation.send(content.trim());

      // Message will be added to the list via the stream callback
      // or we can add it optimistically here
      
    } catch (err) {
      console.error('Failed to send message:', err);
      setError(err);
      throw err;
    } finally {
      setSending(false);
    }
  }, [conversation]);

  const refresh = useCallback(async () => {
    if (!conversation) return;

    try {
      setLoading(true);
      const refreshedMessages = await conversation.getMessages();
      setMessages(refreshedMessages);
    } catch (err) {
      console.error('Failed to refresh messages:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [conversation]);

  const retry = useCallback(() => {
    console.log('🔄 Retrying conversation initialization...');
    setError(null);
    setRetryCount(prev => prev + 1);
  }, []);

  return {
    conversation,
    messages,
    loading,
    sending,
    error,
    sendMessage,
    retry,
    refresh
  };
};
