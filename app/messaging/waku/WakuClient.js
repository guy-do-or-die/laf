import { createLightNode, createEncoder, createDecoder } from '@waku/sdk';
import { AbstractMessagingClient, AbstractConversation, AbstractMessage, MessagingStatus } from '../types.js';

/**
 * Waku implementation of the abstract messaging client
 */
export class WakuClient extends AbstractMessagingClient {
  constructor(walletAddress, secretHash) {
    super();
    this.walletAddress = walletAddress;
    this.secretHash = secretHash;
    this.node = null;
    this.encoder = null;
    this.decoder = null;
    this.contentTopic = null;
    this.peerId = null;
    this.localCache = new Map(); // Local message cache
    this.cacheKey = `waku_messages_${secretHash}`;
    this.conversations = new Map();
    this.senderAddress = null; // Store sender address (for backward compatibility)
    this.status = MessagingStatus.DISCONNECTED;
    this.error = null;
  }

  async initialize(config = {}) {
    console.log('🚀 Initializing Waku client...');
    
    try {
      this.status = MessagingStatus.CONNECTING;
      this.error = null;
      
      // Try to restore persistent identity
      this.loadPersistentIdentity();
      
      // Create Waku node
      this.node = await createLightNode({
        defaultBootstrap: true,
        ...config
      });
      
      // Start the node
      await this.node.start();
      
      // Store our peer ID for message identification
      // Use stored peer ID if available for consistency, otherwise use the new one
      this.peerId = this.storedPeerId || this.node.libp2p.peerId.toString();
      console.log('🆔 Waku peer ID for messaging:', this.peerId);
      
      if (this.storedPeerId) {
        console.log('🔄 Using stored peer ID for message consistency');
      } else {
        console.log('🆕 Using new peer ID (first time)');
      }
      
      // Save identity for future sessions
      this.savePersistentIdentity();
      
      // Set status to connected
      this.status = MessagingStatus.CONNECTED;
      
      console.log('✅ Waku client initialized successfully');
      
    } catch (error) {
      this.status = MessagingStatus.ERROR;
      this.error = error;
      console.error('❌ Failed to initialize Waku client:', error);
      throw error;
    }
  }

  // Load persistent identity from localStorage
  loadPersistentIdentity() {
    try {
      const identityKey = `waku_identity_${this.walletAddress}`;
      const stored = localStorage.getItem(identityKey);
      
      if (stored) {
        const identity = JSON.parse(stored);
        console.log('🔑 Found stored Waku identity:', identity.peerId);
        
        // For now, we'll use a simpler approach:
        // Store the peer ID and use it for message identification
        // The actual libp2p identity will be new each session, but we'll
        // maintain consistent message sender identification
        this.storedPeerId = identity.peerId;
        console.log('✅ Will use stored peer ID for message identification');
      }
    } catch (error) {
      console.warn('⚠️ Failed to load persistent identity:', error);
    }
    
    console.log('🆕 Creating new Waku libp2p identity (but will use stored peer ID for messages)');
    return {};
  }

  // Save persistent identity to localStorage
  savePersistentIdentity() {
    try {
      const identityKey = `waku_identity_${this.walletAddress}`;
      
      const identity = {
        peerId: this.peerId, // Store the peer ID we're using for messages
        timestamp: Date.now()
      };
      
      localStorage.setItem(identityKey, JSON.stringify(identity));
      console.log('💾 Saved persistent Waku identity for message consistency');
    } catch (error) {
      console.warn('⚠️ Failed to save persistent identity:', error);
    }
  }

  async disconnect() {
    try {
      if (this.node) {
        await this.node.stop();
        this.node = null;
      }
      this.conversations.clear();
      this.status = MessagingStatus.DISCONNECTED;
      this.error = null;
      console.log('🔌 Waku client disconnected');
    } catch (error) {
      console.error('❌ Error during Waku disconnect:', error);
      this.status = MessagingStatus.ERROR;
      this.error = error;
    }
  }

  async canMessage(peerAddress) {
    // In Waku, any peer can potentially receive messages
    // This is different from XMTP which requires explicit capability checking
    return this.status === MessagingStatus.CONNECTED;
  }

