import { useState, useEffect, useCallback } from 'react'
import { 
  getPaginatedItemsByStatus,
  getPaginatedItemsByOwner,
  getPaginatedItemsByFinder,
  getItemsNearLocation
} from '../services/graphService'

// Import geo filtering utilities for future enhancements
import {
  calculateDistance,
  filterItemsByProximity
} from '../utils/geo'

/**
 * React hook for paginated item loading with status, owner, and finder filtering
 * @param {string} status - Status filter ('lost', 'found', 'returned', 'registered', null for all)
 * @param {string} owner - Owner address filter (null for all)
 * @param {string} finder - Finder address filter (null for all)
 * @param {number} initialPageSize - Items per page
 * @param {string} orderBy - Field to order by
 * @param {string} orderDirection - Sort direction
 */
export const usePaginatedItems = (
  status = null,
  owner = null,
  finder = null,
  initialPageSize = 20,
  orderBy = 'lastUpdated',
  orderDirection = 'desc'
) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [totalCount, setTotalCount] = useState(0)
  const [hasMore, setHasMore] = useState(false)
  const [pageSize, setPageSize] = useState(initialPageSize)

  const loadPage = useCallback(async (page = 0, reset = false) => {
    try {
      setLoading(true)
      setError(null)

      const result = await getPaginatedItemsByStatus(
        status,
        owner,
        finder,
        page,
        pageSize,
        orderBy,
        orderDirection
      )

      if (reset || page === 0) {
        setItems(result.items)
      } else {
        // Append for infinite scroll
        setItems(prev => [...prev, ...result.items])
      }

      setCurrentPage(result.currentPage)
      setTotalCount(result.totalCount)
      setHasMore(result.hasMore)
    } catch (err) {
      setError(err)
      console.error('Error loading paginated items:', err)
    } finally {
      setLoading(false)
    }
  }, [status, owner, finder, pageSize, orderBy, orderDirection])

  // Load first page on mount or when filters change
  useEffect(() => {
    loadPage(0, true)
  }, [loadPage])

  const loadNext = useCallback(() => {
    if (!loading && hasMore) {
      loadPage(currentPage + 1, false)
    }
  }, [loading, hasMore, currentPage, loadPage])

  const refresh = useCallback(() => {
    loadPage(0, true)
  }, [loadPage])

  const goToPage = useCallback((page) => {
    loadPage(page, true)
  }, [loadPage])

  const changePageSize = useCallback((newPageSize) => {
    setPageSize(newPageSize)
    setCurrentPage(0)
  }, [])

  return {
    // Data
    items,
    totalCount,
    currentPage,
    pageSize,
    hasMore,
    
    // State
    loading,
    error,
    
    // Actions
    loadNext,      // For infinite scroll
    refresh,       // Reload current data
    goToPage,      // Jump to specific page
    changePageSize, // Change items per page
    
    // Computed
    totalPages: Math.ceil(totalCount / pageSize),
    isEmpty: !loading && items.length === 0,
    isFirstPage: currentPage === 0,
    isLastPage: !hasMore
  }
}

/**
 * Convenience hooks for specific statuses with optional owner/finder filtering
 */
export const usePaginatedLostItems = (owner = null, finder = null, pageSize, orderBy, orderDirection) =>
  usePaginatedItems('lost', owner, finder, pageSize, orderBy, orderDirection)

export const usePaginatedFoundItems = (owner = null, finder = null, pageSize, orderBy, orderDirection) =>
  usePaginatedItems('found', owner, finder, pageSize, orderBy, orderDirection)

export const usePaginatedReturnedItems = (owner = null, finder = null, pageSize, orderBy, orderDirection) =>
  usePaginatedItems('returned', owner, finder, pageSize, orderBy, orderDirection)

/**
 * Hook to get items owned by a specific user (all statuses)
 */
export const usePaginatedItemsByOwner = (owner, pageSize, orderBy, orderDirection) =>
  usePaginatedItems(null, owner, null, pageSize, orderBy, orderDirection)

/**
 * Hook to get items found by a specific finder (all statuses)
 */
export const usePaginatedItemsByFinder = (finder, pageSize, orderBy, orderDirection) =>
  usePaginatedItems(null, null, finder, pageSize, orderBy, orderDirection)
