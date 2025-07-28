/**
 * Item Domain Schemas - Validation schemas for item-related operations
 * Composes base primitive schemas into domain-specific validation rules
 */

import { z } from 'zod';
import { 
    SecretHashSchema, 
    SignatureSchema, 
    EthereumAddressSchema, 
    CoordinatesSchema, 
    CommentSchema, 
    RewardAmountSchema 
} from '../base/primitives.js';

/**
 * Item registration schema
 */
export const ItemRegistrationSchema = z.object({
    secretHash: SecretHashSchema,
    comment: CommentSchema,
    reward: RewardAmountSchema,
    location: CoordinatesSchema.optional()
});

/**
 * Found item schema
 */
export const FoundItemSchema = z.object({
    secretHash: SecretHashSchema,
    signature: SignatureSchema,
    finderAddress: EthereumAddressSchema,
    location: CoordinatesSchema.optional()
});

/**
 * Lost item report schema
 */
export const LostItemSchema = z.object({
    secretHash: SecretHashSchema,
    signature: SignatureSchema,
    ownerAddress: EthereumAddressSchema,
    location: CoordinatesSchema.optional()
});

/**
 * Returned item schema
 */
export const ReturnedItemSchema = z.object({
    secretHash: SecretHashSchema,
    signature: SignatureSchema,
    finderAddresses: EthereumAddressSchema,
    ownerAddress: EthereumAddressSchema,
});


