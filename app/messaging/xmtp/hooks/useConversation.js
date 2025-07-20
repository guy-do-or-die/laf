import { useState } from "react";

import { useXMTP } from "@/messaging/xmtp/contexts/XMTPContext";


export const useConversation = (conversation) => {
  const { client } = useXMTP();

  const [loading, setLoading] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const [sending, setSending] = useState(false);
  const [messages, setMessages] = useState([]);

  const getMessages = async (options, syncFromNetwork) => {
    if (!client) {
      return;
    }

    setMessages([]);
    setLoading(true);

    if (syncFromNetwork) {
      await sync();
    }

    try {
      const msgs = (await conversation?.messages(options)) ?? [];
      setMessages(msgs);
      return msgs;
    } finally {
      setLoading(false);
    }
  };

  const sync = async () => {
    if (!client) {
      return;
    }

    setSyncing(true);

    try {
      await conversation?.sync();
    } finally {
      setSyncing(false);
    }
  };

  const send = async (message) => {
    if (!client) {
      return;
    }

    setSending(true);

    try {
      await conversation?.send(message);
    } finally {
      setSending(false);
    }
  };

  const streamMessages = async () => {
    // Define a no-operation function for safe returns
    const noop = () => {};
    
    // Early return if client is not available
    if (!client || !conversation) {
      console.log('Cannot stream messages: client or conversation not available');
      return noop;
    }

    try {
      console.log('Setting up message stream for conversation...');
      
      // Message handler with error handling
      const onMessage = (error, message) => {
        if (error) {
          console.error('Error in message stream:', error);
          return;
        }
        
        if (message) {
          console.log('Received new message:', message.messageId);
          setMessages((prev) => [...prev, message]);
        }
      };
      
      // Set up a promise with timeout protection
      const streamPromise = new Promise((resolve, reject) => {
        // Set a 10-second timeout for stream setup
        const timeoutId = setTimeout(() => {
          console.warn('Message stream setup timed out after 10 seconds');
          reject(new Error('Message stream setup timed out'));
        }, 10000);
        
        try {
          // Log before attempting to stream
          console.log('Setting up conversation stream with conversation:', conversation);
          
          // Attempt to set up the stream
          conversation.stream(onMessage)
            .then(stream => {
              clearTimeout(timeoutId);
              console.log('Stream setup successful, got stream object:', stream);
              resolve(stream);
            })
            .catch(err => {
              clearTimeout(timeoutId);
              console.error('Error setting up message stream:', err);
              reject(err);
            });
        } catch (setupError) {
          clearTimeout(timeoutId);
          console.error('Exception during stream setup:', setupError);
          reject(setupError);
        }
      });
      
      // Wait for stream setup with timeout protection
      const stream = await streamPromise;
      console.log('Message stream established successfully');
      
      // Return a proper cleanup function
      return () => {
        console.log('Cleaning up message stream...');
        if (stream && typeof stream.return === 'function') {
          try {
            stream.return(undefined);
            console.log('Message stream closed successfully');
          } catch (e) {
            console.error('Error closing message stream:', e);
          }
        }
      };
    } catch (e) {
      console.error('Failed to set up message stream:', e);
      return noop;
    }
  };

  return {
    getMessages,
    loading,
    messages,
    send,
    sending,
    streamMessages,
    sync,
    syncing,
  };
};
