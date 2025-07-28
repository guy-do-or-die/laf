import { GraphQLClient } from 'graphql-request'
import { filterItemsByProximity } from '@/services/geoService';


const client = new GraphQLClient(import.meta.env.VITE_GRAPH_URL)


// Query to get all ItemRegistered events for a specific owner
export const GET_USER_ITEMS = `
  query GetUserItems($owner: Bytes!) {
    itemRegistereds(
      where: { owner: $owner }
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      owner
      item
      hash
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

// Query to get all items regardless of owner
export const GET_ALL_ITEMS = `
  query GetAllItems {
    itemRegistereds(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      owner
      item
      hash
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

// Query to get lost items
export const GET_LOST_ITEMS = `
  query GetLostItems {
    itemLosts(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      owner
      item
      hash
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

// Query to get found items
export const GET_FOUND_ITEMS = `
  query GetFoundItems {
    itemFounds(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      owner
      item
      hash
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

// Query to get returned items
export const GET_RETURNED_ITEMS = `
  query GetReturnedItems {
    itemReturneds(
      orderBy: blockTimestamp
      orderDirection: desc
    ) {
      id
      owner
      item
      hash
      blockNumber
      blockTimestamp
      transactionHash
    }
  }
`

export const graphqlClient = client

// Helper functions to make queries easier
export const getUserItems = async (owner) => {
  try {
    const data = await client.request(GET_USER_ITEMS, { owner: owner.toLowerCase() })
    return data.itemRegistereds
  } catch (error) {
    console.error('Error fetching user items:', error)
    throw error
  }
}

export const getAllItems = async () => {
  try {
    const data = await client.request(GET_ALL_ITEMS)
    return data.itemRegistereds
  } catch (error) {
    console.error('Error fetching all items:', error)
    throw error
  }
}

// Enhanced queries with status filtering (using pure subgraph approach)
// Uses Status entity for efficient querying without contract calls
export const getAllItemsWithStatus = async () => {
  try {
    // Current approach: Query all events and compute status
    // This is inefficient for large datasets but works until subgraph redeploy
    
    // After subgraph redeploy, use: getPaginatedItemsByStatus() instead
    
    const data = await client.request(GET_ALL_EVENTS)
    return data.itemRegistereds
  } catch (error) {
    console.error('Error fetching items with status:', error)
    throw error
  }
}

export const getLostItems = async () => {
  try {
    const data = await client.request(GET_LOST_ITEMS)
    return data.itemLosts
  } catch (error) {
    console.error('Error fetching lost items:', error)
    throw error
  }
}

export const getFoundItems = async () => {
  try {
    const data = await client.request(GET_FOUND_ITEMS)
    return data.itemFounds
  } catch (error) {
    console.error('Error fetching found items:', error)
    throw error
  }
}

export const getReturnedItems = async () => {
  try {
    const data = await client.request(GET_RETURNED_ITEMS)
    return data.itemReturneds
  } catch (error) {
    console.error('Error fetching returned items:', error)
    throw error
  }
}

// Scalable paginated queries using Status entity (after subgraph redeploy)
export const GET_ITEMS_BY_STATUS_PAGINATED = `
  query GetItemsByStatusPaginated(
    $first: Int!
    $skip: Int!
    $status: String!
    $owner: Bytes
    $finder: Bytes
    $latitude: BigDecimal
    $longitude: BigDecimal
    $radiusKm: BigDecimal
  ) {
    Statuses(
      first: $first
      skip: $skip
      where: { 
        status: $status
        owner: $owner
        finder: $finder
        latitude_not: null
        longitude_not: null
      }
      orderBy: lastUpdated
      orderDirection: desc
    ) {
      id
      item
      owner
      finder
      hash
      status
      geoLocation
      latitude
      longitude
      registeredAt
      lostAt
      foundAt
      returnedAt
      lastUpdated
      registeredTx
      lostTx
      foundTx
      returnedTx
    }
  }
`

export const GET_ITEMS_COUNT_BY_STATUS = `
  query GetItemsCountByStatus($status: String, $owner: String, $finder: String) {
    Statuses(
      where: { 
        status: $status
        owner: $owner
        finder: $finder
      }
    ) {
      id
    }
  }
`

/**
 * Get paginated items by status with efficient querying
 * @param {string} status - Filter by status ('lost', 'found', 'returned', 'registered')
 * @param {string} owner - Filter by owner address (optional)
 * @param {string} finder - Filter by finder address (optional)
 * @param {number} page - Page number (0-based)
 * @param {number} pageSize - Items per page (max 1000)
 * @param {string} orderBy - Field to order by ('lastUpdated', 'registeredAt', etc.)
 * @param {string} orderDirection - 'asc' or 'desc'
 * @returns {Promise<{items: Array, totalCount: number, hasMore: boolean, currentPage: number}>}
 */
export const getPaginatedItemsByStatus = async (
  status = null,
  owner = null,
  finder = null,
  page = 0, 
  pageSize = 20,
  orderBy = 'lastUpdated',
  orderDirection = 'desc'
) => {
  try {
    const skip = page * pageSize
    const first = Math.min(pageSize, 1000) // GraphQL limit
    
    const [itemsData, countData] = await Promise.all([
      client.request(GET_ITEMS_BY_STATUS_PAGINATED, {
        status,
        owner,
        finder,
        first,
        skip,
        orderBy,
        orderDirection
      }),
      client.request(GET_ITEMS_COUNT_BY_STATUS, { status, owner, finder })
    ])
    
    return {
      items: itemsData.Statuses,
      totalCount: countData.Statuses.length,
      hasMore: (skip + first) < countData.Statuses.length,
      currentPage: page,
      pageSize: first
    }
  } catch (error) {
    console.error('Error fetching paginated items:', error)
    throw error
  }
}

// Convenience functions for specific statuses with pagination and optional owner/finder filtering
export const getPaginatedLostItems = (owner = null, finder = null, page, pageSize, orderBy, orderDirection) => 
  getPaginatedItemsByStatus('lost', owner, finder, page, pageSize, orderBy, orderDirection)

export const getPaginatedFoundItems = (owner = null, finder = null, page, pageSize, orderBy, orderDirection) => 
  getPaginatedItemsByStatus('found', owner, finder, page, pageSize, orderBy, orderDirection)

export const getPaginatedReturnedItems = (owner = null, finder = null, page, pageSize, orderBy, orderDirection) => 
  getPaginatedItemsByStatus('returned', owner, finder, page, pageSize, orderBy, orderDirection)

// Get all items for a specific owner (any status)
export const getPaginatedItemsByOwner = (owner, page, pageSize, orderBy, orderDirection) => 
  getPaginatedItemsByStatus(null, owner, null, page, pageSize, orderBy, orderDirection)

// Get all items found by a specific finder (any status, but typically 'found')
export const getPaginatedItemsByFinder = (finder, page, pageSize, orderBy, orderDirection) => 
  getPaginatedItemsByStatus(null, null, finder, page, pageSize, orderBy, orderDirection)

// Legacy functions - remove after subgraph redeploy and migration to Status queries

// Get item status by checking if it appears in lost/found/returned events
export const getStatus = async (itemAddress) => {
  try {
    const [lostData, foundData, returnedData] = await Promise.all([
      client.request(`
        query GetItemLostStatus($item: Bytes!) {
          itemLosts(where: { item: $item }, first: 1) {
            id
            blockTimestamp
          }
        }
      `, { item: itemAddress.toLowerCase() }),
      client.request(`
        query GetItemFoundStatus($item: Bytes!) {
          itemFounds(where: { item: $item }, first: 1) {
            id
            blockTimestamp
          }
        }
      `, { item: itemAddress.toLowerCase() }),
      client.request(`
        query GetItemReturnedStatus($item: Bytes!) {
          itemReturneds(where: { item: $item }, first: 1) {
            id
            blockTimestamp
          }
        }
      `, { item: itemAddress.toLowerCase() })
    ])

    if (returnedData.itemReturneds.length > 0) {
      return 'returned'
    } else if (foundData.itemFounds.length > 0) {
      return 'found'
    } else if (lostData.itemLosts.length > 0) {
      return 'lost'
    } else {
      return 'registered'
    }
  } catch (error) {
    console.error('Error fetching item status:', error)
    return 'unknown'
  }
}

// Get specific item by hash
export const getItemByHash = async (hash) => {
  try {
    const data = await client.request(`
      query GetItemByHash($hash: Bytes!) {
        itemRegistereds(where: { hash: $hash }, first: 1) {
          id
          owner
          item
          hash
          blockNumber
          blockTimestamp
          transactionHash
        }
      }
    `, { hash: hash.toLowerCase() })
    
    return data.itemRegistereds[0] || null
  } catch (error) {
    console.error('Error fetching item by hash:', error)
    throw error
  }
}



// Get items near a location
export async function getItemsNearLocation(lat, lng, radiusKm, status = null, owner = null) {
  try {
    // First get all items with location data
    const variables = {
      first: 1000, // Get a large batch for client-side filtering
      skip: 0,
      ...(status && { status }),
      ...(owner && { owner }),
    };

    const data = await client.request(GET_ITEMS_BY_STATUS_PAGINATED, variables);
    const items = data.Statuses || [];

    // Filter by proximity on client-side
    return filterItemsByProximity(items, lat, lng, radiusKm);
  } catch (error) {
    console.error('Error fetching items near location:', error);
    return [];
  }
}

// Get lost items near a location
export async function getLostItemsNearLocation(lat, lng, radiusKm) {
  return getItemsNearLocation(lat, lng, radiusKm, 'lost');
}

// Get items found by user near a location  
export async function getFoundItemsNearLocation(lat, lng, radiusKm, finder = null) {
  try {
    const variables = {
      first: 1000,
      skip: 0,
      status: 'found',
      ...(finder && { finder }),
    };

    const data = await client.request(GET_ITEMS_BY_STATUS_PAGINATED, variables);
    const items = data.Statuses || [];

    return filterItemsByProximity(items, lat, lng, radiusKm);
  } catch (error) {
    console.error('Error fetching found items near location:', error);
    return [];
  }
}

// Parse coordinates from geoLocation string "lat, lng"
export function parseGeoLocation(geoLocation) {
  if (!geoLocation || typeof geoLocation !== 'string') {
    return { lat: null, lng: null };
  }

  const coords = geoLocation.split(',').map(coord => coord.trim());
  if (coords.length !== 2) {
    return { lat: null, lng: null };
  }

  const lat = parseFloat(coords[0]);
  const lng = parseFloat(coords[1]);

  if (isNaN(lat) || isNaN(lng)) {
    return { lat: null, lng: null };
  }

  return { lat, lng };
}
