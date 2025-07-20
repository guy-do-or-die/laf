import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import { X, Send, Loader2, MessageSquare, AlertCircle, ChevronDown } from "lucide-react";

import { Button } from "./ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "./ui/card";
import { Input } from "./ui/input";

import { useAccount } from "@/wallet";

import { useMessaging, useMessagingConversation } from "@/messaging/MessagingProvider.jsx";

export const MessageModal = ({ isOpen, onClose, itemTitle, secretHash, recipientAddress }) => {
  const { address } = useAccount();
  const { client, provider } = useMessaging();
  
  // Get our Waku node's peer ID for proper sender identification
  const ourPeerId = client?.peerId;
  
  // For Waku, use peer ID; for XMTP, use wallet address
  const ourIdentity = provider === 'waku' ? ourPeerId : address;

  // Use the abstracted messaging conversation hook with secretHash for item-specific messaging
  const {
    conversation,
    messages,
    loading,
    error,
    sending,
    sendMessage,
    retry
  } = useMessagingConversation(recipientAddress, secretHash);

  const [inputMessage, setInputMessage] = useState("");
  const [showScrollButton, setShowScrollButton] = useState(false);
  const [lastMessageCount, setLastMessageCount] = useState(0);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);

  // Check if user is at the bottom of the chat
  const isAtBottom = () => {
    if (!messagesContainerRef.current) return false;
    const container = messagesContainerRef.current;
    const threshold = 100; // pixels from bottom to consider "at bottom"
    return container.scrollHeight - container.scrollTop - container.clientHeight <= threshold;
  };
  
  // Scroll to bottom function
  const scrollToBottom = (smooth = true) => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ 
        behavior: smooth ? 'smooth' : 'instant', 
        block: 'end' 
      });
    }
  };
  
  // Handle scroll events to show/hide scroll button
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;
    
    const handleScroll = () => {
      const atBottom = isAtBottom();
      setShowScrollButton(!atBottom && messages.length > 0);
    };
    
    container.addEventListener('scroll', handleScroll);
    // Check initial state
    handleScroll();
    
    return () => container.removeEventListener('scroll', handleScroll);
  }, [messages.length]);
  
  // Auto-scroll to bottom when conversation is first opened
  useEffect(() => {
    if (isOpen && messages.length > 0 && !loading && messagesContainerRef.current) {
      // Use a small delay to ensure DOM is fully rendered
      const timeoutId = setTimeout(() => {
        scrollToBottom(false); // Instant scroll for initial load
      }, 100);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOpen, messages.length, loading]); // Trigger when modal opens and messages are loaded
  
  // Smart auto-scroll: scroll when at bottom (following conversation), don't scroll when scrolled up (reading history)
  useEffect(() => {
    if (messagesContainerRef.current && messages.length > 0) {
      const hasNewMessages = messages.length > lastMessageCount;
      setLastMessageCount(messages.length);
      
      if (hasNewMessages) {
        // Check if user is at bottom before new message renders
        const wasAtBottom = isAtBottom();
        
        // Use requestAnimationFrame to ensure DOM is updated with new message
        requestAnimationFrame(() => {
          if (wasAtBottom) {
            scrollToBottom(true); // Smooth scroll if was at bottom before new message
          }
          // If not at bottom, the scroll button will be shown via handleScroll
        });
      }
    }
  }, [messages.length, lastMessageCount]); // Only run when message count changes

  // Handle escape key to close modal
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      return () => document.removeEventListener('keydown', handleEscape);
    }
  }, [isOpen, onClose]);

  // Reset input when modal closes
  useEffect(() => {
    if (!isOpen) {
      setInputMessage("");
    }
  }, [isOpen]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!inputMessage.trim() || !sendMessage) return;

    try {
      await sendMessage(inputMessage.trim());
      setInputMessage("");
      
      // Always scroll to bottom when user sends a message
      setTimeout(() => {
        scrollToBottom(true);
      }, 100); // Small delay to ensure message is added to DOM
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage(e);
    }
  };

  if (!isOpen) return null;

  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  const formatTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };
  
  const formatFullTimestamp = (timestamp) => {
    return new Date(timestamp).toLocaleString();
  };

  const handleBackdropClick = (e) => {
    // Only close if clicking the backdrop itself, not the modal content
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return createPortal(
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 cursor-pointer"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md h-[500px] cursor-default">
        <Card className="w-full h-full flex flex-col bg-white/95 backdrop-blur-sm shadow-2xl border-0 rounded-xl gap-1 py-1">
        
        {/* Floating scroll to bottom button - positioned just above input */}
        {showScrollButton && (
          <div className="absolute bottom-16 right-5 z-20">
            <button
              onClick={() => scrollToBottom(true)}
              className="bg-gray-400/60 hover:bg-gray-500/70 text-gray-700 hover:text-gray-800 rounded-full p-1.5 shadow-lg transition-all duration-200 hover:scale-105 backdrop-blur-sm"
              title="Scroll to bottom"
            >
              <ChevronDown className="h-3 w-3" />
            </button>
          </div>
        )}
        <CardHeader className="flex-shrink-0 py-1.5 px-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-3 w-3 text-blue-500" />
              <div className="min-w-0">
                <CardTitle className="text-xs font-medium truncate">
                  {itemTitle ? `Chat: ${itemTitle}` : 'Message'}
                </CardTitle>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-5 w-5 p-0 hover:bg-gray-100 rounded-md"
            >
              <X className="h-3 w-3" />
            </Button>
          </div>
        </CardHeader>

        {/* Messages Area */}
        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto overflow-x-hidden px-3 py-2 bg-gray-50 space-y-1 relative">
          {loading && messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-blue-500" />
                <p className="text-sm text-gray-500">Loading conversation...</p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertCircle className="h-6 w-6 mx-auto mb-2 text-red-500" />
                <p className="text-sm text-red-600 mb-2">Failed to load conversation</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={retry}
                  className="text-xs"
                >
                  Try Again
                </Button>
              </div>
            </div>
          ) : messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <MessageSquare className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-500">No messages yet</p>
                <p className="text-xs text-gray-400 mt-1">Start the conversation!</p>
              </div>
            </div>
          ) : (
            <>
              {messages.map((message) => {
                // Proper sender detection based on provider
                const isOwnMessage = message.senderAddress === ourIdentity ||
                                   message.senderAddress === 'self'; // fallback for legacy messages
                
                return (
                  <div
                    key={message.id}
                    className={`flex mb-2 ${isOwnMessage ? 'justify-end' : 'justify-start'}`}
                  >
                    <div className={`flex items-end space-x-1 max-w-[80%] ${
                      isOwnMessage ? 'flex-row-reverse space-x-reverse' : 'flex-row'
                    }`}>
                      <div
                        className={`px-3 py-2 rounded-2xl shadow-sm overflow-hidden ${
                          isOwnMessage
                            ? 'bg-blue-500 text-white rounded-br-md'
                            : 'bg-gray-200 text-gray-900 rounded-bl-md'
                        }`}
                      >
                        <p className="text-sm whitespace-pre-wrap break-words break-all leading-relaxed overflow-wrap-anywhere">
                          {message.content}
                        </p>
                      </div>
                      <span 
                        className={`text-xs opacity-50 cursor-default leading-none ${
                          isOwnMessage ? 'text-gray-600' : 'text-gray-500'
                        }`}
                        style={{ fontSize: '10px' }}
                        title={formatFullTimestamp(message.timestamp)}
                      >
                        {formatTimestamp(message.timestamp)}
                      </span>
                    </div>
                  </div>
                );
              })}
              {/* Invisible element to scroll to */}
              <div ref={messagesEndRef} style={{ height: '1px' }} />
            </>
          )}
        </div>

        {/* Message Input */}
        <CardFooter className="flex-shrink-0 py-1.5 px-2">
          <form onSubmit={handleSendMessage} className="flex w-full space-x-2">
            <Input
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type a message..."
              disabled={sending || !conversation}
              className="flex-1 bg-white/95 backdrop-blur-sm border-0 shadow-sm rounded-lg h-10"
            />
            <Button
              type="submit"
              disabled={!inputMessage.trim() || sending || !conversation}
              className="h-10 px-3 rounded-lg shadow-sm"
            >
              {sending ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
        </Card>
      </div>
    </div>,
    document.body
  );
};

export default MessageModal;
