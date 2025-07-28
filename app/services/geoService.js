/**
 * Geolocation Service - Pure business logic for location handling and validation
 * Following SRP: Only handles geolocation operations, no UI or React dependencies
 */

import Geohash from 'latlon-geohash';

/**
 * Geolocation error types enum
 */
export const GEOLOCATION_ERRORS = {
    PERMISSION_DENIED: 'permission_denied',
    POSITION_UNAVAILABLE: 'position_unavailable',
    TIMEOUT: 'timeout',
    NOT_SUPPORTED: 'not_supported',
    INVALID_COORDINATES: 'invalid_coordinates'
};

/**
 * Default geolocation options
 */
export const DEFAULT_GEOLOCATION_OPTIONS = {
    enableHighAccuracy: true,
    timeout: 10000, // 10 seconds
    maximumAge: 300000 // 5 minutes
};

/**
 * Check if geolocation is supported by the browser
 * @returns {boolean} - True if geolocation is supported
 */
export function isGeolocationSupported() {
    return 'geolocation' in navigator;
}

/**
 * Validate latitude coordinate
 * @param {number} latitude - Latitude value to validate
 * @returns {boolean} - True if latitude is valid
 */
export function isValidLatitude(latitude) {
    return typeof latitude === 'number' && 
           latitude >= -90 && 
           latitude <= 90 && 
           !isNaN(latitude);
}

/**
 * Validate longitude coordinate
 * @param {number} longitude - Longitude value to validate
 * @returns {boolean} - True if longitude is valid
 */
export function isValidLongitude(longitude) {
    return typeof longitude === 'number' && 
           longitude >= -180 && 
           longitude <= 180 && 
           !isNaN(longitude);
}

/**
 * Validate coordinate pair
 * @param {Object} coordinates - Coordinates object with lat/lng
 * @returns {Object} - Validation result
 */
export function validateCoordinates(coordinates) {
    const errors = [];
    
    if (!coordinates) {
        errors.push('Coordinates are required');
        return { isValid: false, errors };
    }
    
    if (!isValidLatitude(coordinates.latitude)) {
        errors.push('Invalid latitude: must be between -90 and 90');
    }
    
    if (!isValidLongitude(coordinates.longitude)) {
        errors.push('Invalid longitude: must be between -180 and 180');
    }
    
    return {
        isValid: errors.length === 0,
        errors
    };
}

/**
 * Format coordinates for display
 * @param {Object} coordinates - Coordinates object with lat/lng
 * @param {number} precision - Number of decimal places (default: 6)
 * @returns {string} - Formatted coordinate string
 */
export function formatCoordinates(coordinates, precision = 6) {
    if (!coordinates || !isValidLatitude(coordinates.latitude) || !isValidLongitude(coordinates.longitude)) {
        return 'Invalid coordinates';
    }
    
    const lat = coordinates.latitude.toFixed(precision);
    const lng = coordinates.longitude.toFixed(precision);
    
    return `${lat}, ${lng}`;
}

/**
 * Calculate distance between two coordinate points using Haversine formula
 * @param {Object} coord1 - First coordinate point
 * @param {Object} coord2 - Second coordinate point
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(coord1, coord2) {
    const validation1 = validateCoordinates(coord1);
    const validation2 = validateCoordinates(coord2);
    
    if (!validation1.isValid || !validation2.isValid) {
        throw new Error('Invalid coordinates provided for distance calculation');
    }
    
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(coord2.latitude - coord1.latitude);
    const dLng = toRadians(coord2.longitude - coord1.longitude);
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(toRadians(coord1.latitude)) * Math.cos(toRadians(coord2.latitude)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
}

/**
 * Convert degrees to radians
 * @param {number} degrees - Degrees value
 * @returns {number} - Radians value
 */
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

/**
 * Get current position using browser geolocation API
 * @param {Object} options - Geolocation options
 * @returns {Promise<Object>} - Promise resolving to position data
 */
