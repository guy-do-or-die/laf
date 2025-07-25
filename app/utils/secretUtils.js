import { privateKeyToAccount } from 'viem/accounts';
import { encodePacked, keccak256, hashMessage } from 'viem';

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
        const secretHash = generateSecretHash(secret);
        return secretHash.toLowerCase() === userWalletAddress?.toLowerCase();
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
 * @returns {string} - Normalized private key with 0x prefix
 * @throws {Error} - If secret is invalid or insecure
 */
function normalizeSecretToPrivateKey(secret, userWalletAddress = null) {
    if (!secret || typeof secret !== 'string') {
        throw new Error('Secret must be a non-empty string');
    }
    
    // Check for wallet key reuse
    if (userWalletAddress && isWalletKeyReuse(secret, userWalletAddress)) {
        throw new Error('⚠️ SECURITY WARNING: Cannot use your wallet private key as secret! This would expose your wallet.');
    }
    
    // Calculate entropy for manual secrets
    const entropyScore = calculateEntropyScore(secret);
    if (entropyScore < 30) {
        console.warn(`⚠️ Low entropy secret detected (score: ${entropyScore}/100). Consider using generateRandomSecret() for better security.`);
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
        privateKeyHex = hash.slice(2);
        
        // Double-check validity
        if (!isValidPrivateKey(privateKeyHex)) {
            throw new Error('Unable to generate valid private key from secret');
        }
    }
    
    return '0x' + privateKeyHex;
}

/**
 * Generates a secret hash as the Ethereum address derived from the secret used as a private key
 * This ensures signature verification compatibility with the smart contract
 * @param {string} secret - The raw secret string
 * @param {string} userWalletAddress - Optional user wallet address to prevent key reuse
 * @returns {string} - The Ethereum address (secretHash)
 */
export function generateSecretHash(secret, userWalletAddress = null) {
    const privateKey = normalizeSecretToPrivateKey(secret, userWalletAddress);
    const account = privateKeyToAccount(privateKey);
    return account.address;
}

/**
 * Creates a signature for the commit-reveal process that will verify against the secretHash
 * @param {string} secret - The raw secret string
 * @param {string} secretHash - The expected secret hash (should match generateSecretHash result)
 * @param {string} finderAddress - The finder's wallet address
 * @param {string} itemAddress - The item contract address
 * @param {bigint} itemCycle - The item cycle number
 * @returns {Promise<string>} - The signature hex string
 */
export async function createCommitRevealSignature(secret, secretHash, finderAddress, itemAddress, itemCycle, chainId) {
    // Validate inputs
    if (!secret || !secretHash || !finderAddress || !itemAddress || itemCycle === undefined) {
        throw new Error('All parameters are required for signature creation');
    }
    
    // Create the message hash that matches the contract's expectation
    // Contract: keccak256(abi.encodePacked(_secretHash, itemFinder, address(item), cycle))
    const encodedMessage = encodePacked(
        ['address', 'address', 'address', 'uint256', 'uint256'],
        [secretHash, finderAddress, itemAddress, Number(itemCycle), Number(chainId)]
    );
    const rawMessageHash = keccak256(encodedMessage);
    
    // Apply EIP-191 prefix to match contract's MessageHashUtils.toEthSignedMessageHash
    const ethSignedMessageHash = hashMessage({ raw: rawMessageHash });
    
    // Create account from secret and sign the message
    const privateKey = normalizeSecretToPrivateKey(secret);
    const account = privateKeyToAccount(privateKey);
    
    // Verify that the account address matches the expected secretHash
    if (account.address.toLowerCase() !== secretHash.toLowerCase()) {
        throw new Error(`Address mismatch: expected ${secretHash}, got ${account.address}`);
    }
    
    // Sign the message
    const signature = await account.signMessage({ message: { raw: rawMessageHash } });
    
    return signature;
}

/**
 * Validates that a secret corresponds to the expected secretHash
 * @param {string} secret - The raw secret string
 * @param {string} expectedSecretHash - The expected secret hash
 * @returns {boolean} - True if the secret generates the expected hash
 */
export function validateSecretHash(secret, expectedSecretHash) {
    try {
        const generatedHash = generateSecretHash(secret);
        return generatedHash.toLowerCase() === expectedSecretHash.toLowerCase();
    } catch (error) {
        return false;
    }
}

/**
 * Generates a cryptographically secure random secret that forms a valid private key
 * @param {number} maxAttempts - Maximum attempts to generate valid key (default: 10)
 * @returns {Object} - Object containing the secret, secretHash, and security info
 */
