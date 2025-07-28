/**
 * Validation Service - Clean interface for domain validation using organized Zod schemas
 * Following SRP: Only handles validation operations, imports from schema architecture
 */

// Import schemas from organized schema architecture
import { ItemRegistrationSchema, FoundItemSchema, LostItemSchema, ReturnedItemSchema } from '@/schemas/domain/item.js';
import { MessageSchema } from '@/schemas/domain/message.js';
import { CoordinatesSchema } from '@/schemas/base/primitives.js';
import { validateWithSchema } from '@/schemas/utils/validation.js';

/**
 * Validate item registration data
 * @param {Object} itemData - Item data to validate
 * @returns {Object} - Validation result
 */
export function validateItemRegistration(itemData) {
    return validateWithSchema(ItemRegistrationSchema, itemData);
}

/**
 * Validate found item data
 * @param {Object} foundData - Found item data to validate
 * @returns {Object} - Validation result
 */
export function validateFoundItem(foundData) {
    return validateWithSchema(FoundItemSchema, foundData);
}

/**
 * Validate message data
 * @param {Object} messageData - Message data to validate
 * @returns {Object} - Validation result
 */
export function validateMessage(messageData) {
    return validateWithSchema(MessageSchema, messageData);
}

/**
 * Validate lost item data
 * @param {Object} lostData - Lost item data to validate
 * @returns {Object} - Validation result
 */
export function validateLostItem(lostData) {
    return validateWithSchema(LostItemSchema, lostData);
}

/**
 * Validate returned item data
 * @param {Object} returnedData - Returned item data to validate
 * @returns {Object} - Validation result
 */
export function validateReturnedItem(returnedData) {
    return validateWithSchema(ReturnedItemSchema, returnedData);
}

/**
 * Validate coordinates
 * @param {Object} coordinates - Coordinates to validate
 * @returns {Object} - Validation result
 */
export function validateCoordinates(coordinates) {
    return validateWithSchema(CoordinatesSchema, coordinates);
}
