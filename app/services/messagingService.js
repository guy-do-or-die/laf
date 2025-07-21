/**
 * Messaging Service - Pure business logic for messaging provider management
 * Following SRP: Only handles messaging logic, no UI or React dependencies
 */

/**
 * Messaging provider types enum
 */
export const MESSAGING_PROVIDERS = {
    WAKU: 'waku',
    XMTP: 'xmtp',
    DISABLED: null
};

/**
 * Determine if a messaging provider is active
 * @param {string} provider - Provider type
 * @returns {boolean} - True if provider is active
 */
export function isProviderActive(provider) {
    return provider && provider !== MESSAGING_PROVIDERS.DISABLED;
}

/**
 * Validate messaging provider type
 * @param {string} provider - Provider type to validate
 * @returns {boolean} - True if provider is valid
 */
export function isValidProvider(provider) {
    return Object.values(MESSAGING_PROVIDERS).includes(provider);
}

/**
 * Get provider capabilities based on provider type
 * @param {string} provider - Provider type
 * @returns {Object} - Provider capabilities
 */
export function getProviderCapabilities(provider) {
    const capabilities = {
        [MESSAGING_PROVIDERS.WAKU]: {
            supportsSecretHash: true,
            supportsTopics: true,
            supportsEncryption: true,
            requiresConnection: true,
            maxMessageSize: 1024 * 1024, // 1MB
            supportsBinaryMessages: true
        },
        [MESSAGING_PROVIDERS.XMTP]: {
            supportsSecretHash: false,
            supportsTopics: false,
            supportsEncryption: true,
            requiresConnection: true,
            maxMessageSize: 100 * 1024, // 100KB
            supportsBinaryMessages: false
        },
        [MESSAGING_PROVIDERS.DISABLED]: {
            supportsSecretHash: false,
            supportsTopics: false,
            supportsEncryption: false,
            requiresConnection: false,
            maxMessageSize: 0,
            supportsBinaryMessages: false
        }
    };

    return capabilities[provider] || capabilities[MESSAGING_PROVIDERS.DISABLED];
}

/**
 * Check if provider supports a specific feature
 * @param {string} provider - Provider type
 * @param {string} feature - Feature to check
 * @returns {boolean} - True if provider supports feature
 */
export function supportsFeature(provider, feature) {
    const capabilities = getProviderCapabilities(provider);
    return capabilities[feature] || false;
}

/**
 * Create messaging context value based on provider state
 * @param {string} provider - Provider type
 * @param {Object} providerContext - Provider-specific context
 * @returns {Object} - Unified messaging context value
 */
export function createMessagingContextValue(provider, providerContext = {}) {
    if (!isProviderActive(provider)) {
        return {
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
            setAutoMessagingEnabled: () => {}
        };
    }

    return {
        provider,
        client: providerContext.client || null,
        isConnecting: providerContext.initializing || providerContext.isConnecting || false,
        isConnected: providerContext.isConnected || (providerContext.client && !providerContext.error) || false,
        error: providerContext.error || null,
        connect: providerContext.connect || (() => {}),
        disconnect: providerContext.disconnect || (() => {}),
        canMessage: providerContext.canMessage || (() => Promise.resolve(false)),
        getConversation: providerContext.getConversation || (() => Promise.reject(new Error("Not available"))),
        autoMessagingEnabled: providerContext.autoMessagingEnabled !== undefined ? providerContext.autoMessagingEnabled : true,
        setAutoMessagingEnabled: providerContext.setAutoMessagingEnabled || (() => {})
    };
}

/**
 * Validate recipient address for messaging
 * @param {string} address - Recipient address
 * @returns {Object} - Validation result
 */
export function validateRecipientAddress(address) {
    const errors = [];
    
    if (!address) {
        errors.push('Recipient address is required');
    } else if (typeof address !== 'string') {
        errors.push('Recipient address must be a string');
    } else if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
        errors.push('Invalid Ethereum address format');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Validate message content
 * @param {string} content - Message content
 * @param {string} provider - Provider type for size limits
 * @returns {Object} - Validation result
 */
export function validateMessageContent(content, provider) {
    const errors = [];
    const capabilities = getProviderCapabilities(provider);
    
    if (!content) {
        errors.push('Message content is required');
    } else if (typeof content !== 'string') {
        errors.push('Message content must be a string');
    } else if (content.length > capabilities.maxMessageSize) {
        errors.push(`Message exceeds maximum size of ${capabilities.maxMessageSize} characters`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Format message for provider-specific sending
 * @param {string} content - Message content
 * @param {string} provider - Provider type
 * @param {Object} metadata - Additional message metadata
 * @returns {Object} - Formatted message object
 */
export function formatMessage(content, provider, metadata = {}) {
    const baseMessage = {
        content,
        timestamp: Date.now(),
        provider
    };
    
    // Add provider-specific formatting
    switch (provider) {
        case MESSAGING_PROVIDERS.WAKU:
            return {
                ...baseMessage,
                topic: metadata.topic,
                secretHash: metadata.secretHash,
                ...metadata
            };
        case MESSAGING_PROVIDERS.XMTP:
            return {
                ...baseMessage,
                ...metadata
            };
        default:
            return baseMessage;
    }
}

/**
 * Determine conversation identifier based on provider and parameters
 * @param {string} provider - Provider type
 * @param {string} recipientAddress - Recipient address
 * @param {string} secretHash - Optional secret hash for topic-based messaging
 * @returns {string} - Conversation identifier
 */
export function getConversationId(provider, recipientAddress, secretHash = null) {
    if (!isProviderActive(provider)) {
        return null;
    }
    
    switch (provider) {
        case MESSAGING_PROVIDERS.WAKU:
            // Waku uses topic-based conversations with secret hash
            return secretHash ? `${recipientAddress}-${secretHash}` : recipientAddress;
        case MESSAGING_PROVIDERS.XMTP:
            // XMTP uses direct address-based conversations
            return recipientAddress;
        default:
            return recipientAddress;
    }
}

/**
 * Check if auto-messaging should be enabled based on provider and user preferences
 * @param {string} provider - Provider type
 * @param {boolean} userPreference - User's auto-messaging preference
 * @returns {boolean} - True if auto-messaging should be enabled
 */
export function shouldEnableAutoMessaging(provider, userPreference = true) {
    if (!isProviderActive(provider)) {
        return false;
    }
    
    return userPreference && supportsFeature(provider, 'requiresConnection');
}
