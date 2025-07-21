/**
 * Item Service - Pure business logic for item operations and status management
 * Following SRP: Only handles item-related calculations, no UI or React dependencies
 */

/**
 * Item status enum for consistent status identification
 */
export const ITEM_STATUS = {
    REGISTERED: 0,
    LOST: 1,
    FOUND: 2,
    RETURNED: 3
};



/**
 * Determine item status based on contract state flags
 * @param {Object} itemData - Item data from contract
 * @returns {number} - Item status enum value
 */
export function determineItemStatus(itemData) {
    if (!itemData) return ITEM_STATUS.REGISTERED;
    
    // Priority order: returned > found > lost > registered
    if (itemData.isReturned) return ITEM_STATUS.RETURNED;
    if (itemData.isFound) return ITEM_STATUS.FOUND;
    if (itemData.isLost) return ITEM_STATUS.LOST;
    
    return ITEM_STATUS.REGISTERED;
}



/**
 * Check if item is in a specific status
 * @param {Object} itemData - Item data from contract
 * @param {number} targetStatus - Target status to check
 * @returns {boolean} - True if item is in target status
 */
export function isItemInStatus(itemData, targetStatus) {
    return determineItemStatus(itemData) === targetStatus;
}

/**
 * Check if item can be reported as lost
 * @param {Object} itemData - Item data from contract
 * @returns {boolean} - True if item can be reported lost
 */
export function canReportLost(itemData) {
    const status = determineItemStatus(itemData);
    return status === ITEM_STATUS.REGISTERED;
}

/**
 * Check if item can be returned
 * @param {Object} itemData - Item data from contract
 * @param {string} currentUserAddress - Current user's address
 * @returns {boolean} - True if item can be returned
 */
export function canReturn(itemData, currentUserAddress) {
    const status = determineItemStatus(itemData);
    const isOwner = currentUserAddress && 
                   currentUserAddress.toLowerCase() === itemData.owner?.toLowerCase();
    
    return status === ITEM_STATUS.FOUND && isOwner;
}

/**
 * Format reward amount for display
 * @param {bigint} rewardAmount - Reward amount in wei
 * @param {number} decimals - Token decimals (default: 6 for USDC)
 * @returns {string} - Formatted reward amount
 */
export function formatReward(rewardAmount, decimals = 6) {
    if (!rewardAmount || rewardAmount === 0n) return '0';
    
    try {
        // Use viem's formatUnits for proper decimal handling
        const { formatUnits } = require('viem');
        return formatUnits(rewardAmount, decimals);
    } catch (error) {
        console.error('Error formatting reward:', error);
        return '0';
    }
}

/**
 * Check if item has a reward
 * @param {Object} itemData - Item data from contract
 * @returns {boolean} - True if item has a reward
 */
export function hasReward(itemData) {
    return itemData.reward && itemData.reward > 0n;
}

/**
 * Get messaging recipient based on user role
 * @param {Object} itemData - Item data from contract
 * @param {string} currentUserAddress - Current user's address
 * @returns {Object} - Recipient information
 */
export function getMessagingRecipient(itemData, currentUserAddress) {
    if (!currentUserAddress || !itemData) {
        return { address: null, role: null };
    }
    
    const userAddress = currentUserAddress.toLowerCase();
    const ownerAddress = itemData.owner?.toLowerCase();
    const finderAddress = itemData.finder?.toLowerCase();
    
    if (userAddress === ownerAddress) {
        return { 
            address: itemData.finder, 
            role: 'owner_to_finder',
            title: itemData.comment || "Your item"
        };
    } else if (userAddress === finderAddress) {
        return { 
            address: itemData.owner, 
            role: 'finder_to_owner',
            title: itemData.comment || "Found item"
        };
    } else {
        return { 
            address: itemData.finder, 
            role: 'other_to_finder',
            title: itemData.comment || "Item"
        };
    }
}

/**
 * Validate item data completeness
 * @param {Object} itemData - Item data to validate
 * @returns {Object} - Validation result
 */
export function validateItemData(itemData) {
    const errors = [];
    
    if (!itemData) {
        errors.push('Item data is required');
        return { isValid: false, errors };
    }
    
    if (!itemData.comment) {
        errors.push('Item comment is required');
    }
    
    if (!itemData.owner) {
        errors.push('Item owner is required');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Create item business data object with computed properties
 * @param {Object} itemData - Raw item data from contract
 * @param {string} currentUserAddress - Current user's address
 * @returns {Object} - Processed item business data
 */
export function createItemBusinessData(itemData, currentUserAddress) {
    const status = determineItemStatus(itemData);
    const reward = hasReward(itemData) ? formatReward(itemData.reward) : null;
    const messagingRecipient = getMessagingRecipient(itemData, currentUserAddress);
    
    return {
        ...itemData,
        status,
        formattedReward: reward,
        messagingRecipient,
        canReportLost: canReportLost(itemData),
        canReturn: canReturn(itemData, currentUserAddress),
        hasReward: hasReward(itemData)
    };
}
