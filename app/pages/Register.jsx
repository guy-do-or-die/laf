import {useRef, useEffect, useState} from 'react';

import { useLocation } from 'wouter';

import { keccak256, stringToHex, getAddress } from 'viem';
import { useSignMessage } from 'wagmi';

import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import { Textarea } from "../components/ui/textarea";
import { notify } from '../components/Notification';

import TxButton from "../components/TxButton";

import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"
import { useAccount } from "../wallet"


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
    const { loggedIn, smartWallet } = useAccount();
    const { signMessageAsync } = useSignMessage();
    
    const [itemData, setItemData] = useState(() => {
        const { secret, secretHash } = generateRandomSecret();
        return { secret, secretHash, qrCode: null, ownerSignature: null };
    });

    const [comment, setComment] = useState('');
    const [isSigningSecret, setIsSigningSecret] = useState(false);
    const [secretSigned, setSecretSigned] = useState(false);
    const [signatureCancelled, setSignatureCancelled] = useState(false);
    const [hasAttemptedSignature, setHasAttemptedSignature] = useState(false);
    
    const qrRef = useRef(null);
    const signatureAttemptRef = useRef(false); // Prevent double execution
    
    // Function to sign the secret and generate QR code with owner signature
    const signSecretAndGenerateQR = async () => {
        // Prevent double execution (React strict mode)
        if (signatureAttemptRef.current) {
            console.log('Signature attempt already in progress, skipping');
            return;
        }
        
        // Check all conditions before proceeding
        if (!loggedIn || isSigningSecret || secretSigned || signatureCancelled) {
            console.log('Signature conditions not met:', { 
                loggedIn, 
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
            
            // Sign the raw hash of the secret (contract compatible)
            const messageHash = keccak256(stringToHex(itemData.secret));
            console.log('Message hash:', messageHash);
            
            console.log('Requesting owner signature for raw hash...');
            const ownerSignature = await signMessageAsync({ 
                message: { raw: messageHash }
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
                        <div className="w-64 h-64 bg-gray-200 rounded-lg animate-pulse flex items-center justify-center">
                            <div className="w-48 h-48 bg-gray-300 rounded animate-pulse"></div>
                        </div>
                    </div>
                ) : (
                    <div 
                        ref={qrRef} 
                        className="mb-4 cursor-pointer" 
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