export function getCurrentPosition(options = DEFAULT_GEOLOCATION_OPTIONS) {
    return new Promise((resolve, reject) => {
        if (!isGeolocationSupported()) {
            reject({
                type: GEOLOCATION_ERRORS.NOT_SUPPORTED,
                message: 'Geolocation is not supported by this browser'
            });
            return;
        }
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const coordinates = {
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude,
                    accuracy: position.coords.accuracy,
                    timestamp: position.timestamp
                };
                
                const validation = validateCoordinates(coordinates);
                if (!validation.isValid) {
                    reject({
                        type: GEOLOCATION_ERRORS.INVALID_COORDINATES,
                        message: validation.errors.join(', ')
                    });
                    return;
                }
                
                resolve(coordinates);
            },
            (error) => {
                let errorType;
                switch (error.code) {
                    case error.PERMISSION_DENIED:
                        errorType = GEOLOCATION_ERRORS.PERMISSION_DENIED;
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorType = GEOLOCATION_ERRORS.POSITION_UNAVAILABLE;
                        break;
                    case error.TIMEOUT:
                        errorType = GEOLOCATION_ERRORS.TIMEOUT;
                        break;
                    default:
                        errorType = GEOLOCATION_ERRORS.POSITION_UNAVAILABLE;
                }
                
                reject({
                    type: errorType,
                    message: error.message,
                    code: error.code
                });
            },
            options
        );
    });
}

/**
 * Create location string from coordinates and optional address
 * @param {Object} coordinates - Coordinates object
 * @param {string} address - Optional human-readable address
 * @returns {string} - Location string
 */
export function createLocationString(coordinates, address = null) {
    if (!coordinates) return '';
    
    const coordString = formatCoordinates(coordinates);
    
    if (address) {
        return `${address} (${coordString})`;
    }
    
    return coordString;
}

/**
 * Parse location string to extract coordinates
 * @param {string} locationString - Location string to parse
 * @returns {Object|null} - Parsed coordinates or null if invalid
 */
export function parseLocationString(locationString) {
    if (!locationString || typeof locationString !== 'string') {
        return null;
    }
    
    // Try to extract coordinates from string like "address (lat, lng)" or "lat, lng"
    const coordRegex = /(-?\d+\.?\d*),\s*(-?\d+\.?\d*)/;
    const matches = locationString.match(coordRegex);
    
    if (matches) {
        const coordinates = {
            latitude: parseFloat(matches[1]),
            longitude: parseFloat(matches[2])
        };
        
        const validation = validateCoordinates(coordinates);
        if (validation.isValid) {
            return coordinates;
        }
    }
    
    return null;
}

/**
 * Check if location is within a specific radius of a center point
 * @param {Object} location - Location to check
 * @param {Object} center - Center point
 * @param {number} radiusKm - Radius in kilometers
 * @returns {boolean} - True if location is within radius
 */
export function isWithinRadius(location, center, radiusKm) {
    try {
        const distance = calculateDistance(location, center);
        return distance <= radiusKm;
    } catch (error) {
        return false;
    }
}

/**
 * Encode coordinates to geohash
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @param {number} precision - Geohash precision (default: 12 for ~3.7m accuracy)
 * @returns {string} - Geohash string
 */
export function encodeGeohash(latitude, longitude, precision = 12) {
    const validation = validateCoordinates({ latitude, longitude });
    if (!validation.isValid) {
        throw new Error(`Invalid coordinates for geohash encoding: ${validation.errors.join(', ')}`);
    }
    
    return Geohash.encode(latitude, longitude, precision);
}

/**
 * Decode geohash to coordinates
 * @param {string} geohash - Geohash string to decode
 * @returns {Object} - Coordinates object with latitude and longitude
 */
export function decodeGeohash(geohash) {
    if (!geohash || typeof geohash !== 'string') {
        throw new Error('Invalid geohash: must be a non-empty string');
    }
    
    try {
        const decoded = Geohash.decode(geohash);
        return {
            latitude: decoded.lat,
            longitude: decoded.lon
        };
    } catch (error) {
        throw new Error(`Failed to decode geohash '${geohash}': ${error.message}`);
    }
}

/**
 * Validate geohash string
 * @param {string} geohash - Geohash string to validate
 * @returns {boolean} - True if geohash is valid
 */
export function isValidGeohash(geohash) {
    try {
        decodeGeohash(geohash);
        return true;
    } catch (error) {
        return false;
    }
}

/**
 * Search for address suggestions using OpenStreetMap Nominatim
 * @param {string} query - Search query string
 * @param {number} limit - Maximum number of results (default: 5)
 * @returns {Promise<Array>} - Promise resolving to array of address suggestions
 */