  async getConversation(peerAddress, secretHash = null) {
    if (!this.node) {
      throw new Error('Waku client not initialized');
    }

    // Create unique conversation key based on peerAddress and secretHash
    const conversationKey = secretHash ? `${peerAddress}:${secretHash}` : peerAddress;
    
    let conversation = this.conversations.get(conversationKey);
    if (!conversation) {
      // Use item-specific content topic if secretHash is provided
      // Sanitize secretHash for valid Waku content topic (remove 0x prefix and use first 8 chars)
      const sanitizedHash = secretHash ? secretHash.replace('0x', '').substring(0, 8) : null;
      const contentTopic = secretHash ? `/laf/1/item-${sanitizedHash}/proto` : `/laf/1/chat/proto`;
      

      
      conversation = new WakuConversation(peerAddress, this.node, contentTopic, secretHash, this.senderAddress, this.peerId);
      this.conversations.set(conversationKey, conversation);
    }

    return conversation;
  }

  async getConversations() {
    return Array.from(this.conversations.values());
  }

  async sendMessage(content) {
    if (!this.encoder) {
      throw new Error('Waku client not initialized');
    }

    const timestamp = Date.now();
    const messagePayload = {
      content,
      senderAddress: this.peerId,
      timestamp
    };

    const protoMessage = this.encoder.toWire(messagePayload);
    await this.node.lightPush.send(this.encoder, protoMessage);

    // Create message object
    const message = new AbstractMessage(
      content,
      this.peerId,
      timestamp,
      `${this.peerId}-${timestamp}-${Math.random().toString(36).substr(2, 9)}`
    );

    // Add to local cache immediately
    this.addToCache(message);

    return message;
  };

  // Load messages from localStorage cache
  loadCachedMessages() {
    try {
      const cached = localStorage.getItem(this.cacheKey);
      if (!cached) return [];
      
      const data = JSON.parse(cached);
      return data.messages.map(msg => new AbstractMessage(
        msg.content,
        msg.senderAddress,
        msg.timestamp
        // Don't pass old ID - let AbstractMessage generate new unique ID with random component
      ));
    } catch (error) {
      console.error('❌ Failed to load cached messages:', error);
      return [];
    }
  }

  // Save messages to localStorage cache
  saveCachedMessages(messages) {
    try {
      const data = {
        timestamp: Date.now(),
        messages: messages.map(msg => ({
          content: msg.content,
          senderAddress: msg.senderAddress,
          timestamp: msg.timestamp,
          id: msg.id
        }))
      };
      localStorage.setItem(this.cacheKey, JSON.stringify(data));
      console.log(`💾 Cached ${messages.length} messages`);
    } catch (error) {
      console.error('❌ Failed to cache messages:', error);
    }
  }

  // Add message to cache
  addToCache(message) {
    const cached = this.loadCachedMessages();
    const existingIds = new Set(cached.map(m => m.id));
    
    if (!existingIds.has(message.id)) {
      cached.push(message);
      cached.sort((a, b) => a.timestamp - b.timestamp);
      this.saveCachedMessages(cached);
    }
  }
}

/**
 * Waku implementation of the abstract conversation
 */
export class WakuConversation extends AbstractConversation {
  constructor(peerAddress, node, contentTopic, secretHash, senderAddress, peerId) {
    super(peerAddress);
    this.node = node;
    this.contentTopic = contentTopic;
    this.secretHash = secretHash;
    this.senderAddress = senderAddress; // Store actual sender address (for backward compatibility)
    this.peerId = peerId; // Store our Waku node's peer ID for proper identity
    this.encoder = createEncoder({ contentTopic });
    this.decoder = createDecoder(contentTopic);
    this.messageCallbacks = new Set();
    this.filterSubscription = null;
    this.messages = [];
  }

