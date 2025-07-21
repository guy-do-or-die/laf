import { useState, useEffect, useRef } from 'react';
import { useParams } from "wouter";

import { hashMessage, recoverAddress, recoverMessageAddress } from 'viem';

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { Button } from "../components/ui/button";

import { notify } from "../components/Notification";
import { useAccount } from "../wallet";
import { useUnifiedSigning } from "../hooks/useUnifiedSigning";
import { useSmartWalletDeployment } from "../hooks/useSmartWalletDeployment";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound, useReadItemOwner } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"
import { useBlockContext } from '../contexts/BlockContext';


const verifySignature = async (signature, secret, expectedAddress) => {
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
};

export default function Found() {
    // Debug: Auto-signing state tracking enabled
    const { secretHash, secret, ownerSignature } = useParams();

    const { blockNumber } = useBlockContext();

    const { address, activeWalletType, loggedIn, signingMethod, hasSmartWallet, isSmartWalletDeployed } = useAccount();
    const { signMessage, isReady: signingReady } = useUnifiedSigning();

    // Use the smart wallet deployment hook
    const { 
        deploymentNeeded, 
        isReady: walletReady, 
        isDeploying, 
        statusMessage,
    } = useSmartWalletDeployment();
    
    const [finderSignature, setFinderSignature] = useState('');
    const [isSigningSecret, setIsSigningSecret] = useState(false);
    const [ownerSignatureValid, setOwnerSignatureValid] = useState(null);
    const [autoSigningAttempted, setAutoSigningAttempted] = useState(false);
    const [isFound, setIsFound ] = useState(false);
    
    // Ref to prevent double-invocation in StrictMode
    const signingInProgressRef = useRef(false);
    const signingAbortControllerRef = useRef(null);
    
    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });
    const { data: ownerAddress } = useReadItemOwner({ address: itemAddress });

    const { data: isFoundData } = useReadItemIsFound({ address: itemAddress, blockNumber });

    useEffect(() => {
        if (isFoundData) {
            setIsFound(isFoundData);
        }
    }, [isFoundData]);

    // Validate owner signature when we have all required data
    useEffect(() => {
        const validateOwnerSignature = async () => {
            // Owner signature validation doesn't depend on current user's wallet state
            // It only needs the secret, signature, and owner address from the contract
            if (!secret || !ownerSignature || !ownerAddress) {
                console.log('Skipping owner signature validation - missing requirements:', {
                    secret: !!secret,
                    ownerSignature: !!ownerSignature,
                    ownerAddress: !!ownerAddress
                });
                return;
            }
            
            console.log('🔍 Validating owner signature...');
            console.log('Secret:', secret);
            console.log('Owner signature:', ownerSignature);
            console.log('Owner address:', ownerAddress);
            
            try {
                const isValid = await verifySignature(ownerSignature, secret, ownerAddress);
                console.log('Owner signature validation result:', isValid);
                setOwnerSignatureValid(isValid);
                
                if (isValid) {
                    console.log('✅ Owner signature is valid');
                } else {
                    console.log('❌ Owner signature is invalid');
                }
            } catch (error) {
                console.error('Error validating owner signature:', error);
                setOwnerSignatureValid(false);
            }
        };
        
        validateOwnerSignature();
    }, [secret, ownerSignature, ownerAddress]); 

    // Manual signing function (based on Register.jsx pattern)
    const signSecretManually = async () => {
        if (!loggedIn) {
            console.log('Wallet not connected, cannot sign');
            notify('Please connect your wallet first.', 'error');
            return;
        }
        
        // Wait for smart wallet to be ready if needed
        if (!walletReady) {
            console.log('Smart wallet not ready yet, waiting...');
            notify('Preparing smart wallet...', 'info');
            return;
        }
        
        // CRITICAL: Ensure we're using the current wallet state at signing time
        // Re-fetch current wallet state to avoid stale closure values
        console.log('🔍 Current wallet state at signing time:', { 
            activeWalletType, 
            address, 
            hasSmartWallet, 
            signingMethod 
        });
        
        // FORCE SMART WALLET USAGE WHEN AVAILABLE (Register.jsx pattern)
        let finalWalletType = activeWalletType;
        let finalSigningMethod = signingMethod;
        
        // Check if we have smart wallet available but are using embedded wallet
        if (hasSmartWallet && activeWalletType === 'embedded_wallet') {
            console.log('🔄 Smart wallet available - forcing smart wallet usage instead of embedded wallet');
            finalWalletType = 'smart_wallet';
            finalSigningMethod = 'privy_smart_wallet';
        }
        
        // CRITICAL: Prevent signing during wallet state transitions
        // If we have a smart wallet deployed but activeWalletType is still embedded_wallet,
        // it means Privy is still transitioning wallet state - abort to prevent race condition
        if (isSmartWalletDeployed && activeWalletType === 'embedded_wallet') {
            console.log('⚠️ Wallet state transition detected - smart wallet deployed but type still embedded');
            console.log('Wallet state:', { isSmartWalletDeployed, activeWalletType, hasSmartWallet });
            console.log('Aborting signing to prevent signature/sender mismatch');
            setIsSigningSecret(false);
            setAutoSigningAttempted(false); // Allow retry when wallet state stabilizes
            return;
        }
        
        // Check all conditions before proceeding
        if (!signingReady || isSigningSecret || finderSignature) {
            console.log('Signature conditions not met:', { 
                signingReady,
                isSigningSecret, 
                finderSignature: !!finderSignature
            });
            return;
        }
        
        setIsSigningSecret(true);
        setAutoSigningAttempted(true);
        
        try {
            console.log('Starting finder signature process');
            console.log('Secret to sign:', secret);
            console.log('Final wallet type (enforced):', finalWalletType);
            console.log('Final signing method (enforced):', finalSigningMethod);
            
            // Sign using the enforced wallet type
            const signature = await signMessage({ 
                message: secret,
                signingMethod: finalSigningMethod
            });
            
            console.log('✅ Finder signature created:', signature?.slice(0, 20) + '...');
            setFinderSignature(signature);
            notify('Secret signed successfully!', 'success', {id: "secret-signed"});
            
        } catch (error) {
            console.error('❌ Signing failed:', error);
            if (error.message?.includes('User rejected') || 
                error.message?.includes('User denied') || 
                error.message?.includes('User cancelled')) {
                notify('Signature cancelled by user', 'error');
            } else {
                notify('Failed to sign secret. Please try again.', 'error');
            }
        } finally {
            setIsSigningSecret(false);
        }
    };

    // Clear stale signatures when wallet changes (prevents signature/sender mismatch)
    useEffect(() => {
        if (finderSignature && address) {
            console.log('🔄 Wallet changed - clearing stale finder signature to prevent mismatch');
            setFinderSignature('');
            setAutoSigningAttempted(false); // Allow re-signing with new wallet
            notify('Wallet changed. Signature cleared.', 'info');
        }
    }, [address, activeWalletType]);

    // Auto-trigger signing when wallet is ready (Register.jsx pattern)
    // Include activeWalletType to retrigger when wallet state stabilizes after transition
    useEffect(() => {
        if (!isFound && !finderSignature && !isSigningSecret && !autoSigningAttempted && 
            loggedIn && secret && ownerSignatureValid && walletReady) {
            console.log('✅ Wallet ready, attempting automatic signature...');
            console.log('Current wallet state:', { activeWalletType, address, hasSmartWallet });
            signSecretManually();
        }
    }, [isFound, finderSignature, isSigningSecret, autoSigningAttempted, loggedIn, secret, ownerSignatureValid, walletReady, activeWalletType]);

    // Critical validation function to prevent signature/sender mismatch
    const validateSignatureBeforeCall = async () => {
        if (!finderSignature || !address) return false;
        
        try {
            // For smart wallet signatures, defer to contract validation
            const isSmartWalletSignature = finderSignature.length > 132;
            if (isSmartWalletSignature) {
                console.log('✅ Smart wallet signature - deferring to contract validation');
                return true;
            }
            
            // For EOA signatures, validate they match current wallet
            const recoveredAddress = await recoverMessageAddress({
                message: secret,
                signature: finderSignature,
            });
            
            const isValid = recoveredAddress.toLowerCase() === address.toLowerCase();
            
            if (!isValid) {
                console.error('❌ Signature mismatch detected!');
                console.error('Signature from:', recoveredAddress);
                console.error('Current wallet:', address);
                
                // Clear the invalid signature
                setFinderSignature('');
                notify('Signature mismatch detected. Please sign again with current wallet.', 'error');
                return false;
            }
            
            console.log('✅ Signature validation passed - signature matches current wallet');
            return true;
        } catch (error) {
            console.error('❌ Signature validation failed:', error);
            notify('Invalid signature. Please sign again.', 'error');
            return false;
        }
    };

    const foundParams = {
        args: [secretHash, secret, ownerSignature, finderSignature],
        enabled: !isFound && finderSignature && ownerSignature && walletReady,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner has been informed!', 'success', {id: "secret-found"});
                setFinderSignature(null);
                setAutoSigningAttempted(false);
            }
        }
    };

    // Determine current status for streamlined UI
    const getStatus = () => {
        if (!ownerSignature) return 'invalid_qr';
        if (isFound) return 'already_found';
        if (ownerSignatureValid === null) return 'validating';
        if (!ownerSignatureValid) return 'invalid_signature';
        
        // Handle signing states more precisely
        if (!finderSignature) {
            if (isSigningSecret) return 'signing';
            // If auto-signing was attempted but failed, show manual option
            if (autoSigningAttempted) return 'need_signature';
            // If auto-signing hasn't been attempted yet, show signing in progress
            return 'signing';
        }
        
        if (deploymentNeeded && isDeploying) return 'deploying_wallet';
        if (deploymentNeeded && !walletReady) return 'need_deployment';
        return 'ready_to_confirm';
    };
    
    const status = getStatus();
    
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Found Item</h1>
            
            <div className="w-full max-w-md space-y-4">
                <div className="mb-4">
                    <ItemCard
                        hash={secretHash}
                        address={itemAddress}
                    />
                </div>
                
                <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                    {status === 'invalid_qr' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-red-600">Invalid QR Code</h3>
                            <p className="text-sm text-gray-600">
                                This QR code doesn't contain the owner's signature. Please make sure you're scanning 
                                a valid LAF QR code that was generated after the owner signed their secret.
                            </p>
                        </>
                    )}
                    
                    {status === 'already_found' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">Item Already Found</h3>
                            <p className="text-sm text-gray-600">
                                Return the item to the owner to receive the remaining part.
                            </p>
                        </>
                    )}
                    
                    {status === 'validating' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-600">Validating...</h3>
                            <p className="text-sm text-gray-600">
                                🔍 Validating owner signature...
                            </p>
                        </>
                    )}
                    
                    {status === 'invalid_signature' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-red-600">Invalid Signature</h3>
                            <p className="text-sm text-gray-600">
                                ❌ Invalid owner signature - this QR code may be tampered with
                            </p>
                        </>
                    )}
                    
                    {status === 'signing' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">Signing Secret...</h3>
                            <p className="text-sm text-green-600 mb-2">✅ Owner signature verified</p>
                            <p className="text-sm text-yellow-600">🔄 Signing secret to prove you found the item...</p>
                        </>
                    )}
                    
                    {status === 'need_signature' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-orange-600">Manual Signature Required</h3>
                            <p className="text-sm text-green-600 mb-2">✅ Owner signature verified</p>
                            <p className="text-sm text-gray-600 mb-4">
                                Auto-signing failed. Please sign the secret manually to prove you found the item.
                            </p>
                            <div className="flex justify-center">
                                <Button 
                                    onClick={signSecretManually}
                                    disabled={!address || isSigningSecret}
                                    className="px-6 py-2"
                                >
                                    {isSigningSecret ? 'Signing...' : 'Sign Secret'}
                                </Button>
                            </div>
                        </>
                    )}
                    
                    {status === 'deploying_wallet' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">Deploying Smart Wallet...</h3>
                            <p className="text-sm text-green-600 mb-2">✅ Owner signature verified</p>
                            <p className="text-sm text-green-600 mb-2">✅ Finder signature completed</p>
                            <p className="text-sm text-yellow-600 mb-4">🚀 {statusMessage}</p>
                            <p className="text-sm text-gray-600">
                                Your smart wallet is being deployed automatically to receive USDC rewards...
                            </p>
                        </>
                    )}
                    
                    {status === 'need_deployment' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-yellow-600">Preparing Smart Wallet...</h3>
                            <p className="text-sm text-green-600 mb-2">✅ Owner signature verified</p>
                            <p className="text-sm text-green-600 mb-2">✅ Finder signature completed</p>
                            <p className="text-sm text-yellow-600 mb-4">⚠️ {statusMessage}</p>
                            <p className="text-sm text-gray-600">
                                Smart wallet deployment will happen automatically...
                            </p>
                        </>
                    )}
                    
                    {status === 'ready_to_confirm' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-green-600">Ready to Confirm!</h3>
                            <p className="text-sm text-green-600 mb-2">✅ Owner signature verified</p>
                            <p className="text-sm text-green-600 mb-2">✅ Finder signature completed</p>
                            {activeWalletType === 'smart_wallet' && (
                                <p className="text-sm text-green-600 mb-2">✅ Smart wallet ready</p>
                            )}
                            <p className="text-sm text-gray-600 mb-4">
                                Everything is ready! Confirm you found this item to receive your immediate reward.
                            </p>
                            <div className="flex justify-center">
                                <TxButton
                                    simulateHook={useSmartWalletSimulateHook(useSimulateLafFound)}
                                    writeHook={useSmartWalletWriteHook(useWriteLafFound)}
                                    params={foundParams}
                                    text="Confirm Found" 
                                />
                            </div>
                        </>
                    )}
                    
                    {!loggedIn && (
                        <p className="text-sm text-red-600 mt-4 text-center">
                            Please connect your wallet first
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}