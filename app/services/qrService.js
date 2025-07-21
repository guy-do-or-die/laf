/**
 * QR Code Service - Pure business logic for QR code generation and validation
 * Following SRP: Only handles QR code operations, no UI or React dependencies
 */

/**
 * QR code types enum
 */
export const QR_CODE_TYPES = {
    ITEM_REGISTRATION: 'item_registration',
    WALLET_ADDRESS: 'wallet_address',
    GENERIC_URL: 'generic_url',
    TEXT: 'text'
};



/**
 * Validate QR code data
 * @param {string} data - Data to encode in QR code
 * @returns {Object} - Validation result
 */
export function validateQRData(data) {
    const errors = [];
    
    if (!data) {
        errors.push('QR code data is required');
    } else if (typeof data !== 'string') {
        errors.push('QR code data must be a string');
    } else if (data.length > 4296) {
        // QR code capacity limit for alphanumeric mode
        errors.push('QR code data exceeds maximum capacity (4296 characters)');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Create item registration URL for QR code
 * @param {string} baseUrl - Base URL of the application
 * @param {string} secretHash - Secret hash for the item
 * @param {string} signature - Owner's signature
 * @returns {string} - Complete registration URL
 */
export function createItemRegistrationUrl(baseUrl, secretHash, signature) {
    if (!baseUrl || !secretHash || !signature) {
        throw new Error('Base URL, secret hash, and signature are required');
    }
    
    const cleanBaseUrl = baseUrl.replace(/\/$/, '');
    const url = new URL(`${cleanBaseUrl}/found`);
    url.searchParams.set('secretHash', secretHash);
    url.searchParams.set('signature', signature);
    
    return url.toString();
}

/**
 * Get color scheme for QR code type
 * @param {string} type - QR code type
 * @returns {string} - Color for the QR code type
 */
export function getQRTypeColor(type) {
    switch (type) {
        case QR_CODE_TYPES.ITEM_REGISTRATION:
            return "#2563eb"; // Blue for items
        case QR_CODE_TYPES.WALLET_ADDRESS:
            return "#059669"; // Green for wallets
        case QR_CODE_TYPES.GENERIC_URL:
            return "#7c3aed"; // Purple for URLs
        default:
            return "#222222"; // Default black
    }
}

/**
 * Estimate QR code complexity level
 * @param {string} data - Data to encode
 * @returns {string} - Complexity level (low, medium, high)
 */
export function estimateQRComplexity(data) {
    if (!data) return 'low';
    
    const length = data.length;
    
    if (length < 100) return 'low';
    if (length < 500) return 'medium';
    return 'high';
}

/**
 * Get recommended error correction level based on use case
 * @param {string} type - QR code type
 * @param {string} complexity - Data complexity level
 * @returns {string} - Error correction level (L, M, Q, H)
 */
export function getRecommendedErrorCorrection(type, complexity) {
    if (type === QR_CODE_TYPES.ITEM_REGISTRATION) {
        return complexity === 'high' ? 'M' : 'Q';
    }
    
    switch (complexity) {
        case 'low': return 'L';
        case 'medium': return 'M';
        case 'high': return 'M';
        default: return 'M';
    }
}
