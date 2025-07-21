/**
 * Notification Service - Pure business logic for notification management
 * Following SRP: Only handles notification configuration and logic, no UI dependencies
 */

/**
 * Notification types enum for consistent notification handling
 */
export const NOTIFICATION_TYPES = {
    ERROR: 'error',
    SUCCESS: 'success',
    INFO: 'info',
    LOADING: 'loading'
};

/**
 * Default notification configurations for each type
 */
export const NOTIFICATION_DEFAULTS = {
    [NOTIFICATION_TYPES.ERROR]: {
        duration: 5000,
        dismissible: true,
        copyable: true
    },
    [NOTIFICATION_TYPES.SUCCESS]: {
        duration: 2000,
        dismissible: true,
        copyable: false
    },
    [NOTIFICATION_TYPES.INFO]: {
        duration: 4000,
        dismissible: true,
        copyable: true
    },
    [NOTIFICATION_TYPES.LOADING]: {
        duration: Infinity,
        dismissible: false,
        copyable: false
    }
};

/**
 * Create notification configuration based on type and custom params
 * @param {string} type - Notification type
 * @param {Object} customParams - Custom parameters to override defaults
 * @returns {Object} - Complete notification configuration
 */
export function createNotificationConfig(type, customParams = {}) {
    const defaults = NOTIFICATION_DEFAULTS[type] || NOTIFICATION_DEFAULTS[NOTIFICATION_TYPES.INFO];
    
    return {
        ...defaults,
        ...customParams,
        type
    };
}

/**
 * Determine if notification should be copyable based on type and content
 * @param {string} type - Notification type
 * @param {string} content - Notification content
 * @returns {boolean} - True if notification should be copyable
 */
export function shouldBeeCopyable(type, content) {
    // Don't make short messages copyable
    if (typeof content === 'string' && content.length < 20) {
        return false;
    }
    
    // Error and info messages are typically copyable
    return [NOTIFICATION_TYPES.ERROR, NOTIFICATION_TYPES.INFO].includes(type);
}

/**
 * Generate unique notification ID
 * @returns {string} - Unique notification ID
 */
export function generateNotificationId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate notification parameters
 * @param {string} content - Notification content
 * @param {string} type - Notification type
 * @returns {Object} - Validation result
 */
export function validateNotificationParams(content, type) {
    const errors = [];
    
    if (!content) {
        errors.push('Content is required');
    }
    
    if (!Object.values(NOTIFICATION_TYPES).includes(type)) {
        errors.push(`Invalid notification type: ${type}`);
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Create notification data object with all necessary information
 * @param {string} content - Notification content
 * @param {string} type - Notification type
 * @param {Object} customParams - Custom parameters
 * @returns {Object} - Complete notification data
 */
export function createNotificationData(content, type, customParams = {}) {
    const validation = validateNotificationParams(content, type);
    
    if (!validation.isValid) {
        throw new Error(`Invalid notification parameters: ${validation.errors.join(', ')}`);
    }
    
    const config = createNotificationConfig(type, customParams);
    const id = customParams.id || generateNotificationId();
    const copyable = shouldBeeCopyable(type, content);
    
    return {
        id,
        content,
        type,
        copyable,
        config,
        timestamp: Date.now()
    };
}

/**
 * Format notification content for display
 * @param {any} content - Raw notification content
 * @param {string} type - Notification type
 * @returns {string} - Formatted content
 */
export function formatNotificationContent(content, type) {
    if (typeof content === 'string') {
        return content;
    }
    
    if (content && typeof content === 'object') {
        // Handle React elements or complex objects
        return content.toString();
    }
    
    return String(content || 'Notification');
}

/**
 * Determine notification priority based on type
 * @param {string} type - Notification type
 * @returns {number} - Priority level (higher = more important)
 */
export function getNotificationPriority(type) {
    const priorityMap = {
        [NOTIFICATION_TYPES.ERROR]: 4,
        [NOTIFICATION_TYPES.LOADING]: 3,
        [NOTIFICATION_TYPES.INFO]: 2,
        [NOTIFICATION_TYPES.SUCCESS]: 1
    };
    
    return priorityMap[type] || 1;
}
