/**
 * Geolocation Service - Pure business logic for location handling and validation
 * Following SRP: Only handles geolocation operations, no UI or React dependencies
 */

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
