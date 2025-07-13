/**
 * Geo utilities module for location-based calculations
 * Contains pure functions for distance calculations, coordinate parsing, and geo filtering
 */

/**
 * Calculate distance between two points using Haversine formula
 * @param {number} lat1 - First point latitude
 * @param {number} lng1 - First point longitude  
 * @param {number} lat2 - Second point latitude
 * @param {number} lng2 - Second point longitude
 * @returns {number} Distance in kilometers
 */
export function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

/**
 * Convert degrees to radians
 * @param {number} degrees 
 * @returns {number} Radians
 */
function toRad(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * Filter items by proximity to a given location
 * @param {Array} items - Array of items with latitude/longitude
 * @param {number} centerLat - Center latitude
 * @param {number} centerLng - Center longitude
 * @param {number} radiusKm - Search radius in kilometers
 * @returns {Array} Filtered items within radius
 */
export function filterItemsByProximity(items, centerLat, centerLng, radiusKm) {
  return items.filter(item => {
    if (!item.latitude || !item.longitude) return false;
    const distance = calculateDistance(
      centerLat,
      centerLng,
      parseFloat(item.latitude),
      parseFloat(item.longitude)
    );
    return distance <= radiusKm;
  });
}

/**
 * Parse coordinates from geoLocation string "lat, lng"
 * @param {string} geoLocation - Location string in format "lat, lng"
 * @returns {Object} Object with lat and lng properties
 */
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

/**
 * Format coordinates as a readable string
 * @param {number} lat - Latitude
 * @param {number} lng - Longitude
 * @param {number} precision - Decimal places (default: 6)
 * @returns {string} Formatted coordinate string
 */
export function formatCoordinates(lat, lng, precision = 6) {
  if (!lat || !lng) return 'Unknown location';
  return `${lat.toFixed(precision)}, ${lng.toFixed(precision)}`;
}



/**
 * Get current user location using browser geolocation API
 * @param {Object} options - Geolocation options
 * @returns {Promise} Promise resolving to {lat, lng} or rejecting with error
 */
export function getCurrentLocation(options = {}) {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported by this browser'));
      return;
    }

    const defaultOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000 // 5 minutes
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        reject(error);
      },
      { ...defaultOptions, ...options }
    );
  });
}

/**
 * Calculate bounding box for a center point and radius
 * @param {number} lat - Center latitude
 * @param {number} lng - Center longitude
 * @param {number} radiusKm - Radius in kilometers
 * @returns {Object} Bounding box with north, south, east, west coordinates
 */
export function getBoundingBox(lat, lng, radiusKm) {
  const R = 6371; // Earth's radius in kilometers
  const latRad = toRad(lat);
  const deltaLat = radiusKm / R;
  const deltaLng = Math.asin(Math.sin(deltaLat) / Math.cos(latRad));

  return {
    north: lat + deltaLat * (180 / Math.PI),
    south: lat - deltaLat * (180 / Math.PI),
    east: lng + deltaLng * (180 / Math.PI),
    west: lng - deltaLng * (180 / Math.PI)
  };
}

/**
 * Check if a point is within a bounding box
 * @param {number} lat - Point latitude
 * @param {number} lng - Point longitude
 * @param {Object} bbox - Bounding box {north, south, east, west}
 * @returns {boolean} True if point is within bounding box
 */
export function isWithinBoundingBox(lat, lng, bbox) {
  return lat >= bbox.south && lat <= bbox.north && 
         lng >= bbox.west && lng <= bbox.east;
}

/**
 * Sort items by distance from a center point
 * @param {Array} items - Items with latitude/longitude
 * @param {number} centerLat - Center latitude
 * @param {number} centerLng - Center longitude
 * @returns {Array} Items sorted by distance (closest first)
 */
export function sortItemsByDistance(items, centerLat, centerLng) {
  return items
    .map(item => ({
      ...item,
      distance: calculateDistance(
        centerLat,
        centerLng,
        parseFloat(item.latitude),
        parseFloat(item.longitude)
      )
    }))
    .sort((a, b) => a.distance - b.distance);
}
