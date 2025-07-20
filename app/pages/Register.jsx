import {useRef, useEffect, useState} from 'react';

import { useLocation } from 'wouter';

import { keccak256, stringToHex, getAddress } from 'viem';

import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import { Textarea } from "../components/ui/textarea";
import { notify } from '../components/Notification';

import TxButton from "../components/TxButton";

import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"
import { useAccount } from "../wallet"
import { useUnifiedSigning } from "../hooks/useUnifiedSigning";


function generateSecretHash(secret) {
    const hash = keccak256(stringToHex(secret));
    const addressHash = '0x' + hash.substring(hash.length - 40);
    return getAddress(addressHash);
}


function generateRandomSecret(length = 32) {
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


export default function Register() {
    const [, setLocation] = useLocation();
    const { loggedIn, activeWalletType, signingMethod, hasSmartWallet } = useAccount();
    const { signMessage, isReady: signingReady } = useUnifiedSigning();
    
    const [itemData, setItemData] = useState(() => {
        const { secret, secretHash } = generateRandomSecret();
        return { secret, secretHash, qrCode: null, ownerSignature: null };
    });

    const [comment, setComment] = useState('');
    const [isSigningSecret, setIsSigningSecret] = useState(false);
    const [secretSigned, setSecretSigned] = useState(false);
    const [signatureCancelled, setSignatureCancelled] = useState(false);
    const [hasAttemptedSignature, setHasAttemptedSignature] = useState(false);
    const [registrationWalletType, setRegistrationWalletType] = useState(null);
    const [registrationAddress, setRegistrationAddress] = useState(null);
    const [walletContextLocked, setWalletContextLocked] = useState(false);
    
    const qrRef = useRef(null);
    const signatureAttemptRef = useRef(false); // Prevent double execution
    
    // Function to sign the secret and generate QR code with owner signature
    const signSecretAndGenerateQR = async () => {
        // Prevent double execution (React strict mode)
        if (signatureAttemptRef.current) {
            console.log('Signature attempt already in progress, skipping');
            return;
        }
        
        if (!loggedIn) {
            console.log('Wallet not connected, cannot sign');
            notify('Please connect your wallet first.', 'error');
            setSignatureCancelled(true);
            setItemData(prev => ({
                ...prev,
                ownerSignature: null,
                qrCode: null
            }));
            return;
        }
        
        // FORCE SMART WALLET USAGE WHEN AVAILABLE
        // Always prioritize smart wallet over embedded wallet for consistency
        let finalWalletType = activeWalletType;
        let finalSigningMethod = signingMethod;
        
        // Check if we have smart wallet available but are using embedded wallet
        if (hasSmartWallet && activeWalletType === 'embedded_wallet') {
            console.log('🔄 Smart wallet available - forcing smart wallet usage instead of embedded wallet');
            finalWalletType = 'smart_wallet';
            finalSigningMethod = 'privy_smart_wallet';
        }
        
        // Store the wallet context for this registration
        if (!registrationWalletType) {
            console.log('Setting registration wallet context:', { 
                original: { activeWalletType, signingMethod },
                final: { finalWalletType, finalSigningMethod }
            });
            setRegistrationWalletType(finalWalletType);
            setRegistrationAddress(loggedIn);
        } else if (registrationWalletType !== finalWalletType) {
            console.warn('Wallet type changed during registration!', {
                original: registrationWalletType,
                current: finalWalletType
            });
            notify('Wallet type changed. Please use the same wallet for registration and QR generation.', 'warning');
            // Reset and use current wallet
            setRegistrationWalletType(finalWalletType);
            setRegistrationAddress(loggedIn);
        }
        
        // Check all conditions before proceeding
        if (!signingReady || isSigningSecret || secretSigned || signatureCancelled) {
            console.log('Signature conditions not met:', { 
                signingReady,
                isSigningSecret, 
                secretSigned, 
                signatureCancelled 
            });
            return;
        }
        
        signatureAttemptRef.current = true;
        setIsSigningSecret(true);
        setHasAttemptedSignature(true);
        
        try {
            console.log('Starting item registration signature process');
            console.log('Item secret:', itemData.secret);
            console.log('Secret hash:', itemData.secretHash);
            console.log('Final wallet type (enforced):', finalWalletType);
            console.log('Final signing method (enforced):', finalSigningMethod);
            
            // Sign the original secret - let the signing hook handle EIP-191 hashing
            // This matches the contract's MessageHashUtils.toEthSignedMessageHash(bytes(_secret))
            console.log('Requesting owner signature for original secret...');
            
            // Sign the original secret using the enforced wallet type
            const ownerSignature = await signMessage({ 
                message: itemData.secret,  // Sign the original secret, not the hash
                signingMethod: finalSigningMethod  // Use enforced smart wallet signing
            });
            
            console.log('Owner signature received:', ownerSignature);
            
            // Create URL with owner signature included
            const url = `${window.location.origin}/found/${itemData.secretHash}/${itemData.secret}/${ownerSignature}`;
            const qrCode = new QRCodeStyling({ ...qrOptions, data: url });
            
            // Update item data with signature and QR code
            setItemData(prev => ({
                ...prev,
                ownerSignature,
                qrCode
            }));
            
            setSecretSigned(true);
            console.log('QR URL with signature generated:', url);
            console.log('Registration process complete - QR code ready!');
            console.log('✅ QR code generated with wallet:', { activeWalletType, signingMethod });
            
        } catch (error) {
            console.error('Error signing secret:', error);
            
            // Check if user cancelled the signature
            if (error.message?.includes('User rejected') || 
                error.message?.includes('User denied') ||
                error.message?.includes('User cancelled') ||
                error.name === 'UserRejectedRequestError') {
                console.log('User cancelled signature request');
                setSignatureCancelled(true);
                notify('Signature cancelled. You can refresh the page to try again.', 'info');
            } 
            // Smart wallet specific errors
            else if (activeWalletType === 'smart_wallet' && (
                error.message?.includes('smart wallet') ||
                error.message?.includes('Smart contract wallet') ||
                error.message?.includes('ERC-1271')
            )) {
                console.log('Smart wallet signature error:', error);
                notify('Smart wallet signature error. Please try again or use a different wallet.', 'error');
            } else if (error.message?.includes('Connector not connected')) {
                console.log('Wallet not connected');
                notify('Please connect your wallet first.', 'error');
            } else {
                notify('Failed to sign secret. Please try again.', 'error');
            }
        } finally {
            setIsSigningSecret(false);
            signatureAttemptRef.current = false;
        }
    };
    
    // Function to regenerate QR code with current wallet
    const regenerateQRCode = async () => {
        console.log('🔄 Regenerating QR code with current wallet context');
        
        // Clear the QR container immediately to prevent side-by-side display
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
        }
        
        // Reset signature state
        setSecretSigned(false);
        setSignatureCancelled(false);
        setHasAttemptedSignature(false);
        setRegistrationWalletType(null);
        setRegistrationAddress(null);
        signatureAttemptRef.current = false;
        
        // Clear existing signature and QR code
        setItemData(prev => ({
            ...prev,
            ownerSignature: null,
            qrCode: null
        }));
        
        // Generate new signature and QR code
        await signSecretAndGenerateQR();
    };
    
    // Auto-request signature when wallet is ready
    useEffect(() => {
        // Only attempt signature if:
        // 1. Wallet is connected (address exists)
        // 2. Not currently signing
        // 3. Haven't signed yet
        // 4. Haven't cancelled signature
        // 5. Haven't attempted signature yet (prevents loops)
        if (loggedIn && !isSigningSecret && !secretSigned && !signatureCancelled && !hasAttemptedSignature) {
            console.log('Wallet connected, attempting automatic signature...');
            signSecretAndGenerateQR();
        } else if (!loggedIn && hasAttemptedSignature) {
            console.log('Wallet disconnected, resetting signature state');
            // Reset state if wallet disconnects
            setHasAttemptedSignature(false);
            setSignatureCancelled(false);
            signatureAttemptRef.current = false;
        }
    }, [loggedIn, isSigningSecret, secretSigned, signatureCancelled, hasAttemptedSignature]);
    
    useEffect(() => {
        if (qrRef.current && itemData.qrCode) {
            qrRef.current.innerHTML = '';
            itemData.qrCode.append(qrRef.current);
        }
    }, [itemData.qrCode]);

    const registerParams = {
        args: [itemData.secretHash, comment],
        enabled: comment.length > 0 && secretSigned,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('Item registered successfully!', 'success');
                setLocation('/items');
            }
        }
    }

    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold">Register a New Item</h2>
            
            <div className="border-0 p-4 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                <h3 className="text-lg font-semibold mb-2">Your Item's QR Code</h3>
                
                {!secretSigned ? (
                    <div className="flex justify-center mb-4">
                        <div className="w-[300px] h-[300px] bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                            <div className="w-48 h-48 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                ) : (
                    <div 
                        ref={qrRef} 
                        className="mb-4 cursor-pointer flex justify-center" 
                        onClick={() => {
                            if (itemData.qrCode) {
                                itemData.qrCode.download({ 
                                    name: `laf-item-${itemData.secretHash.slice(0, 8)}`, 
                                    extension: 'png' 
                                });
                            }
                        }}
                        title="Click to download QR code"
                    ></div>
                )}
                
                <p className="text-sm text-gray-600 mb-4">
                    {secretSigned ? 'Click to download' : 
                     signatureCancelled ? 'Signature cancelled - refresh page to try again' :
                     !loggedIn ? 'Please connect your wallet to continue' :
                     'Loading your item QR'}
                </p>
                
                {/* QR Regeneration Button */}
                {loggedIn && (
                    <div className="flex flex-col gap-2 mb-4">
                        <button
                            onClick={regenerateQRCode}
                            disabled={isSigningSecret}
                            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                        >
                            {isSigningSecret ? 'Generating...' : 'Regenerate QR Code'}
                        </button>
                        <p className="text-xs text-gray-500 text-center">
                            Use this if you switched wallets or need a fresh QR code
                        </p>
                        {registrationWalletType && (
                            <p className="text-xs text-blue-600 text-center">
                                QR generated with: {registrationWalletType}
                            </p>
                        )}
                    </div>
                )}
                
                <div className="mb-4">
                    <Textarea
                        placeholder="Comment (describe your item)"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={!secretSigned}
                    />
                </div>
                
                <div className="flex justify-center">
                    <TxButton
                        simulateHook={useSmartWalletSimulateHook(useSimulateLafRegisterItem)}
                        writeHook={useSmartWalletWriteHook(useWriteLafRegisterItem)}
                        params={registerParams}
                        text="Register Item"
                    />
                </div>
            </div>
        </div>
    )
}