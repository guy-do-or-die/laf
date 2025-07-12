import { GraphQLClient } from 'graphql-request'


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

// Get item status by checking if it appears in lost/found/returned events
export const getItemStatus = async (itemAddress) => {
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
