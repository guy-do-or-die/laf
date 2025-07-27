import {formatUnits} from 'viem';

import { ItemStatus } from "@/constants/itemStatus";


/**
 * Determine item status based on contract state flags
 * @param {Object} itemData - Item data from contract
 * @returns {number} - Item status enum value
 */
export function determineItemStatus(itemData) {
    if (!itemData) return ItemStatus.Registered;
    
    // Priority order: returned > found > lost > registered
    if (itemData.isReturned) return ItemStatus.Returned;
    if (itemData.isFound) return ItemStatus.Found;
    if (itemData.isLost) return ItemStatus.Lost;
    
    return ItemStatus.Registered;
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
    return status === ItemStatus.Registered || status === ItemStatus.Returned;
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
    
    return status === ItemStatus.Found && isOwner;
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
            role: 'other_to_owner',
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
 * Get status color class for UI styling
 * @param {number} status - Item status enum value
 * @returns {string} - CSS class name for status color
 */
export function getStatusColor(status) {
    switch (status) {
        case ItemStatus.None: return 'bg-red-100';
        case ItemStatus.Registered: return 'bg-gray-100';
        case ItemStatus.Lost: return 'bg-red-100';
        case ItemStatus.Found: return 'bg-yellow-100';
        case ItemStatus.Returned: return 'bg-green-100';
        default: return 'bg-gray-100';
    }
}

/**
 * Create return transaction parameters
 * @param {string} hash - Item hash
 * @param {number} charityIndex - Charity index (default: 0)
 * @param {number} charityFee - Charity fee in basis points (default: 100)
 * @param {number} fee - Platform fee in basis points (default: 0)
 * @returns {Object} - Transaction parameters for return function
 */
export function createReturnParams(hash, charityIndex = 0, charityFee = 100, fee = 0) {
    return {
        args: [hash, charityIndex, charityFee, fee],
        enabled: true
    };
}

/**
 * Create contract configuration for reading item data
 * @param {string} address - Item contract address
 * @param {Object} abi - Contract ABI
 * @returns {Array} - Contract configuration array for useReadContracts
 */
export function createItemContractConfig(address, abi) {
    return [
        {
            address: address,
            abi: abi,
            functionName: 'comment',
        },
        {
            address: address,
            abi: abi,
            functionName: 'status',
        },
        {
            address: address,
            abi: abi,
            functionName: 'geo',
        },
        {
            address: address,
            abi: abi,
            functionName: 'reward',
        },
        {
            address: address,
            abi: abi,
            functionName: 'finder',
        },
        {
            address: address,
            abi: abi,
            functionName: 'owner',
        },
    ];
}

/**
 * Process raw contract data into structured item data
 * @param {Array} readData - Raw contract read results
 * @returns {Object} - Processed item data
 */
export function processContractData(readData) {
    if (!readData || readData.length < 6) {
        return null;
    }
    
    const status = readData[1].result;
    
    return {
        comment: readData[0].result,
        status: status || ItemStatus.Registered,
        isLost: status === ItemStatus.Lost,
        isFound: status === ItemStatus.Found,
        isReturned: status === ItemStatus.Returned,
        geo: readData[2].result,
        reward: readData[3].result,
        finder: readData[4].result,
        owner: readData[5].result,
    };
}

/**
 * Create item business data object with computed properties
 * @param {Object} rawItemData - Raw item data from contract
 * @param {string} currentUserAddress - Current user's address
 * @returns {Object} - Processed item business data
 */
export function getItemData(rawItemData, currentUserAddress) {
    const status = determineItemStatus(rawItemData);
    const reward = hasReward(rawItemData) ? formatReward(rawItemData.reward) : null;
    const messagingRecipient = getMessagingRecipient(rawItemData, currentUserAddress);
    
    return {
        ...rawItemData,
        status,
        statusColor: getStatusColor(status),
        formattedReward: reward,
        messagingRecipient,
        canReportLost: canReportLost(rawItemData),
        canReturn: canReturn(rawItemData, currentUserAddress),
        hasReward: hasReward(rawItemData)
    };
}
