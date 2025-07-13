import { useState, useEffect, useCallback } from 'react'
import { 
  getItemsNearLocation,
  getLostItemsNearLocation,
  getFoundItemsNearLocation
} from '../utils/graphql'
import {
  calculateDistance,
  getCurrentLocation
} from '../utils/geo'

/**
 * React hook for geo-filtered item loading
 * @param {number} centerLat - Center latitude for proximity filtering
 * @param {number} centerLng - Center longitude for proximity filtering  
 * @param {number} radiusKm - Search radius in kilometers
 * @param {string} status - Status filter ('lost', 'found', 'returned', 'registered', null for all)
 * @param {string} owner - Owner address filter (null for all)
 * @param {string} finder - Finder address filter (null for all)
 * @param {boolean} autoLoad - Whether to automatically load on mount/parameter change
 */
export const useGeoFilteredItems = (
  centerLat,
  centerLng,
  radiusKm = 10,
  status = null,
  owner = null,
  finder = null,
  autoLoad = true
) => {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const loadItems = useCallback(async () => {
    if (!centerLat || !centerLng) {
      setItems([])
      return
    }

    try {
      setLoading(true)
      setError(null)
      
      let results = []
      
      if (status === 'lost') {
        results = await getLostItemsNearLocation(centerLat, centerLng, radiusKm)
      } else if (status === 'found') {
        results = await getFoundItemsNearLocation(centerLat, centerLng, radiusKm, finder)
      } else {
        results = await getItemsNearLocation(centerLat, centerLng, radiusKm, status, owner)
      }

      // Add distance information to each item
      const itemsWithDistance = results.map(item => ({
        ...item,
        distance: calculateDistance(
          centerLat,
          centerLng,
          parseFloat(item.latitude),
          parseFloat(item.longitude)
        )
      }))

      // Sort by distance (closest first)
      itemsWithDistance.sort((a, b) => a.distance - b.distance)

      setItems(itemsWithDistance)
    } catch (err) {
      console.error('Error loading geo-filtered items:', err)
      setError(err.message || 'Failed to load items')
      setItems([])
    } finally {
      setLoading(false)
    }
  }, [centerLat, centerLng, radiusKm, status, owner, finder])

  // Auto-load when parameters change
  useEffect(() => {
    if (autoLoad) {
      loadItems()
    }
  }, [loadItems, autoLoad])

  // Manual refresh function
  const refresh = useCallback(() => {
    loadItems()
  }, [loadItems])

  return {
    items,
    loading,
    error,
    refresh,
    loadItems
  }
}

/**
 * Hook for getting lost items near a location
 */
export const useLostItemsNearLocation = (centerLat, centerLng, radiusKm = 10) => {
  return useGeoFilteredItems(centerLat, centerLng, radiusKm, 'lost')
}

/**
 * Hook for getting found items near a location
 */
export const useFoundItemsNearLocation = (centerLat, centerLng, radiusKm = 10, finder = null) => {
  return useGeoFilteredItems(centerLat, centerLng, radiusKm, 'found', null, finder)
}

/**
 * Hook for getting items near user's current location
 */
export const useItemsNearMe = (radiusKm = 10, status = null) => {
  const [location, setLocation] = useState(null)
  const [locationError, setLocationError] = useState(null)
  const [gettingLocation, setGettingLocation] = useState(false)

  const getCurrentLocationHandler = useCallback(async () => {
    try {
      setGettingLocation(true)
      setLocationError(null)
      const location = await getCurrentLocation()
      setLocation(location)
    } catch (error) {
      setLocationError(error.message)
    } finally {
      setGettingLocation(false)
    }
  }, [])

  const geoFilteredItems = useGeoFilteredItems(
    location?.lat,
    location?.lng,
    radiusKm,
    status,
    null,
    null,
    !!location // Only auto-load when we have location
  )

  useEffect(() => {
    getCurrentLocationHandler()
  }, [getCurrentLocationHandler])

  return {
    ...geoFilteredItems,
    location,
    locationError,
    gettingLocation,
    getCurrentLocation: getCurrentLocationHandler
  }
}
