/**
 * Base Primitive Schemas - Fundamental validation building blocks
 * These schemas represent the most basic data types used across the application
 */

import { z } from 'zod';

/**
 * Ethereum address validation
 */
export const EthereumAddressSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid Ethereum address');

/**
 * Secret hash validation (40 character hex string with 0x prefix)
 */
export const SecretHashSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]{40}$/, 'Must be a valid 40-character hex string with 0x prefix');

/**
 * Signature validation (hex string with 0x prefix, minimum length)
 */
export const SignatureSchema = z
    .string()
    .regex(/^0x[a-fA-F0-9]+$/, 'Must be a valid hex signature')
    .min(132, 'Signature must be at least 132 characters');

/**
 * Coordinate validation schemas
 */
export const LatitudeSchema = z
    .number()
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90');

export const LongitudeSchema = z
    .number()
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180');

export const CoordinatesSchema = z.object({
    latitude: LatitudeSchema,
    longitude: LongitudeSchema
});

/**
 * Common text validation schemas
 */
export const NonEmptyStringSchema = z.string().min(1, 'This field is required');

export const CommentSchema = z
    .string()
    .min(1, 'Comment is required')
    .max(500, 'Comment must be no more than 500 characters');

export const MessageContentSchema = z
    .string()
    .min(1, 'Message content is required')
    .max(1000, 'Message too long');

/**
 * Numeric validation schemas
 */
export const PositiveNumberSchema = z
    .number()
    .positive('Must be greater than 0');

export const RewardAmountSchema = PositiveNumberSchema.refine(
    (val) => val > 0,
    'Reward must be greater than 0'
);
