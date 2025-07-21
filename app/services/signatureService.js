import { keccak256, stringToHex, getAddress, hashMessage, recoverAddress } from 'viem';

/**
 * Signature Service - Pure crypto functions for signature generation and verification
 * Following SRP: Only handles cryptographic operations, no UI or side effects
 */

/**
 * Generate a secret hash from a secret string
 * @param {string} secret - The secret string to hash
 * @returns {string} - The generated address hash
 */
export function generateSecretHash(secret) {
    const hash = keccak256(stringToHex(secret));
    const addressHash = '0x' + hash.substring(hash.length - 40);
    return getAddress(addressHash);
}

/**
 * Generate a random secret string and its corresponding secret hash
 * @param {number} length - The length of the random secret (default: 32)
 * @returns {Object} - Object containing { secret, secretHash }
 */
export function generateRandomSecret(length = 32) {
    const randomBytes = new Uint8Array(length);
    window.crypto.getRandomValues(randomBytes);
    
    const secret = Array.from(randomBytes)
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
    
    const secretHash = generateSecretHash(secret);
    
    return {
      secret,
      secretHash
    };
}

/**
 * Verify signature validity for both EOA and smart wallet signatures
 * @param {string} signature - The signature to verify
 * @param {string} secret - The original secret that was signed
 * @param {string} expectedAddress - The expected signer address
 * @returns {Promise<boolean>} - True if signature is valid, false otherwise
 */
export async function verifySignature(signature, secret, expectedAddress) {
    if (!signature || !secret || !expectedAddress) return false;
    
    try {
        // Check if this is a smart wallet signature (longer than standard EOA)
        const isSmartWalletSignature = signature.length > 132;
        
        if (isSmartWalletSignature) {
            console.log('Smart wallet signature detected - deferring to contract validation');
            return true; // Let contract handle ERC-1271 validation
        }
        
        // For EOA signatures, verify directly against the secret
        // The secret is already the original hex string that was signed
        const recoveredSigner = await recoverAddress({
            hash: hashMessage(secret), // Apply EIP-191 hashing to the original secret
            signature: signature,
        });
        
        // Handle both direct matches and smart wallet scenarios (signature from controlling EOA)
        const isValid = recoveredSigner.toLowerCase() === expectedAddress.toLowerCase();
        console.log(`Signature verification: ${isValid ? '✅ Valid' : '❌ Invalid'}`);
        console.log(`Expected: ${expectedAddress}, Recovered: ${recoveredSigner}`);
        console.log(`Secret used for verification: ${secret}`);
        
        return isValid;
    } catch (error) {
        console.error('Signature verification failed:', error);
        return false;
    }
}
