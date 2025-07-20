/**
 * Abstract messaging interface for different messaging protocols (XMTP, Waku, etc.)
 */

export const MessagingStatus = {
  DISCONNECTED: 'disconnected',
  CONNECTING: 'connecting',
  CONNECTED: 'connected',
  ERROR: 'error'
};

/**
 * Abstract messaging client interface
 */
export class AbstractMessagingClient {
  constructor() {
    this.status = MessagingStatus.DISCONNECTED;
    this.error = null;
  }

  /**
   * Initialize the messaging client
   * @param {Object} config - Configuration object
   * @returns {Promise<void>}
   */
  async initialize(config) {
    throw new Error('initialize() must be implemented by subclass');
  }

  /**
   * Disconnect from the messaging network
   * @returns {Promise<void>}
   */
  async disconnect() {
    throw new Error('disconnect() must be implemented by subclass');
  }

  /**
   * Check if a peer can receive messages
   * @param {string} peerAddress - Address of the peer
   * @returns {Promise<boolean>}
   */
  async canMessage(peerAddress) {
    throw new Error('canMessage() must be implemented by subclass');
  }

  /**
   * Create or get existing conversation with a peer
   * @param {string} peerAddress - Address of the peer
   * @returns {Promise<AbstractConversation>}
   */
  async getConversation(peerAddress) {
    throw new Error('getConversation() must be implemented by subclass');
  }

  /**
   * Get all conversations
   * @returns {Promise<AbstractConversation[]>}
   */
  async getConversations() {
    throw new Error('getConversations() must be implemented by subclass');
  }
}

/**
 * Abstract conversation interface
 */
export class AbstractConversation {
  constructor(peerAddress) {
    this.peerAddress = peerAddress;
    this.messages = [];
  }

  /**
   * Send a message in this conversation
   * @param {string} content - Message content
   * @returns {Promise<void>}
   */
  async send(content) {
    throw new Error('send() must be implemented by subclass');
  }

  /**
   * Get messages in this conversation
   * @returns {Promise<AbstractMessage[]>}
   */
  async getMessages() {
    throw new Error('getMessages() must be implemented by subclass');
  }

  /**
   * Start streaming new messages
   * @param {Function} onMessage - Callback for new messages
   * @returns {Function} - Cleanup function
   */
  streamMessages(onMessage) {
    throw new Error('streamMessages() must be implemented by subclass');
  }
}

/**
 * Abstract message interface
 */
export class AbstractMessage {
  constructor(content, senderAddress, timestamp) {
    this.content = content;
    this.senderAddress = senderAddress;
    this.timestamp = timestamp || Date.now();
    this.id = `${senderAddress}-${this.timestamp}`;
  }
}