export function generateRandomSecret(maxAttempts = 10) {
    for (let attempt = 0; attempt < maxAttempts; attempt++) {
        try {
            // Generate 32 cryptographically secure random bytes
            const randomBytes = new Uint8Array(32);
            window.crypto.getRandomValues(randomBytes);
            
            const secret = Array.from(randomBytes)
                .map(b => b.toString(16).padStart(2, '0'))
                .join('');
            
            // Validate that this forms a valid private key
            if (!isValidPrivateKey(secret)) {
                console.log(`Attempt ${attempt + 1}: Generated invalid private key, retrying...`);
                continue;
            }
            
            // Generate the corresponding secretHash
            const secretHash = generateSecretHash(secret);
            
            // Calculate security metrics
            const entropyScore = 100; // Maximum entropy for crypto-random
            const keyStrength = 'Maximum (256-bit cryptographic)';
            
            console.log(`✅ Generated secure random secret (attempt ${attempt + 1})`);
            console.log(`🔐 Entropy Score: ${entropyScore}/100`);
            console.log(`🛡️ Key Strength: ${keyStrength}`);
            
            return {
                secret,
                secretHash,
                entropyScore,
                keyStrength,
                isSecure: true,
                generationMethod: 'cryptographic-random'
            };
        } catch (error) {
            console.warn(`Attempt ${attempt + 1} failed:`, error.message);
        }
    }
    
    throw new Error(`Failed to generate valid random secret after ${maxAttempts} attempts`);
}

/**
 * Generates a user-friendly random secret with high entropy
 * @returns {Object} - Object containing a readable secret and its hash
 */
export function generateUserFriendlySecret() {
    // Use a combination of words and numbers for better user experience
    const adjectives = ['swift', 'bright', 'clever', 'brave', 'quick', 'smart', 'bold', 'wise', 'calm', 'keen'];
    const nouns = ['tiger', 'eagle', 'wolf', 'bear', 'lion', 'hawk', 'fox', 'deer', 'owl', 'shark'];
    const colors = ['red', 'blue', 'green', 'gold', 'silver', 'purple', 'orange', 'black', 'white', 'cyan'];
    
    // Generate random components
    const randomBytes = new Uint8Array(4);
    window.crypto.getRandomValues(randomBytes);
    
    const adjective = adjectives[randomBytes[0] % adjectives.length];
    const color = colors[randomBytes[1] % colors.length];
    const noun = nouns[randomBytes[2] % nouns.length];
    const number = (randomBytes[3] * 1000 + Math.floor(Math.random() * 1000)).toString().padStart(4, '0');
    
    // Create readable secret
    const readableSecret = `${adjective}-${color}-${noun}-${number}`;
    
    // Add additional entropy by hashing with crypto-random salt
    const saltBytes = new Uint8Array(16);
    window.crypto.getRandomValues(saltBytes);
    const salt = Array.from(saltBytes).map(b => b.toString(16).padStart(2, '0')).join('');
    
    const enhancedSecret = keccak256(`0x${readableSecret}-${salt}`).slice(2);
    
    const secretHash = generateSecretHash(enhancedSecret);
    const entropyScore = calculateEntropyScore(enhancedSecret);
    
    return {
        secret: enhancedSecret,
        secretHash,
        readableVersion: readableSecret,
        entropyScore,
        keyStrength: 'High (enhanced with crypto-random salt)',
        generationMethod: 'user-friendly-enhanced',
        isSecure: true,
    };
}

/**
 * Validates and analyzes a user-provided secret
 * @param {string} secret - User-provided secret
 * @param {string} userWalletAddress - User's wallet address
 * @returns {Object} - Analysis results and recommendations
 */
export function analyzeUserSecret(secret, userWalletAddress = null) {
    try {
        const entropyScore = calculateEntropyScore(secret);
        const isWalletReuse = userWalletAddress ? isWalletKeyReuse(secret, userWalletAddress) : false;
        
        let securityLevel = 'Low';
        let recommendations = [];
        
        if (isWalletReuse) {
            throw new Error('⚠️ CRITICAL: This secret would generate your wallet address! This is extremely dangerous.');
        }
        
        if (entropyScore < 30) {
            securityLevel = 'Very Low';
            recommendations.push('Use a longer, more complex secret');
            recommendations.push('Include uppercase, lowercase, numbers, and special characters');
            recommendations.push('Consider using generateRandomSecret() instead');
        } else if (entropyScore < 50) {
            securityLevel = 'Low';
            recommendations.push('Add more character variety');
            recommendations.push('Increase length for better security');
        } else if (entropyScore < 70) {
            securityLevel = 'Medium';
            recommendations.push('Good entropy, but could be stronger');
        } else if (entropyScore < 90) {
            securityLevel = 'High';
        } else {
            securityLevel = 'Maximum';
        }
        
        const secretHash = generateSecretHash(secret, userWalletAddress);
        
        return {
            secret,
            secretHash,
            entropyScore,
            securityLevel,
            recommendations,
            isSecure: entropyScore >= 50 && !isWalletReuse,
            isWalletReuse,
            generationMethod: 'user-provided'
        };
    } catch (error) {
        return {
            error: error.message,
            isSecure: false,
            recommendations: ['Use generateRandomSecret() for maximum security']
        };
    }
}
