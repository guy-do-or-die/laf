/**
 * Error Service - Pure business logic for error parsing and handling
 * Following SRP: Only handles error processing, no UI dependencies
 */

/**
 * Error templates for common blockchain and RPC errors
 */
const ERROR_TEMPLATES = [
    /(The total cost (.+?) exceeds the balance of the account)/,
    /(Execution reverted for an unknown reason)/,
    /(The contract function (.+?) reverted)/,
    /(User rejected the request)/,
    /following reason:\n(.*?)\n/s,
    /(RPC Error)/,
    /(RPC error)/,
    /(Invalid parameters were provided to the RPC method)/,
];

/**
 * Parse error object to extract user-friendly error message
 * @param {Error|Object} error - Error object to parse
 * @returns {string} - Parsed error message
 */
export function parseError(error) {
    if (!error) return 'Unknown error occurred';
    
    let msg = error.message || error.toString();
    
    // Log original error for debugging
    console.log('Original error:', error);
    console.log('Error message:', msg);

    // Try to match against known error templates
    for (const template of ERROR_TEMPLATES) {
        const matches = msg.match(template);
        if (matches && matches[1]) {
            msg = matches[1].trim();
            break;
        }
    }

    return msg;
}

/**
 * Categorize error type based on error content
 * @param {Error|Object} error - Error object to categorize
 * @returns {string} - Error category
 */
export function categorizeError(error) {
    if (!error) return 'unknown';
    
    const msg = error.message || error.toString();
    
    if (msg.includes('User rejected')) return 'user_rejected';
    if (msg.includes('insufficient funds') || msg.includes('exceeds the balance')) return 'insufficient_funds';
    if (msg.includes('reverted')) return 'contract_revert';
    if (msg.includes('RPC')) return 'rpc_error';
    if (msg.includes('network')) return 'network_error';
    
    return 'unknown';
}

/**
 * Check if error is retryable based on error type
 * @param {Error|Object} error - Error object to check
 * @returns {boolean} - True if error is retryable
 */
export function isRetryableError(error) {
    const category = categorizeError(error);
    
    // Non-retryable errors
    const nonRetryableCategories = ['user_rejected', 'insufficient_funds'];
    
    return !nonRetryableCategories.includes(category);
}

/**
 * Get suggested action for error type
 * @param {Error|Object} error - Error object to analyze
 * @returns {string} - Suggested action message
 */
export function getErrorAction(error) {
    const category = categorizeError(error);
    
    const actionMap = {
        user_rejected: 'Please approve the transaction in your wallet',
        insufficient_funds: 'Please ensure you have sufficient funds',
        contract_revert: 'Please check transaction parameters and try again',
        rpc_error: 'Please check your network connection and try again',
        network_error: 'Please check your network connection and try again',
        unknown: 'Please try again or contact support'
    };
    
    return actionMap[category] || actionMap.unknown;
}

/**
 * Create error result object with parsed information
 * @param {Error|Object} error - Error object to process
 * @returns {Object} - Processed error result
 */
export function processError(error) {
    const message = parseError(error);
    const category = categorizeError(error);
    const isRetryable = isRetryableError(error);
    const suggestedAction = getErrorAction(error);
    
    return {
        message,
        category,
        isRetryable,
        suggestedAction,
        originalError: error
    };
}
