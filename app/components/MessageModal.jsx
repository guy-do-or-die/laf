import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";

import { X, Send, Loader2, MessageSquare, AlertCircle } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";

import { useAccount } from "@/wallet";

import { useXMTP } from "@/xmtp/contexts/XMTPContext";
import { useConversation } from "@/xmtp/hooks/useConversation";
import { useConversations } from "@/xmtp/contexts/ConversationsContext";
import { useConversations as useConversationsHook } from "@/xmtp/hooks/useConversations";


export const MessageModal = ({ isOpen, onClose, recipientAddress, itemTitle }) => {
  const { address } = useAccount();
  const { client } = useXMTP();

  const [conversation, setConversation] = useState(null);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);
  const [hasAttempted, setHasAttempted] = useState(false);
  
  // Separate state variables for different loading phases
  const [conversationLoading, setConversationLoading] = useState(true);
  const [initializing, setInitializing] = useState(true); // Track initial setup
  const [messageSetupComplete, setMessageSetupComplete] = useState(false); // Track if message setup is complete

  // Use ConversationsContext for state management and finding existing conversations
  const { syncAll, list, loading: conversationsLoading } = useConversations();
  
  // Use the hook for creating new conversations
  const { newDmWithIdentifier } = useConversationsHook();

  // This effect handles syncing conversations whenever modal is opened
  useEffect(() => {
    // Only run when modal is open and client is available
    if (!isOpen || !client) {
      return;
    }

    const syncConversations = async () => {
      try {
        console.log('[MessageModal] Syncing conversations from network (modal opened)...');
        await syncAll();
        
        console.log('[MessageModal] Listing all conversations...');
        await list({}, false); // false because we just synced
      } catch (error) {
        console.error('[MessageModal] Error syncing conversations:', error);
      }
    };
    
    syncConversations();
  }, [isOpen, client, syncAll, list]);
  
  // Reset state when modal closes to allow fresh sync on next open
  useEffect(() => {
    if (!isOpen) {
      console.log('[MessageModal] Modal closed, resetting state for fresh sync on next open');
      setConversation(null);
      setError(null);
      setHasAttempted(false);
      setConversationLoading(true);
      setInitializing(true);
      setMessageSetupComplete(false);
      setRetryCount(0);
    }
  }, [isOpen]);
  
  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => {
        document.removeEventListener('keydown', handleEscape);
      };
    }
  }, [isOpen, onClose]);
  
  // This effect handles conversation creation once
  useEffect(() => {
    // Debug: Log all condition values
    console.log('[MessageModal] Conversation setup useEffect triggered with conditions:', {
      isOpen,
      hasClient: !!client,
      hasRecipientAddress: !!recipientAddress,
      hasAttempted,
      hasConversation: !!conversation,
      conversationsLoading
    });
    
    // Only run this effect when modal is open, client and recipientAddress are available
    // and we haven't attempted conversation creation yet
    if (!isOpen || !client || !recipientAddress || hasAttempted || conversation) {
      console.log('[MessageModal] Conversation setup skipped due to conditions:', {
        isOpen,
        hasClient: !!client,
        hasRecipientAddress: !!recipientAddress,
        hasAttempted,
        hasConversation: !!conversation
      });
      return;
    }

    setConversationLoading(true);
    setInitializing(true);
    
    // Use a timeout to prevent hanging if something goes wrong
    const timeoutId = setTimeout(() => {
      if (!hasAttempted && !conversation) {
        console.warn('[MessageModal] Conversation setup timed out after 15 seconds');
        setError(new Error('Conversation setup timed out. Please try again.'));
        setConversationLoading(false);
        setInitializing(false);
        setHasAttempted(true);
      }
    }, 15000);
    
    // Debug client capabilities
    console.log('XMTP client capabilities:', {
      hasNewDmWithIdentifier: typeof client.conversations?.newDmWithIdentifier === 'function',
      hasNewDm: typeof client.conversations?.newDm === 'function',
      hasNewConversation: typeof client.conversations?.newConversation === 'function',
      hasCanMessage: typeof client.canMessage === 'function',
      clientVersion: client.version || 'unknown'
    });
    
    // Debug client capabilities
    console.log('XMTP client capabilities:', {
      hasNewDmWithIdentifier: typeof client.conversations?.newDmWithIdentifier === 'function',
      hasNewDm: typeof client.conversations?.newDm === 'function',
      hasNewConversation: typeof client.conversations?.newConversation === 'function',
      hasCanMessage: typeof client.canMessage === 'function',
      clientVersion: client.version || 'unknown'
    });

    const setupConversation = async () => {
      try {
        console.log(`[MessageModal] Setting up conversation with ${recipientAddress}`);
        
        setConversationLoading(true);
        setInitializing(true);
        setError(null);
        
        // Add timeout to prevent hanging
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Conversation setup timed out. Please try again.')), 15000);
        });
        
        console.log('[MessageModal] Calling newDmWithIdentifier...');
        
        // Use newDmWithIdentifier - it's a singleton that handles existing/new conversations
        const conversationPromise = newDmWithIdentifier({
          identifier: recipientAddress,
          identifierKind: 'Ethereum'
        });
        
        // Race between conversation creation and timeout
        const conversation = await Promise.race([conversationPromise, timeoutPromise]);
        
        console.log('[MessageModal] Conversation ready:', !!conversation);
        setConversation(conversation);
        setConversationLoading(false);
        setInitializing(false);
        setHasAttempted(true);
      } catch (error) {
        console.error('[MessageModal] Failed to set up conversation:', error);
        setError(error);
        setConversationLoading(false);
        setInitializing(false);
        setHasAttempted(true);
      }
    };

    setupConversation();

    // Cleanup function
    return () => {
      clearTimeout(timeoutId);
    };
  }, [isOpen, client, recipientAddress, hasAttempted, conversation, newDmWithIdentifier]);

  // Use the conversation hook to get message-related functions and state
  const { 
    send, 
    getMessages, 
    loading: messagesLoading, 
    messages, 
    streamMessages, 
    error: conversationError 
  } = useConversation(conversation);
  
  // Update state when conversation changes
  useEffect(() => {
    if (conversation) {
      console.log('[MessageModal] Conversation object changed:', conversation);
      setConversationLoading(false);
      setHasAttempted(true);
      setInitializing(false);
    }
  }, [conversation]);
  
  // Combined loading state for UI with detailed logging
  const loading = conversationLoading || messagesLoading;
  
  useEffect(() => {
    console.log('[MessageModal] Loading state changed:', { 
      conversationLoading, 
      messagesLoading, 
      combined: loading,
      initializing,
      hasConversation: !!conversation,
      messageSetupComplete,
      messageSetupRef: messageSetupRef.current
    });
  }, [conversationLoading, messagesLoading, loading, initializing, conversation, messageSetupComplete]);

  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  
  const messagesEndRef = useRef(null);

  // References to track state and prevent duplicate operations
  const stopStreamRef = useRef(() => {});
  const streamActiveRef = useRef(false);
  const messageSetupRef = useRef(false); // Track if message setup has been done

  // Start streaming messages
  const startStream = useCallback(async () => {
    // Don't start a new stream if one is already active
    if (streamActiveRef.current) {
      console.log('[MessageModal] Stream already active, skipping startStream');
      return;
    }
    
    try {
      console.log('[MessageModal] Starting message stream...');
      streamActiveRef.current = true;
      stopStreamRef.current = await streamMessages() || (() => {});
      console.log('[MessageModal] Message stream started successfully');
    } catch (streamError) {
      console.error('[MessageModal] Failed to start message stream:', streamError);
      streamActiveRef.current = false;
      setError(streamError);
    }
  }, [streamMessages]);

  // Stop streaming messages
  const stopStream = useCallback(() => {
    if (!streamActiveRef.current) {
      console.log('[MessageModal] No active stream to stop');
      return;
    }
    
    console.log('[MessageModal] Stopping message stream...');
    stopStreamRef.current();
    stopStreamRef.current = () => {};
    streamActiveRef.current = false;
  }, []);

  // Keep track of the previous conversation ID to detect changes
  const prevConversationIdRef = useRef(null);
  
  useEffect(() => {
    // Create a variable to track if the component is mounted
    let isMounted = true;
    
    // Reset message setup if conversation changes
    if (conversation && prevConversationIdRef.current !== conversation.id) {
      console.log('[MessageModal] Conversation changed, resetting message setup');
      messageSetupRef.current = false;
      prevConversationIdRef.current = conversation.id;
    }
    
    // Only setup messaging if we have a conversation, initialization is complete,
    // and we haven't already set up messaging
    if (conversation && !initializing && !messageSetupRef.current) {
      console.log('[MessageModal] Setting up messaging with conversation:', { 
        conversationId: conversation.id || 'unknown',
        messagesLoading,
        messageSetupComplete,
        messageSetupRef: messageSetupRef.current
      });
      
      // Mark that we're setting up messages to prevent duplicate setups
      messageSetupRef.current = true;
      
      // Define an async function inside useEffect
      const setupMessaging = async () => {
        try {
          // Stop any existing stream first
          stopStream();
          
          // Get initial messages
          console.log('[MessageModal] Loading initial messages...');
          await getMessages();
          
          if (isMounted) {
            // Start streaming messages
            console.log('[MessageModal] Initial messages loaded, starting stream...');
            await startStream();
            
            // Mark setup as complete
            if (isMounted) {
              setMessageSetupComplete(true);
              console.log('[MessageModal] Message setup completed successfully');
            }
          }
        } catch (e) {
          console.error("[MessageModal] Error fetching or streaming messages:", e);
          if (isMounted) {
            setError(e);
            // Reset setup ref on error so we can try again
            messageSetupRef.current = false;
          }
        }
      };
      
      // Execute the async function
      setupMessaging();
    }
    
    // Cleanup function
    return () => {
      isMounted = false;
      stopStream();
      console.log('[MessageModal] Cleaning up message streaming effect');
    };
  }, [conversation, initializing, getMessages, startStream, stopStream]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async () => {
    if (!newMessage.trim() || sending) return;

    setSending(true);
    try {
      console.log('[MessageModal] Sending message:', newMessage.trim());
      const messageContent = newMessage.trim();
      
      // Create a temporary message to show immediately in the UI
      const timestamp = new Date();
      const newMsg = {
        content: messageContent,
        senderAddress: address,
        timestamp: timestamp,
        isSending: true // Mark as sending
      };
      
      // Add the temporary message to the UI (no need to update state, just for display)
      const tempMessages = [...messages, newMsg];
      console.log('[MessageModal] Added temporary message to UI, count:', tempMessages.length);
      
      // Send the message to XMTP network
      await send(messageContent);
      console.log('[MessageModal] Message sent successfully to XMTP network');
      
      // Clear the input field
      setNewMessage("");
      
      // After successful send, force a refresh of messages if stream isn't active
      if (!streamActiveRef.current) {
        console.log('[MessageModal] Stream not active, refreshing messages');
        await getMessages();
      } else {
        console.log('[MessageModal] Message sent, stream should handle the update');
      }
    } catch (e) {
      console.error("[MessageModal] Failed to send message:", e);
      setError(e); // Using the local error state
    } finally {
      setSending(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const formatAddress = (addr) => {
    if (!addr || typeof addr !== 'string') return 'Unknown';
    if (addr.length < 10) return addr; // Return as-is if too short to truncate
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTime = (timestamp) => {
    if (!timestamp) return '';
    
    try {
      // Handle both Date objects and numeric timestamps
      const date = timestamp instanceof Date ? timestamp : new Date(timestamp);
      
      // Check if date is valid
      if (isNaN(date.getTime())) return '';
      
      return date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (e) {
      console.error('Error formatting timestamp:', e);
      return '';
    }
  };

  // Handle click outside to close modal
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const modalContent = (
    <div 
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
      onClick={handleBackdropClick}
    >
      <Card 
        className="w-full max-w-md h-[600px] flex flex-col bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="space-y-1">
            <CardTitle className="text-lg">Message about {itemTitle}</CardTitle>
            <p className="text-sm text-muted-foreground">
              To: {formatAddress(recipientAddress)}
            </p>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {loading ? (
            <div className="flex flex-col items-center justify-center h-full space-y-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <p className="text-sm text-gray-600">Starting conversation...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto mb-3" />
              <p className="font-medium text-gray-900 mb-2">Unable to start conversation</p>
              <p className="text-sm text-gray-600 max-w-sm mx-auto">
                {error.message?.includes('not enabled') 
                  ? 'This user hasn\'t enabled XMTP messaging yet. They need to connect first.' 
                  : error.message || 'Something went wrong. Please try again.'}
              </p>
            </div>
          ) : (
            <>
              {messages.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-3" />
                  <p className="font-medium text-gray-600 mb-1">No messages yet</p>
                  <p className="text-sm text-gray-500">Start the conversation about {itemTitle}!</p>
                </div>
              ) : (
                messages.map((message, index) => {
                  // Check if this is a system message (GroupUpdated content type)
                  const isSystemMessage = typeof message?.content === 'object' && 
                    message?.content?.initiatedByInboxId && 
                    message?.content?.addedInboxes;
                  
                  // Handle system messages differently
                  if (isSystemMessage) {
                    const content = message.content;
                    const initiatorId = content.initiatedByInboxId;
                    // Format initiator address if it's an Ethereum address
                    const initiatorAddress = initiatorId?.startsWith('0x') ? 
                      formatAddress(initiatorId) : 
                      initiatorId?.slice(0, 6) + '...' + initiatorId?.slice(-4);
                    
                    return (
                      <div key={index} className="flex justify-center my-3">
                        <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-full text-xs">
                          {message.sentAtNs ? new Date(Number(message.sentAtNs) / 1000000).toLocaleString() : null}
                        </div>
                      </div>
                    );
                  }
                  
                  // Regular message handling
                  // Identify the sender using XMTP V3 message structure
                  let messageSender = message?.senderAddress || message?.senderInboxId || message?.sender;
                  let isOwn = false;
                  
                  // Check multiple ways to determine if message is from current user
                  if (message?.senderAddress) {
                    isOwn = message.senderAddress.toLowerCase() === address?.toLowerCase();
                  } else if (message?.senderInboxId && client?.inboxId) {
                    isOwn = message.senderInboxId === client.inboxId;
                  } else if (message?.sender) {
                    isOwn = message.sender.toLowerCase() === address?.toLowerCase();
                  }
                  return (
                    <div
                      key={index}
                      className={`flex mb-3 ${isOwn ? "justify-end" : "justify-start"}`}
                    >
                      <div className={`flex flex-col ${isOwn ? "items-end" : "items-start"} max-w-[75%]`}>
                        {/* Sender label for peer messages */}
                        {!isOwn && (
                          <p className="text-xs text-gray-500 mb-1 px-1">
                            {messageSender ? formatAddress(messageSender) : 'Unknown Sender'}
                          </p>
                        )}
                        
                        <div
                          className={`px-4 py-3 rounded-2xl shadow-sm ${
                            isOwn
                              ? "bg-blue-500 text-white rounded-br-md"
                              : "bg-gray-100 border border-gray-200 text-gray-900 rounded-bl-md"
                          }`}
                        >
                          <p className="text-sm leading-relaxed">
                            {typeof message?.content === 'string' 
                              ? message.content 
                              : message?.content?.text || JSON.stringify(message?.content) || 'Message content unavailable'}
                          </p>
                          <p className={`text-xs mt-2 ${
                            isOwn ? "text-blue-100" : "text-gray-500"
                          }`}>
                            {formatTime(message.timestamp)}
                            {isOwn && <span className="ml-1">✓</span>}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Footer */}
        <CardFooter className="p-4">
          {error ? (
            <div className="text-center text-sm text-muted-foreground py-2 w-full">
              Cannot send messages at this time
            </div>
          ) : (
            <div className="w-full space-y-3">
              <div className="flex gap-3 items-end">
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder={`Message about ${itemTitle}...`}
                  disabled={sending || !conversation}
                  className="flex-1"
                  maxLength={500}
                />
                <Button
                  onClick={handleSend}
                  disabled={!newMessage.trim() || sending || !conversation}
                >
                  {sending ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Send className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {!conversation && (
                <div className="flex items-center justify-center text-xs text-muted-foreground">
                  <Loader2 className="h-3 w-3 animate-spin mr-2" />
                  Establishing secure connection...
                </div>
              )}
              {newMessage.length > 450 && (
                <p className="text-xs text-muted-foreground text-right">
                  {500 - newMessage.length} characters remaining
                </p>
              )}
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );

  return createPortal(modalContent, document.body);
};

export default MessageModal;
