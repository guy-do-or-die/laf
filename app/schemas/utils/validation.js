/**
 * Validation Utilities - Centralized validation helpers with consistent error formatting
 * Provides consistent interface for all validation operations across the application
 */

import { z } from 'zod';

/**
 * Safe parse with detailed error formatting
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {Object} - Validation result with formatted errors
 */
export function validateWithSchema(schema, data) {
    const result = schema.safeParse(data);
    
    if (result.success) {
        return {
            success: true,
            data: result.data,
            errors: null
        };
    }
    
    // Format Zod errors into a more usable structure
    const errors = {};
    result.error.errors.forEach(error => {
        const path = error.path.join('.');
        errors[path] = error.message;
    });
    
    return {
        success: false,
        data: null,
        errors,
        errorCount: Object.keys(errors).length
    };
}

/**
 * Validate and throw on error (for cases where you want to fail fast)
 * @param {z.ZodSchema} schema - Zod schema to validate against
 * @param {any} data - Data to validate
 * @returns {any} - Validated data
 * @throws {Error} - Validation error with formatted message
 */
export function validateOrThrow(schema, data) {
    const result = validateWithSchema(schema, data);
    
    if (!result.success) {
        const errorMessages = Object.values(result.errors).join(', ');
        throw new Error(`Validation failed: ${errorMessages}`);
    }
    
    return result.data;
}

/**
 * Create a validation function for a specific schema
 * @param {z.ZodSchema} schema - Zod schema to create validator for
 * @returns {Function} - Validation function
 */
export function createValidator(schema) {
    return (data) => validateWithSchema(schema, data);
}
