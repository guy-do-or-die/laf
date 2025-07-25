/**
 * LAFItem Status enum values
 * These correspond to the Status enum in LAFItem.sol contract
 */
export const ItemStatus = {
    None: 0,
    Registered: 1,
    Lost: 2,
    Found: 3,
    Returned: 4
};

/**
 * Helper function to get status name from value
 */
export const getStatusName = (status) => {
    const statusNames = {
        [ItemStatus.None]: 'None',
        [ItemStatus.Registered]: 'Registered',
        [ItemStatus.Lost]: 'Lost',
        [ItemStatus.Found]: 'Found',
        [ItemStatus.Returned]: 'Returned'
    };
    return statusNames[status] || 'Unknown';
};

/**
 * Helper function to check if item is found
 */
export const isItemFound = (status) => {
    return status === ItemStatus.Found;
};

/**
 * Helper function to check if item is lost
 */
export const isItemLost = (status) => {
    return status === ItemStatus.Lost;
};

/**
 * Helper function to check if item is returned
 */
export const isItemReturned = (status) => {
    return status === ItemStatus.Returned;
};
