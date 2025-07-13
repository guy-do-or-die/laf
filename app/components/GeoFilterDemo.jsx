import React, { useState } from 'react'
import { 
  useLostItemsNearLocation, 
  useItemsNearMe,
  useGeoFilteredItems 
} from '../hooks/useGeoFilteredItems'
import { parseGeoLocation } from '../utils/graphql'
import { calculateDistance, formatCoordinates, sortItemsByDistance } from '../utils/geo'

/**
 * Demo component showing geo filtering capabilities
 */
export default function GeoFilterDemo() {
  const [location, setLocation] = useState({ lat: 40.181400, lng: 44.510200 }) // Default to example coordinates
  const [radius, setRadius] = useState(10)
  const [status, setStatus] = useState('lost')

  // Hook for items near specific location
  const { items, loading, error, refresh } = useGeoFilteredItems(
    location.lat,
    location.lng,
    radius,
    status
  )

  // Hook for items near user's current location
  const {
    items: nearMeItems,
    loading: nearMeLoading,
    error: nearMeError,
    location: userLocation,
    locationError,
    gettingLocation,
    getCurrentLocation
  } = useItemsNearMe(radius, status)

  const handleLocationChange = (field, value) => {
    setLocation(prev => ({
      ...prev,
      [field]: parseFloat(value) || 0
    }))
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Geo Filtering Demo</h1>
      
      {/* Controls */}
      <div className="bg-gray-100 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Search Parameters</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Latitude</label>
            <input
              type="number"
              step="any"
              value={location.lat}
              onChange={(e) => handleLocationChange('lat', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="40.181400"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Longitude</label>
            <input
              type="number"
              step="any"
              value={location.lng}
              onChange={(e) => handleLocationChange('lng', e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              placeholder="44.510200"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Radius (km)</label>
            <input
              type="number"
              min="1"
              max="100"
              value={radius}
              onChange={(e) => setRadius(parseInt(e.target.value) || 10)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
              <option value="returned">Returned</option>
              <option value="registered">Registered</option>
            </select>
          </div>
        </div>
        
        <button
          onClick={refresh}
          disabled={loading}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
        >
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {/* User Location Section */}
      <div className="bg-blue-50 p-4 rounded-lg mb-6">
        <h2 className="text-xl font-semibold mb-4">Items Near My Location</h2>
        
        <div className="flex items-center gap-4 mb-4">
          <button
            onClick={getCurrentLocation}
            disabled={gettingLocation}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50"
          >
            {gettingLocation ? 'Getting Location...' : 'Use My Location'}
          </button>
          
          {userLocation && (
            <span className="text-sm text-gray-600">
              📍 {userLocation.lat.toFixed(6)}, {userLocation.lng.toFixed(6)}
            </span>
          )}
          
          {locationError && (
            <span className="text-sm text-red-600">
              ❌ {locationError}
            </span>
          )}
        </div>

        {nearMeLoading && <p className="text-gray-600">Loading items near you...</p>}
        {nearMeError && <p className="text-red-600">Error: {nearMeError}</p>}
        
        {nearMeItems.length > 0 && (
          <div className="space-y-2">
            <h3 className="font-medium">Found {nearMeItems.length} items within {radius}km</h3>
            <div className="max-h-40 overflow-y-auto">
              {nearMeItems.slice(0, 5).map((item, index) => (
                <div key={item.id} className="text-sm p-2 bg-white rounded border">
                  <span className="font-medium">{item.status}</span> item
                  {item.distance && (
                    <span className="ml-2 text-gray-500">
                      ({item.distance.toFixed(2)}km away)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="bg-white border rounded-lg p-4">
        <h2 className="text-xl font-semibold mb-4">
          Search Results
          {items.length > 0 && (
            <span className="ml-2 text-sm font-normal text-gray-600">
              ({items.length} items found)
            </span>
          )}
        </h2>
        
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-600">Searching for items...</p>
          </div>
        )}
        
        {error && (
          <div className="text-center py-8">
            <p className="text-red-600">Error: {error}</p>
            <button
              onClick={refresh}
              className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Try Again
            </button>
          </div>
        )}
        
        {!loading && !error && items.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <p>No items found within {radius}km of the specified location.</p>
            <p className="text-sm mt-2">Try increasing the search radius or changing the location.</p>
          </div>
        )}
        
        {!loading && items.length > 0 && (
          <div className="space-y-4">
            {items.map((item) => {
              const coords = parseGeoLocation(item.geoLocation)
              return (
                <div key={item.id} className="border rounded-lg p-4 hover:bg-gray-50">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className={`inline-block px-2 py-1 rounded text-sm font-medium ${
                        item.status === 'lost' ? 'bg-red-100 text-red-800' :
                        item.status === 'found' ? 'bg-green-100 text-green-800' :
                        item.status === 'returned' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {item.status.toUpperCase()}
                      </span>
                      {item.distance && (
                        <span className="ml-2 text-sm text-gray-500">
                          📍 {item.distance.toFixed(2)}km away
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500">
                      {new Date(item.lastUpdated * 1000).toLocaleDateString()}
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 space-y-1">
                    <p><strong>Owner:</strong> {item.owner}</p>
                    {item.finder && <p><strong>Finder:</strong> {item.finder}</p>}
                    {coords.lat && coords.lng && (
                      <p><strong>Location:</strong> {coords.lat}, {coords.lng}</p>
                    )}
                    <p><strong>Item ID:</strong> {item.item}</p>
                  </div>
                </div>
              )
            })}
          </div>
        )}
      </div>
    </div>
  )
}
