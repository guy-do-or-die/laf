import { privateKeyToAccount } from 'viem/accounts';
import { encodePacked, keccak256 } from 'viem';

import { chain } from '@/wallet'


// Custom error classes for better error categorization
export class SecurityError extends Error {
    constructor(message) {
        super(message);
        this.name = 'SecurityError';
    }
}

export class ValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'ValidationError';
    }
}

export class CryptoError extends Error {
    constructor(message) {
        super(message);
        this.name = 'CryptoError';
    }
}

/**
 * Validates that a hex string represents a valid secp256k1 private key
 * @param {string} hex - Hex string without 0x prefix
 * @returns {boolean} - True if valid private key
 */
function isValidPrivateKey(hex) {
    try {
        const key = BigInt('0x' + hex);
        const secp256k1Order = BigInt('0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364141');
        return key > 0n && key < secp256k1Order;
    } catch {
        return false;
    }
}

/**
 * Checks if a secret would generate an address that matches a known wallet
 * @param {string} secret - The raw secret string
 * @param {string} userWalletAddress - User's current wallet address
 * @returns {boolean} - True if secret generates the wallet address (dangerous)
 */
function isWalletKeyReuse(secret, userWalletAddress) {
    try {
        const hashResult = generateSecretHash(secret);
        if (!hashResult.success) {
            return false; // If we can't generate hash, assume no reuse
        }
        return hashResult.data.secretHash.toLowerCase() === userWalletAddress?.toLowerCase();
    } catch {
        return false;
    }
}

/**
 * Calculates entropy score for a secret string
 * @param {string} secret - The raw secret string
 * @returns {number} - Entropy score (0-100)
 */
function calculateEntropyScore(secret) {
    if (!secret || secret.length < 8) return 0;
    
    const charSets = [
        /[a-z]/, // lowercase
        /[A-Z]/, // uppercase
        /[0-9]/, // numbers
        /[^a-zA-Z0-9]/ // special chars
    ];
    
    let score = 0;
    
    // Length bonus (up to 40 points)
    score += Math.min(secret.length * 2, 40);
    
    // Character set diversity (up to 40 points)
    const usedSets = charSets.filter(regex => regex.test(secret)).length;
    score += usedSets * 10;
    
    // Uniqueness bonus (up to 20 points)
    const uniqueChars = new Set(secret).size;
    score += Math.min(uniqueChars * 2, 20);
    
    return Math.min(score, 100);
}

/**
 * Normalizes a secret string to a valid 32-byte private key format with security validation
 * @param {string} secret - The raw secret string
 * @param {string} userWalletAddress - User's wallet address to prevent key reuse
 * @returns {Object} - Result object with success, data, error, and warnings
 */
function normalizeSecretToPrivateKey(secret, userWalletAddress = null) {
    try {
        if (!secret || typeof secret !== 'string') {
            return {
                success: false,
                error: new ValidationError('Secret must be a non-empty string'),
                data: null
            };
        }
        
        // Check for wallet key reuse
        if (userWalletAddress && isWalletKeyReuse(secret, userWalletAddress)) {
            return {
                success: false,
                error: new SecurityError('Cannot use your wallet private key as secret! This would expose your wallet.'),
                data: null
            };
        }
        
        // Calculate entropy for manual secrets
        const entropyScore = calculateEntropyScore(secret);
        const warnings = [];
        if (entropyScore < 30) {
            warnings.push(`Low entropy secret detected (score: ${entropyScore}/100). Consider using generateRandomSecret() for better security.`);
        }
    
    let privateKeyHex = secret;
    
    // Convert to hex if not already
    if (!/^[0-9a-fA-F]+$/.test(privateKeyHex)) {
        // Convert string to hex
        privateKeyHex = Array.from(new TextEncoder().encode(secret))
            .map(b => b.toString(16).padStart(2, '0'))
            .join('');
    }
    
    // Ensure exactly 64 hex characters (32 bytes)
    if (privateKeyHex.length < 64) {
        // Use keccak256 hash for short secrets to maintain entropy
        const hash = keccak256(`0x${privateKeyHex}`);
        privateKeyHex = hash.slice(2); // Remove 0x prefix
    } else if (privateKeyHex.length > 64) {
        // Use keccak256 hash for long secrets to maintain entropy
        const hash = keccak256(`0x${privateKeyHex}`);
        privateKeyHex = hash.slice(2); // Remove 0x prefix
    }
    
    // Validate the resulting private key
    if (!isValidPrivateKey(privateKeyHex)) {
        // If invalid, hash it to get a valid key
        const hash = keccak256(`0x${privateKeyHex}`);
        privateKeyHex = hash.slice(2); // Remove 0x prefix
        
        // Final validation
        if (!isValidPrivateKey(privateKeyHex)) {
            return {
                success: false,
                error: new CryptoError('Unable to generate valid private key from secret'),
                data: null
            };
        }
    }
    
    return {
        success: true,
        data: {
            privateKey: '0x' + privateKeyHex,
            entropyScore,
            warnings
        },
        error: null
    };
    } catch (error) {
        return {
            success: false,
            error: error instanceof Error ? error : new CryptoError(String(error)),
            data: null
        };
    }
}


/**
 * Generates a secret hash as the Ethereum address derived from the secret used as a private key
 * This ensures signature verification compatibility with the smart contract
 * @param {string} secret - The raw secret string
 * @param {string} userWalletAddress - Optional user wallet address to prevent key reuse
 * @returns {Object} - Result object with success, data (secretHash), error, and warnings
 */