export async function searchAddressSuggestions(query, limit = 5) {
    if (!query || typeof query !== 'string' || query.trim().length < 2) {
        return [];
    }
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query.trim())}&limit=${limit}&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'LAF-App/1.0'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data || data.length === 0) {
            return [];
        }
        
        return data.map(result => {
            const coordinates = {
                latitude: parseFloat(result.lat),
                longitude: parseFloat(result.lon)
            };
            
            const validation = validateCoordinates(coordinates);
            if (!validation.isValid) {
                return null;
            }
            
            return {
                coordinates,
                displayName: result.display_name,
                type: result.type,
                importance: result.importance || 0,
                boundingBox: result.boundingbox ? {
                    south: parseFloat(result.boundingbox[0]),
                    north: parseFloat(result.boundingbox[1]),
                    west: parseFloat(result.boundingbox[2]),
                    east: parseFloat(result.boundingbox[3])
                } : null
            };
        }).filter(Boolean); // Remove null results
    } catch (error) {
        console.warn('Address search failed:', error);
        return [];
    }
}

/**
 * Forward geocoding function using OpenStreetMap Nominatim
 * @param {string} address - Address string to geocode
 * @returns {Promise<Object>} - Promise resolving to coordinates object
 */
export async function forwardGeocode(address) {
    const suggestions = await searchAddressSuggestions(address, 1);
    
    if (suggestions.length === 0) {
        throw new Error('Address not found');
    }
    
    return suggestions[0];
}

/**
 * Reverse geocoding function using OpenStreetMap Nominatim
 * @param {number} latitude - Latitude coordinate
 * @param {number} longitude - Longitude coordinate
 * @returns {Promise<string>} - Promise resolving to human-readable address
 */
export async function reverseGeocode(latitude, longitude) {
    const validation = validateCoordinates({ latitude, longitude });
    if (!validation.isValid) {
        throw new Error(`Invalid coordinates for reverse geocoding: ${validation.errors.join(', ')}`);
    }
    
    try {
        const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}&zoom=18&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'LAF-App/1.0'
                }
            }
        );
        
        if (!response.ok) {
            throw new Error(`Geocoding API error: ${response.status}`);
        }
        
        const data = await response.json();
        return data.display_name || formatCoordinates({ latitude, longitude });
    } catch (error) {
        console.warn('Reverse geocoding failed:', error);
        // Fallback to coordinate display
        return formatCoordinates({ latitude, longitude });
    }
}

/**
 * Filter items by proximity to a center point
 * @param {Array} items - Array of items to filter
 * @param {number} centerLat - Center latitude
 * @param {number} centerLng - Center longitude
 * @param {number} radiusKm - Search radius in kilometers
 * @returns {Array} - Filtered array of items within radius
 */
export function filterItemsByProximity(items, centerLat, centerLng, radiusKm) {
    if (!items || !Array.isArray(items)) {
        return [];
    }
    
    const center = { latitude: centerLat, longitude: centerLng };
    const centerValidation = validateCoordinates(center);
    
    if (!centerValidation.isValid) {
        console.warn('Invalid center coordinates for proximity filtering:', centerValidation.errors);
        return items; // Return all items if center is invalid
    }
    
    return items.filter(item => {
        // Try to extract coordinates from item
        let itemLocation = null;
        
        // Check various possible location formats in the item
        if (item.geo) {
            // Parse geo string format like "lat,lng" or "lat, lng"
            const geoStr = item.geo.toString().trim();
            const coords = geoStr.split(',').map(coord => parseFloat(coord.trim()));
            
            if (coords.length === 2 && !isNaN(coords[0]) && !isNaN(coords[1])) {
                itemLocation = {
                    latitude: coords[0],
                    longitude: coords[1]
                };
            }
        } else if (item.latitude && item.longitude) {
            // Direct latitude/longitude properties
            itemLocation = {
                latitude: parseFloat(item.latitude),
                longitude: parseFloat(item.longitude)
            };
        } else if (item.lat && item.lng) {
            // Alternative lat/lng properties
            itemLocation = {
                latitude: parseFloat(item.lat),
                longitude: parseFloat(item.lng)
            };
        }
        
        // If no valid location found, exclude from results
        if (!itemLocation) {
            return false;
        }
        
        // Validate item coordinates
        const itemValidation = validateCoordinates(itemLocation);
        if (!itemValidation.isValid) {
            return false;
        }
        
        // Check if item is within radius
        return isWithinRadius(itemLocation, center, radiusKm);
    });
}
