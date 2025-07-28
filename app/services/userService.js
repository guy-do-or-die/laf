import { getPaginatedItemsByOwner, getPaginatedItemsByFinder } from './graphService';

/**
 * Service for handling user profile data and statistics
 */

/**
 * Get comprehensive user profile data
 * @param {string} userAddress - The user's wallet address
 * @returns {Object} User profile data with statistics
 */
export const getUserProfile = async (userAddress) => {
  try {
    const [ownedItems, foundItems] = await Promise.all([
      getPaginatedItemsByOwner(userAddress, 0, 100), // Get more items for stats
      getPaginatedItemsByFinder(userAddress, 0, 100),
    ]);

    // Calculate statistics
    const stats = calculateUserStats(ownedItems, foundItems);

    return {
      address: userAddress,
      ownedItems,
      foundItems,
      stats,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

/**
 * Calculate user statistics from item data
 * @param {Array} ownedItems - Items owned by the user
 * @param {Array} foundItems - Items found by the user
 * @returns {Object} Calculated statistics
 */
export const calculateUserStats = (ownedItems = [], foundItems = []) => {
  const stats = {
    totalOwned: ownedItems.length,
    totalFound: foundItems.length,
    totalLost: 0,
    totalReturned: 0,
    totalRegistered: 0,
    successRate: 0,
    helpfulnessScore: 0,
  };

  // Calculate status breakdown for owned items
  ownedItems.forEach(item => {
    switch (item.status?.toLowerCase()) {
      case 'registered':
        stats.totalRegistered++;
        break;
      case 'lost':
        stats.totalLost++;
        break;
      case 'returned':
        stats.totalReturned++;
        break;
    }
  });

  // Calculate success rate (returned / lost)
  if (stats.totalLost > 0) {
    stats.successRate = Math.round((stats.totalReturned / (stats.totalLost + stats.totalReturned)) * 100);
  }

  // Calculate helpfulness score based on items found for others
  stats.helpfulnessScore = Math.min(stats.totalFound * 10, 100); // Cap at 100

  return stats;
};

/**
 * Get user activity timeline
 * @param {string} userAddress - The user's wallet address
 * @returns {Array} Timeline of user activities
 */
export const getUserActivityTimeline = async (userAddress) => {
  try {
    const [ownedItems, foundItems] = await Promise.all([
      getPaginatedItemsByOwner(userAddress, 0, 50),
      getPaginatedItemsByFinder(userAddress, 0, 50),
    ]);

    // Combine and sort activities by timestamp
    const activities = [];

    ownedItems.forEach(item => {
      activities.push({
        type: 'registered',
        timestamp: item.blockTimestamp,
        item: item,
        description: 'Registered a new item',
      });

      // Add status change activities if available
      if (item.status === 'lost' && item.lostTimestamp) {
        activities.push({
          type: 'lost',
          timestamp: item.lostTimestamp,
          item: item,
          description: 'Reported item as lost',
        });
      }

      if (item.status === 'returned' && item.returnedTimestamp) {
        activities.push({
          type: 'returned',
          timestamp: item.returnedTimestamp,
          item: item,
          description: 'Item was returned',
        });
      }
    });

    foundItems.forEach(item => {
      activities.push({
        type: 'found',
        timestamp: item.blockTimestamp,
        item: item,
        description: 'Found an item for someone else',
      });
    });

    // Sort by timestamp (newest first)
    return activities.sort((a, b) => parseInt(b.timestamp) - parseInt(a.timestamp));
  } catch (error) {
    console.error('Error fetching user activity timeline:', error);
    throw error;
  }
};

/**
 * Format user address for display
 * @param {string} address - Full wallet address
 * @returns {string} Formatted address
 */
export const formatUserAddress = (address) => {
  if (!address) return '';
  return `${address.slice(0, 6)}...${address.slice(-4)}`;
};

/**
 * Get user reputation level based on stats
 * @param {Object} stats - User statistics
 * @returns {Object} Reputation level info
 */
export const getUserReputationLevel = (stats) => {
  const totalActivity = stats.totalOwned + stats.totalFound;
  
  if (totalActivity >= 50) {
    return {
      level: 'Expert',
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      description: 'Highly active community member',
    };
  } else if (totalActivity >= 20) {
    return {
      level: 'Advanced',
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      description: 'Experienced LAF user',
    };
  } else if (totalActivity >= 5) {
    return {
      level: 'Intermediate',
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      description: 'Regular community participant',
    };
  } else {
    return {
      level: 'Beginner',
      color: 'text-gray-600',
      bgColor: 'bg-gray-50',
      description: 'New to LAF community',
    };
  }
};

/**
 * Check if user can perform thumb actions on target
 * @param {string} currentUser - Current user address
 * @param {string} targetUser - Target user address
 * @returns {boolean} Whether thumb actions are allowed
 */
export const canPerformThumbActions = (currentUser, targetUser) => {
  if (!currentUser || !targetUser) return false;
  return currentUser.toLowerCase() !== targetUser.toLowerCase();
};
