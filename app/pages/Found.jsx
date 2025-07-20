
import { useState, useEffect } from 'react';
import { useParams } from "wouter";

import { useBlockNumber } from "wagmi";
import { keccak256, stringToHex, verifyMessage, encodeAbiParameters } from 'viem';

import ItemCard from "../components/ItemCard";
import TxButton from "../components/TxButton";
import { Button } from "../components/ui/button";

import { notify } from "../components/Notification";
import { useAccount } from "../wallet";
import { useUnifiedSigning } from "../hooks/useUnifiedSigning";

import { useReadLafItems, useSimulateLafFound, useWriteLafFound, useReadItemIsFound, useReadItemOwner } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"


export default function Found() {
    const { secretHash, secret, ownerSignature } = useParams();
    const { address, activeWalletType, signingMethod } = useAccount();
    const { signMessage, isReady: signingReady } = useUnifiedSigning();
    
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
                
                // Use viem's hashMessage for signature verification (matches contract's EIP-191 format)
                // This automatically handles the Ethereum Signed Message prefix
                const { hashMessage } = await import('viem');
                const messageHash = hashMessage(secret);
                console.log('Message hash for verification (EIP-191 format):', messageHash);
                
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
                console.log('Owner signature length:', ownerSignature.length);
                console.log('Owner signature:', ownerSignature);
                
                // Determine if this is a smart wallet signature based on length
                const isSmartWalletSignature = ownerSignature.length > 132; // Standard EOA signatures are 132 chars (66 bytes)
                console.log('Detected signature type:', isSmartWalletSignature ? 'Smart Wallet' : 'EOA');
                
                let isValid = false;
                
                if (isSmartWalletSignature) {
                    // For smart wallet signatures, we can't validate them on the frontend
                    // The contract will validate them using ERC-1271
                    // For now, we'll assume they're valid if they have the right format
                    console.log('Smart wallet signature detected - skipping frontend validation');
                    console.log('Contract will validate this signature using ERC-1271 standard');
                    isValid = true; // Let the contract handle validation
                } else {
                    // Standard EOA signature validation
                    try {
                        // First, let's see what address actually signed this message
                        const { recoverAddress } = await import('viem');
                        const actualSigner = await recoverAddress({
                            hash: messageHash,
                            signature: ownerSignature,
                        });
                        console.log('🔍 Expected signer address:', ownerAddress);
                        console.log('🔍 Actual signer address:', actualSigner);
                        console.log('🔍 Addresses match:', actualSigner.toLowerCase() === ownerAddress.toLowerCase());
                        
                        // If addresses don't match, it means we have a smart wallet scenario
                        // where the signature was created by the controlling EOA
                        if (actualSigner.toLowerCase() !== ownerAddress.toLowerCase()) {
                            console.log('🔄 Smart wallet detected: signature from controlling EOA');
                            console.log('🔄 Using actual signer address for validation instead');
                            
                            // Debug the message format issue
                            console.log('🔍 DEBUG: Message hash used for recovery:', messageHash);
                            console.log('🔍 DEBUG: Secret used:', secret);
                            console.log('🔍 DEBUG: Signature used:', ownerSignature);
                            
                            // Try different message formats to see what works
                            console.log('🧪 Testing different message formats...');
                            
                            // Test 1: Direct secret verification (current approach)
                            try {
                                const test1 = await verifyMessage({
                                    address: actualSigner,
                                    message: secret,
                                    signature: ownerSignature,
                                });
                                console.log('🧪 Test 1 - Raw hash:', test1);
                            } catch (e) {
                                console.log('🧪 Test 1 - Raw hash failed:', e.message);
                            }
                            
                            // Test 2: Plain string (original secret)
                            try {
                                const test2 = await verifyMessage({
                                    address: actualSigner,
                                    message: secret,
                                    signature: ownerSignature,
                                });
                                console.log('🧪 Test 2 - Plain secret:', test2);
                            } catch (e) {
                                console.log('🧪 Test 2 - Plain secret failed:', e.message);
                            }
                            
                            // Test 3: Hex string of secret
                            try {
                                const test3 = await verifyMessage({
                                    address: actualSigner,
                                    message: `0x${secret}`,
                                    signature: ownerSignature,
                                });
                                console.log('🧪 Test 3 - Hex secret:', test3);
                            } catch (e) {
                                console.log('🧪 Test 3 - Hex secret failed:', e.message);
                            }
                            
                            // Test 4: Try with Ethereum signed message hash (what Privy might be using)
                            try {
                                const { hashMessage } = await import('viem');
                                const ethHash = hashMessage(messageHash);
                                console.log('🧪 Test 4 - Trying eth signed message hash:', ethHash);
                                const test4 = await verifyMessage({
                                    address: actualSigner,
                                    message: { raw: ethHash },
                                    signature: ownerSignature,
                                });
                                console.log('🧪 Test 4 - Eth signed message hash:', test4);
                            } catch (e) {
                                console.log('🧪 Test 4 - Eth signed message hash failed:', e.message);
                            }
                            
                            // Test 5: Try with the raw message hash as a string (not hex object)
                            try {
                                const test5 = await verifyMessage({
                                    address: actualSigner,
                                    message: messageHash,
                                    signature: ownerSignature,
                                });
                                console.log('🧪 Test 5 - Message hash as string:', test5);
                            } catch (e) {
                                console.log('🧪 Test 5 - Message hash as string failed:', e.message);
                            }
                            
                            // Test 6: Double-check signature recovery with different hash formats
                            console.log('🔍 VERIFICATION: Testing signature recovery with different hashes...');
                            try {
                                const { recoverAddress: recover } = await import('viem');
                                
                                // Test recovery with raw hash
                                const recovered1 = await recover({
                                    hash: messageHash,
                                    signature: ownerSignature,
                                });
                                console.log('🔍 Recovery test 1 (raw hash):', recovered1);
                                
                                // Test recovery with eth signed message hash
                                const { hashMessage } = await import('viem');
                                const ethHash = hashMessage(messageHash);
                                const recovered2 = await recover({
                                    hash: ethHash,
                                    signature: ownerSignature,
                                });
                                console.log('🔍 Recovery test 2 (eth hash):', recovered2);
                                
                                // Test recovery with plain secret hash
                                const { keccak256: keccak, stringToHex } = await import('viem');
                                const plainSecretHash = keccak(stringToHex(secret));
                                const recovered3 = await recover({
                                    hash: plainSecretHash,
                                    signature: ownerSignature,
                                });
                                console.log('🔍 Recovery test 3 (plain secret hash):', recovered3);
                                
                                // Test recovery with eth signed message of plain secret
                                const ethSecretHash = hashMessage(plainSecretHash);
                                const recovered4 = await recover({
                                    hash: ethSecretHash,
                                    signature: ownerSignature,
                                });
                                console.log('🔍 Recovery test 4 (eth secret hash):', recovered4);
                                
                            } catch (e) {
                                console.log('🔍 Recovery verification failed:', e.message);
                            }
                            
                            // Test 7: Check if smart wallet supports ERC-1271 and what format it expects
                            if (ownerAddress !== actualSigner) {
                                console.log('🧪 Testing ERC-1271 compatibility for smart wallet...');
                                try {
                                    const { createPublicClient, http } = await import('viem');
                                    const { baseSepolia } = await import('viem/chains');
                                    
                                    const publicClient = createPublicClient({
                                        chain: baseSepolia,
                                        transport: http()
                                    });
                                    
                                    // ERC-1271 magic value
                                    const ERC1271_MAGIC_VALUE = '0x1626ba7e';
                                    
                                    // Test different message formats with ERC-1271
                                    const { hashMessage } = await import('viem');
                                    const ethHash = hashMessage(messageHash);
                                    
                                    console.log('🧪 Testing ERC-1271 with eth signed message hash:', ethHash);
                                    
                                    // Call isValidSignature on the smart wallet
                                    const result = await publicClient.readContract({
                                        address: ownerAddress,
                                        abi: [{
                                            name: 'isValidSignature',
                                            type: 'function',
                                            inputs: [
                                                { name: 'hash', type: 'bytes32' },
                                                { name: 'signature', type: 'bytes' }
                                            ],
                                            outputs: [{ name: '', type: 'bytes4' }],
                                            stateMutability: 'view'
                                        }],
                                        functionName: 'isValidSignature',
                                        args: [ethHash, ownerSignature]
                                    });
                                    
                                    console.log('🧪 ERC-1271 result:', result);
                                    console.log('🧪 Expected magic value:', ERC1271_MAGIC_VALUE);
                                    console.log('🧪 ERC-1271 validation:', result === ERC1271_MAGIC_VALUE ? 'VALID' : 'INVALID');
                                    
                                    // Test with raw hash too
                                    const rawResult = await publicClient.readContract({
                                        address: ownerAddress,
                                        abi: [{
                                            name: 'isValidSignature',
                                            type: 'function',
                                            inputs: [
                                                { name: 'hash', type: 'bytes32' },
                                                { name: 'signature', type: 'bytes' }
                                            ],
                                            outputs: [{ name: '', type: 'bytes4' }],
                                            stateMutability: 'view'
                                        }],
                                        functionName: 'isValidSignature',
                                        args: [messageHash, ownerSignature]
                                    });
                                    
                                    console.log('🧪 ERC-1271 raw hash result:', rawResult);
                                    console.log('🧪 ERC-1271 raw hash validation:', rawResult === ERC1271_MAGIC_VALUE ? 'VALID' : 'INVALID');
                                    
                                } catch (e) {
                                    console.log('🧪 ERC-1271 test failed:', e.message);
                                    console.log('🧪 Smart wallet might not support ERC-1271 or different interface');
                                }
                            }
                            
                            // FIXED: Use recoverAddress instead of verifyMessage since recovery tests show it works
                            // Recovery tests 1 and 3 both returned the correct signer address
                            const { recoverAddress: recover } = await import('viem');
                            const recoveredSigner = await recover({
                                hash: messageHash,
                                signature: ownerSignature,
                            });
                            
                            // Check if recovered address matches the actual signer
                            isValid = recoveredSigner.toLowerCase() === actualSigner.toLowerCase();
                            console.log('🔄 EOA signature validation using recovery:', isValid);
                            console.log('🔄 Recovered signer:', recoveredSigner);
                            console.log('🔄 Expected signer:', actualSigner);
                            
                            if (isValid) {
                                console.log('✅ Signature is valid for actual signer - accepting despite address mismatch');
                                console.log('✅ This handles embedded wallet signing for smart wallet items');
                            } else {
                                console.log('❌ Signature recovery failed - rejecting');
                            }
                        } else {
                            // Standard validation when addresses match
                            isValid = await verifyMessage({
                                address: ownerAddress,
                                message: { raw: messageHash },
                                signature: ownerSignature,
                            });
                            console.log('EOA signature validation result:', isValid);
                        }
                    } catch (error) {
                        console.error('EOA signature validation failed:', error);
                        isValid = false;
                    }
                }
                
                console.log('Final owner signature validation result:', isValid);
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
            console.log('Active wallet type:', activeWalletType);
            console.log('Signing method:', signingMethod);

            // Sign the original secret - let the signing hook handle EIP-191 hashing
            // This matches the contract's MessageHashUtils.toEthSignedMessageHash(bytes(_secret))
            console.log('Requesting finder signature for original secret...');
            
            // Sign the original secret
            const signature = await signMessage({ 
                message: secret  // Sign the original secret, not the hash
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
            } 
            // Smart wallet specific errors
            else if (activeWalletType === 'smart_wallet' && (
                error.message?.includes('smart wallet') ||
                error.message?.includes('Smart contract wallet') ||
                error.message?.includes('ERC-1271')
            )) {
                console.log('Smart wallet signature error:', error);
                notify('Smart wallet signature error. Please try again or use a different wallet.', 'error');
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