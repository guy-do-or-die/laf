/**
 * Routes Constants - Simplified single source of truth
 * Eliminates duplication while maintaining backward compatibility
 */

/**
 * Base route paths for navigation
 */
export const ROUTES = {
  ROOT: '/',
  LANDING: '/landing',
  REGISTER: '/register',
  ITEMS: '/items',
  USER: '/user',
  HUNT: '/hunt'
};

/**
 * Route patterns for wouter Route components
 * Only includes routes that actually have parameters
 */
export const ROUTE_PATTERNS = {
  // Simple routes (reuse from ROUTES to avoid duplication)
  ROOT: ROUTES.ROOT,
  LANDING: ROUTES.LANDING,
  REGISTER: ROUTES.REGISTER,
  ITEMS: ROUTES.ITEMS,
  HUNT: ROUTES.HUNT,
  
  // Parameterized routes (these are the only ones that need separate patterns)
  LOST_ITEM: '/lost/:secretHash',
  FOUND_ITEM: '/found/:secretHash/:secret',
  USER: '/user/:address'
};

/**
 * Helper functions for building dynamic routes
 */
export const buildRoute = {
  user: (address) => `${ROUTES.USER}/${address}`,
  lostItem: (secretHash) => `/lost/${secretHash}`,
  foundItem: (secretHash, secret) => `/found/${secretHash}/${secret}`
};