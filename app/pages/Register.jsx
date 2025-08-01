import {useRef, useEffect, useState} from 'react';

import { useLocation } from 'wouter';

import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import TxButton from "../components/TxButton";

import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { RotateCcw, Download, Printer } from "lucide-react";
import { notify } from '../components/Notification';

import { useSimulateLafRegister, useWriteLafRegister } from "../contracts"
import { useSmartWalletSimulateHook, useSmartWalletWriteHook } from "../wallet"
import { useAccount } from "../wallet"

import { useSmartWalletDeployment } from "../hooks/useSmartWalletDeployment";

import { generateRandomSecret } from '@/services/secretService';


export default function Register() {
    const [, setLocation] = useLocation();
    const { loggedIn } = useAccount();
    const { isDeploying: isDeployingWallet, isReady: walletReady } = useSmartWalletDeployment();
    
    const [itemData, setItemData] = useState(() => {
        const result = generateRandomSecret();
        if (!result.success) {
            console.error('Failed to generate random secret:', result.error);
            return { secret: '', secretHash: '', qrCode: null };
        }
        const { secret, secretHash } = result.data;
        return { secret, secretHash, qrCode: null };
    });

    const [comment, setComment] = useState('');
    const [isGeneratingQR, setIsGeneratingQR] = useState(false);
    const [qrGenerated, setQrGenerated] = useState(false);
    
    const qrRef = useRef(null);
    const generationAttemptRef = useRef(false); // Prevent double execution
    
    // Function to generate QR code
    const generateQR = async () => {
        // Prevent double execution (React strict mode)
        if (generationAttemptRef.current) {
            console.log('QR generation already in progress, skipping');
            return;
        }
        
        if (!loggedIn) {
            console.log('Wallet not connected');
            notify('Please connect your wallet first.', 'error');
            return;
        }
        
        // Wait for smart wallet to be ready if needed
        if (!walletReady) {
            console.log('Smart wallet not ready yet, waiting...');
            notify('Preparing smart wallet...', 'info');
            return;
        }
        
        generationAttemptRef.current = true;
        setIsGeneratingQR(true);
        
        try {
            console.log('Generating QR code...');
            console.log('Secret:', itemData.secret);
            console.log('Secret hash:', itemData.secretHash);
            
            const url = `${window.location.origin}/found/${itemData.secretHash}/${itemData.secret}`;
            const qrCode = new QRCodeStyling({ ...qrOptions, data: url });
            
            setItemData(prev => ({
                ...prev,
                qrCode
            }));
            
            setQrGenerated(true);
            
            console.log('Found URL:', url);
            console.log('Loost URL:', `${window.location.origin}/lost/${itemData.secretHash}`);
            console.log('QR code ready!');
        } catch (error) {
            console.error('Error generating QR code:', error);
            notify('Failed to generate QR code. Please try again.', 'error');
        } finally {
            setIsGeneratingQR(false);
            generationAttemptRef.current = false;
        }
    };
    
    // Function to regenerate QR code
    const regenerateQRCode = async () => {
        console.log('🔄 Regenerating QR code');
        
        // Clear the QR container immediately to prevent side-by-side display
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
        }
        
        // Reset QR state
        setQrGenerated(false);
        generationAttemptRef.current = false;
        
        // Generate new secret and QR code
        const result = generateRandomSecret();
        if (!result.success) {
            console.error('Failed to generate random secret:', result.error);
            notify('Failed to generate new secret. Please try again.', 'error');
            return;
        }

        const { secret, secretHash } = result.data;
        setItemData({
            secret,
            secretHash,
            qrCode: null
        });
        
        // Generate new QR code
        await generateQR();
    };
    
    // Auto-generate QR when wallet is ready
    useEffect(() => {
        // Only attempt QR generation if:
        // 1. Wallet is connected
        // 2. Wallet is ready
        // 3. Not currently generating
        // 4. Haven't generated yet
        if (loggedIn && walletReady && !isGeneratingQR && !qrGenerated) {
            console.log('Wallet connected and ready, generating QR code...');
            generateQR();
        } else if (!loggedIn && qrGenerated) {
            console.log('Wallet disconnected, resetting QR state');
            // Reset state if wallet disconnects
            setQrGenerated(false);
            generationAttemptRef.current = false;
        }
    }, [loggedIn, isGeneratingQR, qrGenerated, walletReady]);
    
    useEffect(() => {
        if (qrRef.current && itemData.qrCode) {
            qrRef.current.innerHTML = '';
            itemData.qrCode.append(qrRef.current);
        }
    }, [itemData.qrCode]);

    const registerParams = {
        args: [itemData.secretHash, comment],
        enabled: comment.length > 0 && qrGenerated && walletReady,
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
                
                {!qrGenerated ? (
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
                    {qrGenerated ? 'Click QR code to download, or use buttons below' : 
                     isGeneratingQR ? 'Generating your QR code...' :
                     !loggedIn ? 'Please connect your wallet to continue' :
                     'Loading your item QR'}
                </p>
                
                {/* QR Action Buttons */}
                {loggedIn && qrGenerated && (
                    <div className="flex justify-center gap-2 mb-4">
                        <Button
                            onClick={regenerateQRCode}
                            disabled={isGeneratingQR}
                            variant="outline"
                            size="sm"
                            title="Generate new QR code"
                        >
                            <RotateCcw className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => {
                                if (itemData.qrCode) {
                                    itemData.qrCode.download({ 
                                        name: `laf-item-${itemData.secretHash.slice(0, 8)}`, 
                                        extension: 'png' 
                                    });
                                }
                            }}
                            variant="outline"
                            size="sm"
                            title="Download QR code"
                        >
                            <Download className="h-4 w-4" />
                        </Button>
                        <Button
                            onClick={() => {
                                if (qrRef.current) {
                                    const printWindow = window.open('', '_blank');
                                    printWindow.document.write(`
                                        <html>
                                            <head><title>LAF Item QR Code</title></head>
                                            <body style="display: flex; justify-content: center; align-items: center; height: 100vh; margin: 0;">
                                                ${qrRef.current.innerHTML}
                                            </body>
                                        </html>
                                    `);
                                    printWindow.document.close();
                                    printWindow.print();
                                }
                            }}
                            variant="outline"
                            size="sm"
                            title="Print QR code"
                        >
                            <Printer className="h-4 w-4" />
                        </Button>
                    </div>
                )}
                
                <div className="mb-4">
                    <Textarea
                        placeholder="Describe your item in a few words..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={!qrGenerated}
                    />
                </div>
                
                <div className="flex flex-col gap-2 items-center">
                    <TxButton
                        simulateHook={useSmartWalletSimulateHook(useSimulateLafRegister)}
                        writeHook={useSmartWalletWriteHook(useWriteLafRegister)}
                        params={registerParams}
                        text={isDeployingWallet ? "Preparing Wallet..." : "Register"}
                        disabled={!walletReady || isDeployingWallet}
                    />
                </div>
            </div>
        </div>
    )
}
