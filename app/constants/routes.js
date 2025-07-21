/**
 * Routes Constants - Centralized route definitions for consistent routing
 * No abstraction layer - just constants for consistency across the app
 */

/**
 * Application route paths
 */
export const ROUTES = {
    HOME: '/',
    REGISTER: '/register',
    LOST: '/lost',
    FOUND: '/found',
    ITEMS: '/items'
};

/**
 * Route patterns with parameters (for wouter Route components)
 */
export const ROUTE_PATTERNS = {
    HOME: '/',
    REGISTER: '/register',
    LOST_ITEM: '/lost/:secretHash',
    FOUND_ITEM: '/found/:secretHash/:secret/:ownerSignature',
    ITEMS: '/items'
};