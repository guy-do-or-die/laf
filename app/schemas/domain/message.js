/**
 * Message Domain Schemas - Validation schemas for messaging operations
 * Composes base primitive schemas into messaging-specific validation rules
 */

import { z } from 'zod';
import { 
    EthereumAddressSchema, 
    MessageContentSchema 
} from '../base/primitives.js';

/**
 * Message schema
 */
export const MessageSchema = z.object({
    content: MessageContentSchema,
    recipientAddress: EthereumAddressSchema
});

/**
 * Message thread schema
 */
export const MessageThreadSchema = z.object({
    participants: z.array(EthereumAddressSchema).min(2, 'At least 2 participants required'),
    topic: z.string().optional()
});