  async send(content) {
    if (!this.node) {
      throw new Error('Waku node not available');
    }

    try {
      console.log('🚀 SEND DEBUG: Starting message send process...');
      
      // Check peer connectivity first
      const peers = await this.node.libp2p.peerStore.all();
      const connectedPeers = this.node.libp2p.getConnections();
      console.log('🔗 SEND DEBUG: Peer connectivity:', {
        totalPeers: peers.length,
        connectedPeers: connectedPeers.length,
        lightPushAvailable: !!this.node.lightPush,
        nodeStatus: this.node.isStarted() ? 'started' : 'stopped'
      });

      if (connectedPeers.length === 0) {
        console.warn('⚠️ SEND DEBUG: No connected peers! Message may not be transmitted.');
      }

      const timestamp = Date.now();
      // Create message payload
      const messageData = {
        content,
        senderAddress: this.senderAddress, // Keep for backward compatibility
        senderId: this.peerId, // Use Waku peer ID for proper identification
        recipientAddress: this.peerAddress,
        timestamp
      };

      const payload = new TextEncoder().encode(JSON.stringify(messageData));
      console.log('📦 SEND DEBUG: Message payload created:', {
        contentLength: content.length,
        payloadSize: payload.length,
        contentTopic: this.contentTopic
      });

      // Send message using LightPush
      console.log('📡 SEND DEBUG: Attempting LightPush send...');
      const sendResult = await this.node.lightPush.send(this.encoder, {
        payload,
        timestamp: new Date()
      });

      console.log('📡 SEND DEBUG: LightPush result:', {
        result: sendResult,
        resultType: typeof sendResult,
        hasErrors: sendResult && sendResult.errors ? sendResult.errors.length > 0 : false,
        errors: sendResult && sendResult.errors ? sendResult.errors : 'none'
      });

      // Handle different possible response structures from Waku SDK
      if (sendResult && sendResult.errors && sendResult.errors.length > 0) {
        console.error('❌ SEND DEBUG: LightPush errors:', sendResult.errors);
        throw new Error(`Failed to send message: ${sendResult.errors.join(', ')}`);
      }
      
      // Check if send was successful (some SDK versions return different structures)
      if (sendResult === null || sendResult === undefined) {
        console.error('❌ SEND DEBUG: No response from Waku network');
        throw new Error('Failed to send message: No response from Waku network');
      }

      console.log('✅ SEND DEBUG: Message successfully sent via LightPush!');
      
      // Check if we have successful recipients
      if (sendResult.recipients && sendResult.recipients.length > 0) {
        console.log('📬 SEND DEBUG: Message delivered to recipients:', sendResult.recipients);
      } else if (sendResult.successes && sendResult.successes.length > 0) {
        console.log('📬 SEND DEBUG: Message delivery successes:', sendResult.successes);
      } else {
        console.warn('⚠️ SEND DEBUG: No recipients confirmed - message may not have been delivered');
      }

      // Create message object for immediate caching
      const senderIdentifier = this.peerId || this.senderAddress;
      const message = new AbstractMessage(
        content,
        senderIdentifier,
        timestamp
        // Let AbstractMessage generate unique ID automatically with random component
      );

      // Cache the sent message immediately
      this.addToCache(message);
      console.log('💾 Cached sent message');

      // Don't add to local messages here - let the stream callback handle it for UI
      // This prevents duplicate messages when the message comes back via streaming

    } catch (error) {
      console.error('❌ Failed to send message:', error);
      throw error;
    }
  }

  async getMessages() {
    console.log('📝 Querying Waku store for historical messages...');
    console.log('Store query parameters:', {
      contentTopic: this.contentTopic,
      pubsubTopic: this.decoder.pubsubTopic,
      hasStoreProtocol: !!this.node.store,
      storeMulticodec: this.node.store?.multicodec
    });

    // Load cached messages first
    const cachedMessages = this.loadCachedMessages();
    console.log(`📦 Loaded ${cachedMessages.length} cached messages`);

    const storeMessages = [];
    const maxRetries = 2;
    let retryCount = 0;
    
    // Try to get messages from Store with retries
    while (retryCount < maxRetries) {
      try {
        console.log(`🔄 Store query attempt ${retryCount + 1}/${maxRetries}`);
        
        const timeoutMs = 2000; // Shorter timeout for retries
        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => reject(new Error('Store query timeout')), timeoutMs);
        });

        const queryPromise = this.node.store.queryWithOrderedCallback(
          [this.decoder],
          (wakuMessage) => {
            try {
              const decoded = JSON.parse(new TextDecoder().decode(wakuMessage.payload));
              const senderIdentifier = decoded.senderId || decoded.senderAddress;
              const message = new AbstractMessage(
                decoded.content,
                senderIdentifier,
                decoded.timestamp
                // Let AbstractMessage generate unique ID automatically with random component
              );
              storeMessages.push(message);
            } catch (decodeError) {
              console.error('❌ Failed to decode message:', decodeError);
            }
          },
          {
            contentTopics: [this.contentTopic],
            pubsubTopic: this.decoder.pubsubTopic
          }
        );