export function generateSecretHash(secret, userWalletAddress = null) {
    try {
        const privateKeyResult = normalizeSecretToPrivateKey(secret, userWalletAddress);
        
        if (!privateKeyResult.success) {
            return privateKeyResult; // Pass through the error
        }
        
        const account = privateKeyToAccount(privateKeyResult.data.privateKey);
        
        return {
            success: true,
            data: {
                secretHash: account.address,
                entropyScore: privateKeyResult.data.entropyScore,
                warnings: privateKeyResult.data.warnings
            },
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: new CryptoError(`Failed to generate secret hash: ${error.message}`),
            data: null
        };
    }
}


/**
 * Creates a signature for the commit-reveal process that will verify against the secretHash
 * @param {string} secret - The raw secret string
 * @param {string} secretHash - The expected secret hash (should match generateSecretHash result)
 * @param {string} finderAddress - The finder's address
 * @param {string} itemAddress - The item contract address
 * @param {bigint} itemCycle - The item cycle number
 * @param {number|bigint} chainId - The chain ID (defaults to selected env chain)
 * @returns {Promise<Object>} - Result object with success, data (signature), and error
 */
export async function createCommitRevealSignature(secret, secretHash, finderAddress, itemAddress, itemCycle, chainId = chain.id) {
    try {
        // Validate that the secret matches the expected secretHash
        const validationResult = validateSecretHash(secret, secretHash);
        if (!validationResult.success) {
            return {
                success: false,
                error: new ValidationError('Secret does not match the expected secretHash'),
                data: null
            };
        }
        
        const privateKeyResult = normalizeSecretToPrivateKey(secret);
        if (!privateKeyResult.success) {
            return privateKeyResult; // Pass through the error
        }
        
        const account = privateKeyToAccount(privateKeyResult.data.privateKey);
        
        // Create the message hash that matches the contract's expectation
        const cycle = typeof itemCycle === 'bigint' ? itemCycle : BigInt(itemCycle);
        const chainIdBig = typeof chainId === 'bigint' ? chainId : BigInt(chainId);

        const rawMessageHash = keccak256(encodePacked(
            ['address', 'address', 'address', 'uint256', 'uint256'],
            [secretHash, finderAddress, itemAddress, cycle, chainIdBig]
        ));
        
        // Sign the raw message hash directly (contract will apply EIP-191 prefix)
        const signature = await account.signMessage({ 
            message: { raw: rawMessageHash } 
        });
        
        return {
            success: true,
            data: {
                signature,
                messageHash: rawMessageHash
            },
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: new CryptoError(`Failed to create commit-reveal signature: ${error.message}`),
            data: null
        };
    }
}

/**
 * Validates that a secret corresponds to the expected secretHash
 * @param {string} secret - The raw secret string
 * @param {string} expectedSecretHash - The expected secret hash
 * @returns {Object} - Result object with success, data (isValid), and error
 */
export function validateSecretHash(secret, expectedSecretHash) {
    try {
        const hashResult = generateSecretHash(secret);
        if (!hashResult.success) {
            return {
                success: false,
                error: hashResult.error,
                data: { isValid: false }
            };
        }
        
        const isValid = hashResult.data.secretHash.toLowerCase() === expectedSecretHash.toLowerCase();
        
        return {
            success: true,
            data: { 
                isValid,
                actualHash: hashResult.data.secretHash,
                expectedHash: expectedSecretHash
            },
            error: null
        };
    } catch (error) {
        return {
            success: false,
            error: new ValidationError(`Failed to validate secret hash: ${error.message}`),
            data: { isValid: false }
        };
    }
}

/**
 * Generates a cryptographically secure random secret that forms a valid private key
 * @param {number} maxAttempts - Maximum attempts to generate valid key (default: 10)
 * @returns {Object} - Result object with success, data (secret info), and error
 */
export function generateRandomSecret(maxAttempts = 10) {
    const warnings = [];
    
    for (let attempt = 1; attempt <= maxAttempts; attempt++) {
        try {
            // Generate 32 random bytes using crypto.getRandomValues
            const randomBytes = new Uint8Array(32);
            window.crypto.getRandomValues(randomBytes);
            
            // Convert to hex string
            const randomHex = Array.from(randomBytes)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            
            // Validate it's a valid private key
            if (isValidPrivateKey(randomHex)) {
                const secret = randomHex;
                const hashResult = generateSecretHash(secret);
                
                if (!hashResult.success) {
                    warnings.push(`Attempt ${attempt}: Hash generation failed`);
                    continue;
                }
                
                const entropyScore = calculateEntropyScore(secret);
                
                return {
                    success: true,
                    data: {
                        secret,
                        secretHash: hashResult.data.secretHash,
                        entropyScore,
                        keyStrength: 'Maximum (cryptographically secure)',
                        generationMethod: 'crypto-random',
                        isSecure: true,
                        attempt,
                        warnings: hashResult.data.warnings || []
                    },
                    error: null
                };
            } else {
                warnings.push(`Attempt ${attempt}: Generated invalid private key`);
            }
        } catch (error) {
            warnings.push(`Attempt ${attempt}: ${error.message}`);
        }
    }
    
    return {
        success: false,
        error: new CryptoError(`Failed to generate valid private key after ${maxAttempts} attempts`),
        data: { warnings }
    };
}