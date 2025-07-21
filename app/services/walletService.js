/**
 * Wallet Service - Pure business logic for wallet detection and management
 * Following SRP: Only handles wallet state logic, no UI or React dependencies
 */

/**
 * Wallet types enum for consistent wallet identification
 */
export const WALLET_TYPES = {
    SMART_WALLET: 'smart_wallet',
    EMBEDDED_WALLET: 'embedded_wallet', 
    EXTERNAL_WALLET: 'external_wallet'
};

/**
 * Signing methods enum for consistent signature routing
 */
export const SIGNING_METHODS = {
    PRIVY_SMART_WALLET: 'privy_smart_wallet',
    PRIVY_EMBEDDED: 'privy_embedded',
    WAGMI_EXTERNAL: 'wagmi_external'
};

/**
 * Detect smart wallet from user's linked accounts
 * @param {Object} user - Privy user object
 * @param {Object} privySmartWalletClient - Privy smart wallet client
 * @returns {Object} - Smart wallet detection result
 */
export function detectSmartWallet(user, privySmartWalletClient) {
    const smartWallet = user?.linkedAccounts?.find((account) => account.type === 'smart_wallet');
    const hasSmartWallet = !!(smartWallet && privySmartWalletClient);
    
    return {
        smartWallet: hasSmartWallet ? smartWallet : null,
        hasSmartWallet,
        address: hasSmartWallet ? smartWallet.address : null
    };
}

/**
 * Detect embedded wallet from user's linked accounts
 * @param {Object} user - Privy user object
 * @returns {Object} - Embedded wallet detection result
 */
export function detectEmbeddedWallet(user) {
    const embeddedWallet = user?.linkedAccounts?.find((account) => 
        account.type === 'wallet' && account.walletClientType === 'privy'
    );
    const hasEmbeddedWallet = !!embeddedWallet;
    
    return {
        embeddedWallet: hasEmbeddedWallet ? embeddedWallet : null,
        hasEmbeddedWallet,
        address: hasEmbeddedWallet ? embeddedWallet.address : null
    };
}

/**
 * Detect external wallet from wagmi wallets
 * @param {Array} wallets - Array of wallet objects from useWallets
 * @param {boolean} isConnected - Wagmi connection status
 * @returns {Object} - External wallet detection result
 */
export function detectExternalWallet(wallets, isConnected) {
    const externalWallet = wallets.find((wallet) => wallet.walletClientType !== 'privy');
    const hasExternalWallet = !!(externalWallet && isConnected);
    
    return {
        externalWallet: hasExternalWallet ? externalWallet : null,
        hasExternalWallet,
        address: hasExternalWallet ? externalWallet.address : null
    };
}

/**
 * Determine active wallet based on hierarchy: Smart > Embedded > External
 * @param {Object} walletDetections - Object containing all wallet detection results
 * @returns {Object} - Active wallet information
 */
export function determineActiveWallet(walletDetections) {
    const { smartWallet, embeddedWallet, externalWallet } = walletDetections;
    
    // Priority: Smart Wallet > Embedded Wallet > External Wallet
    if (smartWallet.hasSmartWallet) {
        return {
            activeWalletType: WALLET_TYPES.SMART_WALLET,
            address: smartWallet.address,
            signingMethod: SIGNING_METHODS.PRIVY_SMART_WALLET,
            activeWallet: smartWallet.smartWallet
        };
    } else if (embeddedWallet.hasEmbeddedWallet) {
        return {
            activeWalletType: WALLET_TYPES.EMBEDDED_WALLET,
            address: embeddedWallet.address,
            signingMethod: SIGNING_METHODS.PRIVY_EMBEDDED,
            activeWallet: embeddedWallet.embeddedWallet
        };
    } else if (externalWallet.hasExternalWallet) {
        return {
            activeWalletType: WALLET_TYPES.EXTERNAL_WALLET,
            address: externalWallet.address,
            signingMethod: SIGNING_METHODS.WAGMI_EXTERNAL,
            activeWallet: externalWallet.externalWallet
        };
    } else {
        return {
            activeWalletType: null,
            address: null,
            signingMethod: null,
            activeWallet: null
        };
    }
}

/**
 * Check if user is fully logged in with valid wallet
 * @param {Object} params - Login check parameters
 * @returns {boolean} - True if user is fully logged in
 */
export function isUserLoggedIn(params) {
    const { ready, authenticated, isConnected, address } = params;
    return ready && authenticated && isConnected && !!address;
}

/**
 * Check if smart wallet is deployed on chain
 * @param {string} bytecode - Smart wallet bytecode from chain
 * @returns {boolean} - True if smart wallet is deployed
 */
export function isSmartWalletDeployed(bytecode) {
    return bytecode !== '0x' && bytecode !== null && bytecode !== undefined;
}

/**
 * Create wallet state debug object for logging
 * @param {Object} walletState - Complete wallet state object
 * @returns {Object} - Debug-friendly wallet state object
 */
export function createWalletDebugState(walletState) {
    const {
        activeWalletType,
        address,
        signingMethod,
        smartWallet,
        embeddedWallet,
        externalWallet,
        user,
        privySmartWalletClient,
        isConnected,
        isSmartWalletDeployed
    } = walletState;

    return {
        activeWalletType,
        address: address?.slice(0, 8) + '...',
        signingMethod,
        hasSmartWallet: !!smartWallet,
        smartWallet: smartWallet ? { 
            address: smartWallet.address?.slice(0, 8) + '...', 
            type: smartWallet.type 
        } : null,
        privySmartWalletClient: !!privySmartWalletClient,
        userLinkedAccounts: user?.linkedAccounts?.map(acc => ({ 
            type: acc.type, 
            address: acc.address?.slice(0, 8) + '...' 
        })),
        hasEmbeddedWallet: !!embeddedWallet,
        hasExternalWallet: !!externalWallet,
        privyClientAvailable: !!privySmartWalletClient,
        wagmiConnected: isConnected,
        isSmartWalletDeployed
    };
}
