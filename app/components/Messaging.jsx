import { useState, useEffect } from 'react';
import { useXMTP } from '../lib/xmtp';
import { useAccount } from '../wallet';
import { notify } from './Notification';

import { Input } from './ui/input';
import { Button } from './ui/button';
import { Label } from './ui/label';

export function MessageButton({ recipientAddress, buttonText = "Message" }) {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <>
      <Button 
        variant="outline" 
        size="sm"
        onClick={() => setIsOpen(true)}
      >
        {buttonText}
      </Button>
      
      {isOpen && (
        <MessageModal 
          recipientAddress={recipientAddress} 
          onClose={() => setIsOpen(false)} 
        />
      )}
    </>
  );
}

function MessageModal({ recipientAddress, onClose }) {
  const { client, initXmtp, isLoading } = useXMTP();
  const { address, logged } = useAccount();
  
  const [message, setMessage] = useState('');
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loadingMessages, setLoadingMessages] = useState(false);

  // No need to initialize XMTP client here, it's handled by the provider

  // Load or create conversation when client is ready
  useEffect(() => {
    const loadConversation = async () => {
      if (!client || !recipientAddress) return;
      
      try {
        setLoadingMessages(true);
        
        // Check if the recipient can be messaged
        const canMessage = await client.canMessage(recipientAddress);
        if (!canMessage) {
          notify('This address has not yet used XMTP', 'error');
          return;
        }
        
        // Get or create conversation with recipient
        const conversation = await client.conversations.newConversation(recipientAddress);
        setConversation(conversation);
        
        // Load existing messages
        const messages = await conversation.messages();
        setMessages(messages);
        
        // Listen for new messages
        const unsubscribe = await conversation.streamMessages((message) => {
          setMessages((prevMessages) => [...prevMessages, message]);
        });
        
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error loading conversation', error);
        notify('Error loading conversation', 'error');
      } finally {
        setLoadingMessages(false);
      }
    };
    
    loadConversation();
  }, [client, recipientAddress]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!client || !conversation || !message.trim()) return;
    
    try {
      await conversation.send(message);
      setMessage('');
    } catch (error) {
      console.error('Error sending message', error);
      notify('Error sending message', 'error');
    }
  };

  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">
            Message {formatAddress(recipientAddress)}
          </h2>
          <Button variant="ghost" size="sm" onClick={onClose}>✕</Button>
        </div>
        
        {!client && (
          <div className="text-center py-8">
            {isLoading ? (
              <p>Connecting to XMTP...</p>
            ) : (
              <Button onClick={() => initXmtp(walletClient)}>
                Connect to XMTP
              </Button>
            )}
          </div>
        )}
        
        {client && (
          <>
            <div className="h-64 overflow-y-auto border rounded-md p-2 mb-4">
              {loadingMessages ? (
                <p className="text-center py-4">Loading messages...</p>
              ) : messages.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No messages yet</p>
              ) : (
                <div className="space-y-2">
                  {messages.map((msg, index) => (
                    <div 
                      key={index}
                      className={`p-2 rounded-lg max-w-[80%] ${
                        msg.senderAddress === address 
                          ? 'bg-blue-100 ml-auto' 
                          : 'bg-gray-100'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(msg.sent).toLocaleTimeString()}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            <form onSubmit={sendMessage} className="flex gap-2">
              <Input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1"
              />
              <Button type="submit" disabled={!message.trim()}>
                Send
              </Button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}

export function MessagingInbox() {
  const { client, isLoading: clientLoading } = useXMTP();
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedConversation, setSelectedConversation] = useState(null);
  
  useEffect(() => {
    const loadConversations = async () => {
      if (!client) return;
      
      try {
        setLoading(true);
        const convos = await client.conversations.list();
        setConversations(convos);
        
        // Stream new conversations
        const unsubscribe = await client.conversations.stream((conversation) => {
          setConversations((prev) => {
            // Check if conversation already exists to avoid duplicates
            if (prev.some(c => c.peerAddress === conversation.peerAddress)) {
              return prev;
            }
            return [...prev, conversation];
          });
        });
        
        return () => {
          unsubscribe();
        };
      } catch (error) {
        console.error('Error loading conversations', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadConversations();
  }, [client]);
  
  // Format address for display
  const formatAddress = (addr) => {
    if (!addr) return '';
    return `${addr.substring(0, 6)}...${addr.substring(addr.length - 4)}`;
  };
  
  return (
    <div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Messages</h2>
      
      {clientLoading ? (
        <div className="text-center py-8">
          <p>Connecting to XMTP...</p>
          <p className="text-sm text-gray-500 mt-2">Please wait while we establish your secure messaging connection</p>
        </div>
      ) : !client ? (
        <p className="text-center py-4">Connect to XMTP to view messages</p>
      ) : loading ? (
        <p className="text-center py-4">Loading conversations...</p>
      ) : conversations.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No conversations yet</p>
          <p className="text-sm text-gray-400 mt-2">Start messaging by clicking on "Message Owner" or "Message Finder" on item cards</p>
        </div>
      ) : (
        <div className="space-y-2">
          {conversations.map((convo) => (
            <div 
              key={convo.peerAddress}
              className="p-3 border rounded-md hover:bg-gray-50 cursor-pointer"
              onClick={() => setSelectedConversation(convo.peerAddress)}
            >
              <p className="font-medium">{formatAddress(convo.peerAddress)}</p>
            </div>
          ))}
        </div>
      )}
      
      {selectedConversation && (
        <MessageModal 
          recipientAddress={selectedConversation} 
          onClose={() => setSelectedConversation(null)} 
        />
      )}
    </div>
  );
}