        await Promise.race([queryPromise, timeoutPromise]);
        console.log(`✅ Store query successful: ${storeMessages.length} messages`);
        break; // Success, exit retry loop
        
      } catch (error) {
        retryCount++;
        console.error(`❌ Store query attempt ${retryCount} failed:`, error.message);
        
        if (retryCount < maxRetries) {
          console.log('⏳ Retrying in 1 second...');
          await new Promise(resolve => setTimeout(resolve, 1000));
        }
      }
    }

    // Merge cached and store messages, removing duplicates
    const allMessages = [...cachedMessages];
    const existingIds = new Set(cachedMessages.map(m => m.id));
    
    for (const msg of storeMessages) {
      if (!existingIds.has(msg.id)) {
        allMessages.push(msg);
      }
    }

    console.log(`📝 Total messages: ${allMessages.length} (${cachedMessages.length} cached + ${storeMessages.length} from store)`);
    
    // Sort messages by timestamp (oldest first)
    allMessages.sort((a, b) => a.timestamp - b.timestamp);
    
    // Update cache with all messages
    if (allMessages.length > 0) {
      this.saveCachedMessages(allMessages);
    }
    
    return allMessages;
  }

  // Load messages from localStorage cache
  loadCachedMessages() {
    try {
      const cacheKey = `waku_messages_${this.secretHash}`;
      const cached = localStorage.getItem(cacheKey);
      if (!cached) return [];
      
      const data = JSON.parse(cached);
      return data.messages.map(msg => new AbstractMessage(
        msg.content,
        msg.senderAddress,
        msg.timestamp
        // Don't pass old ID - let AbstractMessage generate new unique ID with random component
      ));
    } catch (error) {
      console.error('❌ Failed to load cached messages:', error);
      return [];
    }
  }

  // Save messages to localStorage cache
  saveCachedMessages(messages) {
    try {
      const cacheKey = `waku_messages_${this.secretHash}`;
      const data = {
        timestamp: Date.now(),
        messages: messages.map(msg => ({
          content: msg.content,
          senderAddress: msg.senderAddress,
          timestamp: msg.timestamp,
          id: msg.id
        }))
      };
      localStorage.setItem(cacheKey, JSON.stringify(data));
      console.log(`💾 Cached ${messages.length} messages`);
    } catch (error) {
      console.error('❌ Failed to cache messages:', error);
    }
  }

  // Add message to cache
  addToCache(message) {
    const cached = this.loadCachedMessages();
    const existingIds = new Set(cached.map(m => m.id));
    
    if (!existingIds.has(message.id)) {
      cached.push(message);
      cached.sort((a, b) => a.timestamp - b.timestamp);
      this.saveCachedMessages(cached);
    }
  }

  async streamMessages(onMessage) {
    if (!this.node) {
      throw new Error('Waku node not available');
    }

    // Add callback to set
    this.messageCallbacks.add(onMessage);

    try {
      // Use the correct Waku SDK filter API
      const subscriptionResult = await this.node.filter.subscribe(
        [this.decoder],
        (wakuMessage) => {
          if (wakuMessage.payload) {
            try {
              const decoded = JSON.parse(new TextDecoder().decode(wakuMessage.payload));
              // Since we're on an item-specific topic, show all messages on this topic
              // The topic isolation provides the filtering we need
              
              // Use senderId (Waku peer ID) if available, fallback to senderAddress for backward compatibility
              const senderIdentifier = decoded.senderId || decoded.senderAddress;
              
              const message = new AbstractMessage(
                decoded.content,
                senderIdentifier,
                decoded.timestamp
                // Let AbstractMessage generate unique ID automatically with random component
              );
              
              // Cache the received message immediately
              this.addToCache(message);
              
              // Call all registered callbacks with the new message
              this.messageCallbacks.forEach(callback => {
                try {
                  callback(message);
                } catch (callbackError) {
                  console.error('❌ Error in message callback:', callbackError);
                }
              });
              
            } catch (error) {
              console.error('❌ Failed to decode streamed message:', error);
            }
          }
        }
      );

      if (subscriptionResult) {
        console.log('✅ Waku filter subscription successful');
      } else {
        console.warn('⚠️ Waku filter subscription failed');
      }
    } catch (error) {
      console.error('Failed to create Waku filter subscription:', error);
    }

    // Return cleanup function
    return () => {
      this.messageCallbacks.delete(onMessage);
      console.log('🧹 Waku streamMessages cleanup called');
      
      // If no more callbacks, unsubscribe
      if (this.messageCallbacks.size === 0) {
        try {
          this.node.filter.unsubscribe([this.decoder]);
          console.log('🚫 Unsubscribed from Waku filter');
        } catch (error) {
          console.warn('Error unsubscribing from Waku filter:', error);
        }
      }
    };
  }
}
