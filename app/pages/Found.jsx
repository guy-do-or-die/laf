
import { useState, useEffect } from 'react';
import { useParams } from "wouter";

import { useBlockNumber } from "wagmi";
import { useSignMessage } from 'wagmi';
import { keccak256, stringToHex, verifyMessage } from 'viem';

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { Button } from "../components/ui/button";

import { notify } from "../components/Notification";
import { useAccount } from "../wallet";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound, useReadItemOwner } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"


export default function Found() {
    const { secretHash, secret, ownerSignature } = useParams();
    const { address } = useAccount();
    const { signMessageAsync } = useSignMessage();
    
    const [finderSignature, setFinderSignature] = useState(null);
    const [isSigningSecret, setIsSigningSecret] = useState(false);
    const [secretSigned, setSecretSigned] = useState(false);
    const [ownerSignatureValid, setOwnerSignatureValid] = useState(null); // null = not checked, true/false = result

    const { data: blockNumber, refetch: refetchBlockNumber } = useBlockNumber()
    const { data: itemAddress } = useReadLafItems({ args: [secretHash] });
    const { data: isFound } = useReadItemIsFound({ address: itemAddress });
    const { data: ownerAddress } = useReadItemOwner({ address: itemAddress });
    
    // Validate owner signature when component mounts
    useEffect(() => {
        const validateOwnerSignature = async () => {
            if (!ownerSignature || !secret) {
                setOwnerSignatureValid(false);
                return;
            }
            
            try {
                console.log('Validating owner signature...');
                
                // Use raw hash validation (same as contract)
                const messageHash = keccak256(stringToHex(secret));
                console.log('Message hash for validation:', messageHash);
                
                // Get the item owner address from the contract
                if (!itemAddress || itemAddress === '0x0000000000000000000000000000000000000000') {
                    console.log('Item not found in contract, signature cannot be validated');
                    setOwnerSignatureValid(false);
                    return;
                }
                
                if (!ownerAddress || ownerAddress === '0x0000000000000000000000000000000000000000') {
                    console.log('Owner address not found in item contract, signature cannot be validated');
                    setOwnerSignatureValid(false);
                    return;
                }
                
                console.log('Verifying signature against owner address:', ownerAddress);
                
                // Verify the signature matches the owner's wallet address
                const isValid = await verifyMessage({
                    address: ownerAddress,
                    message: { raw: messageHash },
                    signature: ownerSignature,
                });
                
                console.log('Owner signature validation result:', isValid);
                setOwnerSignatureValid(isValid);
                
            } catch (error) {
                console.error('Error validating owner signature:', error);
                setOwnerSignatureValid(false);
            }
        };
        
        if (ownerSignature && secret && itemAddress && ownerAddress) {
            validateOwnerSignature();
        }
    }, [ownerSignature, secret, secretHash, itemAddress, ownerAddress]);
    
    // Function to sign the secret as the finder
    const signSecretAsFinder = async () => {
        if (!address || isSigningSecret || secretSigned) return;
        
        setIsSigningSecret(true);
        try {
            console.log('Finder signing secret:', secret);
            console.log('Secret hash:', secretHash);
            
            // Sign the raw hash of the secret (contract compatible)
            const messageHash = keccak256(stringToHex(secret));
            console.log('Message hash for finder signature:', messageHash);
            
            console.log('Requesting finder signature for raw hash...');
            const signature = await signMessageAsync({ 
                message: { raw: messageHash }
            });
            
            console.log('Finder signature received:', signature);
            setFinderSignature(signature);
            setSecretSigned(true);
            
        } catch (error) {
            console.error('Error signing secret as finder:', error);
            if (error.message?.includes('User rejected') || 
                error.message?.includes('User denied') || 
                error.message?.includes('User cancelled') ||
                error.name === 'UserRejectedRequestError') {
                notify('Signature cancelled by user', 'error');
            } else {
                notify('Failed to sign secret. Please try again.', 'error');
            }
        } finally {
            setIsSigningSecret(false);
        }
    };

    const foundParams = {
        args: secretSigned && ownerSignature && finderSignature ? 
            [secretHash, secret, ownerSignature, finderSignature] : 
            [secretHash, secret],
        enabled: !isFound && secretSigned && ownerSignature && finderSignature,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('The owner has been informed!', 'success');
                refetchBlockNumber();
                setFinderSignature(null);
                setSecretSigned(false);
            }
        }
    };
    
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Found Item</h1>
            
            <div className="w-full max-w-md space-y-4">
                <div className="mb-4">
                    <ItemCard
                        hash={secretHash}
                        address={itemAddress}
                        blockNumber={blockNumber}
                    />
                </div>
                
                {
                    isFound ?
                        <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                            <p className="mb-4 text-sm text-gray-600">
                                Return the item to the owner to receive the remaining part.
                            </p>
                        </div>
                        :
                        <div className="space-y-4">
                            {!ownerSignature ? (
                                <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                                    <h3 className="text-lg font-semibold mb-4 text-red-600">Invalid QR Code</h3>
                                    <p className="text-sm text-gray-600">
                                        This QR code doesn't contain the owner's signature. Please make sure you're scanning 
                                        a valid LAF QR code that was generated after the owner signed their secret.
                                    </p>
                                </div>
                            ) : !secretSigned ? (
                                <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                                    <h3 className="text-lg font-semibold mb-4">Step 1: Sign the Secret</h3>
                                    <p className="mb-4 text-sm text-gray-600">
                                        You've found this item! To confirm and receive your reward, you need to sign the secret 
                                        to prove you have access to the QR code.
                                    </p>
                                    
                                    {ownerSignatureValid === null ? (
                                        <p className="mb-4 text-sm text-yellow-600">
                                            🔍 Validating owner signature...
                                        </p>
                                    ) : ownerSignatureValid ? (
                                        <p className="mb-4 text-sm text-green-600">
                                            ✅ Owner signature verified
                                        </p>
                                    ) : (
                                        <p className="mb-4 text-sm text-red-600">
                                            ❌ Invalid owner signature - this QR code may be tampered with
                                        </p>
                                    )}
                                    
                                    <div className="flex justify-center">
                                        <Button 
                                            onClick={signSecretAsFinder}
                                            disabled={!address || isSigningSecret || !ownerSignatureValid}
                                            className="px-6 py-2"
                                        >
                                            {isSigningSecret ? 'Signing...' : 'Sign Secret as Finder'}
                                        </Button>
                                    </div>
                                    {!address && (
                                        <p className="text-sm text-red-600 mt-2 text-center">
                                            Please connect your wallet first
                                        </p>
                                    )}
                                    {!ownerSignatureValid && ownerSignatureValid !== null && (
                                        <p className="text-sm text-red-600 mt-2 text-center">
                                            Cannot proceed - owner signature is invalid
                                        </p>
                                    )}
                                </div>
                            ) : (
                                <div className="border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                                    <h3 className="text-lg font-semibold mb-4">Step 2: Confirm Found</h3>
                                    <p className="mb-2 text-sm text-green-600">
                                        ✅ Owner signature verified
                                    </p>
                                    <p className="mb-4 text-sm text-green-600">
                                        ✅ Finder signature completed
                                    </p>
                                    <p className="mb-4 text-sm text-gray-600">
                                        Both signatures are ready! Click below to confirm you found this item and receive your immediate reward.
                                    </p>
                                    <div className="flex justify-center">
                                        <TxButton
                                            simulateHook={useSmartWalletSimulateHook(useSimulateLafFound)}
                                            writeHook={useSmartWalletWriteHook(useWriteLafFound)}
                                            params={foundParams}
                                            text="Confirm Found" 
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                }
            </div>
        </div>
    );
}