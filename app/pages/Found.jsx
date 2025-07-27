import { useState, useEffect, useRef } from 'react';
import { useParams } from "wouter";

import { recoverMessageAddress } from 'viem';

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { Button } from "../components/ui/button";

import { notify } from "../components/Notification";
import { useAccount } from "../wallet";
import { useUnifiedSigning } from "../hooks/useUnifiedSigning";
import { useSmartWalletDeployment } from "../hooks/useSmartWalletDeployment";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadLafItemStatus, useReadLafItemOwner, useReadLafItemCycle } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook, chain } from "../wallet"
import { useBlockContext } from '../contexts/BlockContext';

import { isItemFound } from "../constants/itemStatus"

import { createCommitRevealSignature, validateSecretHash } from '../services/secretService';


export default function Found() {
    const { secretHash, secret } = useParams();

    // Reduced logging frequency
    const shouldLog = useRef(0);
    if (shouldLog.current % 50 === 0) {
        console.log('🔍 Found component loaded with params:', { secretHash, secret });
    }
    shouldLog.current++;

    const { blockNumber } = useBlockContext();

    const { address, activeWalletType, loggedIn, signingMethod, hasSmartWallet, isSmartWalletDeployed } = useAccount();
    const { isReady: signingReady } = useUnifiedSigning();

    const { 
        deploymentNeeded, 
        isReady: walletReady, 
        isDeploying, 
        statusMessage,
    } = useSmartWalletDeployment();
    
    const [finderSignature, setFinderSignature] = useState('');
    const [isSigningSecret, setIsSigningSecret] = useState(false);
    const [autoSigningAttempted, setAutoSigningAttempted] = useState(false);
    const [isFound, setIsFound ] = useState(false);
    
    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });
    const { data: itemCycle } = useReadLafItemCycle({ address: itemAddress });

    const { data: itemStatus } = useReadLafItemStatus({ address: itemAddress, blockNumber });

    // Reduced data logging
    if (shouldLog.current % 100 === 0) {
        console.log('📈 Found component data:', {
            itemAddress,
            itemCycle,
            itemStatus,
            blockNumber,
            loggedIn,
            walletReady,
            isFound,
            finderSignature: !!finderSignature,
            autoSigningAttempted,
            deploymentNeeded,
            isDeploying
        });
    }
    shouldLog.current++;

    useEffect(() => {
        if (itemStatus !== undefined) {
            setIsFound(isItemFound(itemStatus));
        }
    }, [itemStatus]);

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
            
            if (!itemCycle) {
                throw new Error('Item cycle not loaded yet');
            }
            
            // Validate secret matches the expected secretHash
            const validationResult = validateSecretHash(secret, secretHash);
            if (!validationResult.success || !validationResult.data.isValid) {
                console.warn('⚠️ Secret validation failed - this may be an old QR code format');
                if (validationResult.error) {
                    console.error('Validation error:', validationResult.error.message);
                }
            }
            
            // Create signature using the utility function
            const signatureResult = await createCommitRevealSignature(
                secret,
                secretHash,
                address,
                itemAddress,
                itemCycle,
                chain.id
            );
            
            if (!signatureResult.success) {
                throw new Error(`Signature creation failed: ${signatureResult.error.message}`);
            }
            
            setFinderSignature(signatureResult.data.signature);
            notify('Secret signature created successfully!', 'success', {id: "secret-signed"});
            
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
            loggedIn && secret && walletReady) {
            console.log('✅ Wallet ready, attempting automatic signature...');
            console.log('Current wallet state:', { activeWalletType, address, hasSmartWallet });
            signSecretManually();
        }
    }, [isFound, finderSignature, isSigningSecret, autoSigningAttempted, loggedIn, secret, walletReady, activeWalletType]);

    const foundParams = {
        args: [secretHash, finderSignature],
        enabled: !isFound && finderSignature && walletReady,
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
        const statusData = {
            isFound,
            finderSignature: !!finderSignature,
            isSigningSecret,
            autoSigningAttempted,
            deploymentNeeded,
            isDeploying,
            walletReady,
            loggedIn,
            itemAddress: !!itemAddress
        };
        
        if (isFound) {
            console.log('🟢 Status: already_found', statusData);
            return 'already_found';
        }
        
        // Handle signing states more precisely
        if (!finderSignature) {
            if (isSigningSecret) {
                console.log('🟡 Status: signing', statusData);
                return 'signing';
            }
            // If auto-signing was attempted but failed, show manual option
            if (autoSigningAttempted) {
                console.log('🟠 Status: need_signature', statusData);
                return 'need_signature';
            }
            // If auto-signing hasn't been attempted yet, show signing in progress
            console.log('🟡 Status: signing (auto-attempt pending)', statusData);
            return 'signing';
        }
        
        if (deploymentNeeded && isDeploying) {
            console.log('🔵 Status: deploying_wallet', statusData);
            return 'deploying_wallet';
        }
        if (deploymentNeeded && !walletReady) {
            console.log('🔴 Status: need_deployment', statusData);
            return 'need_deployment';
        }
        console.log('🟢 Status: ready_to_confirm', statusData);
        return 'ready_to_confirm';
    };
    
    const status = getStatus();
    
    console.log('🎨 Found component rendering with status:', status);
    
    // Handle case where item is not found in contract
    if (!itemAddress) {
        console.log('⚠️ Item not found in contract for secretHash:', secretHash);
        return (
            <div className="flex flex-col items-center gap-8 p-4">
                <h1 className="text-2xl font-bold">Item Not Found</h1>
                <div className="w-full max-w-md space-y-4">
                    <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                        <h3 className="text-lg font-semibold mb-4 text-red-600">Item Not Registered</h3>
                        <p className="text-sm text-gray-600 mb-4">
                            This item has not been registered in the LAF system yet, or the QR code is invalid.
                        </p>
                        <p className="text-xs text-gray-500">
                            Secret Hash: {secretHash}
                        </p>
                    </div>
                </div>
            /=</div>
        );
    }
    
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
                    {status === 'already_found' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">Item Already Found</h3>
                            <p className="text-sm text-gray-600">
                                Return the item to the owner to receive the remaining part.
                            </p>
                        </>
                    )}
                    
                    {status === 'signing' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-blue-600">Signing Secret...</h3>
                            <p className="text-sm text-yellow-600">🔄 Signing secret to prove you found the item...</p>
                        </>
                    )}
                    
                    {status === 'need_signature' && (
                        <>
                            <h3 className="text-lg font-semibold mb-4 text-orange-600">Manual Signature Required</h3>
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
