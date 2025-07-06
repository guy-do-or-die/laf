import { useRef, useEffect, useState } from 'react';
import { keccak256, stringToHex, getAddress } from 'viem';
import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import { Modal } from './ui/modal';
import { Textarea } from './ui/textarea';
import TxButton from './TxButton';
import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from '../contracts';
import { notify } from './Notification';

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

export default function RegisterModal({ isOpen, onClose }) {
    const [itemData, setItemData] = useState(null);
    const [comment, setComment] = useState('');
    const qrRef = useRef(null);

    // Generate new item data when modal opens
    useEffect(() => {
        if (isOpen && !itemData) {
            const { secret, secretHash } = generateRandomSecret();
            const url = `${window.location.origin}/found/${secretHash}/${secret}`;
            const qrCode = new QRCodeStyling({ ...qrOptions, data: url });
            
            // Add a small delay to ensure QR code is fully generated
            setTimeout(() => {
                setItemData({ secret, secretHash, qrCode });
            }, 100);
        }
    }, [isOpen, itemData]);

    useEffect(() => {
        if (qrRef.current && itemData?.qrCode) {
            qrRef.current.innerHTML = '';
            itemData.qrCode.append(qrRef.current);
        }
    }, [itemData?.qrCode]);

    const handleClose = () => {
        setItemData(null);
        setComment('');
        onClose();
    };

    const registerParams = {
        args: itemData ? [itemData.secretHash, comment] : [],
        enabled: comment.length > 0 && itemData,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('Item registered successfully!', 'success');
                handleClose();
                // Trigger a refresh of the items list
                window.location.reload();
            }
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose}>
            <div className="">
                {itemData && (
                    <>
                        <div className="flex gap-8 items-start">
                            {/* QR Code Section */}
                            <div className="flex-shrink-0">
                                <div className="bg-white p-4 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                                    <div 
                                        ref={qrRef} 
                                        className="w-full h-full" 
                                    />
                                </div>
                            </div>
                            
                            {/* Form Section */}
                            <div className="flex-1 space-y-6">
                                <div className="space-y-3">
                                    <Textarea
                                        placeholder="Add a comment about your item..."
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        className="min-h-[200px] w-full"
                                    />
                                </div>
                                
                                <div className="flex justify-end">
                                    <TxButton
                                        simulateHook={useSimulateLafRegisterItem}
                                        writeHook={useWriteLafRegisterItem}
                                        params={registerParams}
                                        text="Register Item"
                                    />
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-6 flex gap-3 justify-center">
                        {/* Action Buttons Section */}
                        <button
                            onClick={() => {
                                try {
                                    if (itemData?.qrCode) {
                                        itemData.qrCode.download({ 
                                            name: `laf-item-${itemData.secretHash.slice(0, 8)}`, 
                                            extension: 'png' 
                                        });
                                    }
                                } catch (error) {
                                    console.error('Error downloading QR code:', error);
                                    notify('Failed to download QR code', 'error');
                                }
                            }}
                            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                            title="Download QR Code"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            Download QR
                        </button>
                        <button
                            onClick={() => window.print()}
                            className="flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg transition-colors font-medium"
                            title="Print QR Code"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                            </svg>
                            Print QR
                        </button>
                    </div>
                    </>
                )}
            </div>
        </Modal>
    );
}