import { useRef, useEffect, useState } from 'react';
import { keccak256, stringToHex, getAddress } from 'viem';
import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import { Modal } from './ui/modal';
import { DescriptionField, SubmitButton } from './ui/form-field';
import { Button } from './ui/button';
import { Download, Printer } from 'lucide-react';
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
                                <DescriptionField
                                    label="Item Description"
                                    placeholder="Add a comment about your item..."
                                    value={comment}
                                    onChange={setComment}
                                    className="min-h-[200px]"
                                />
                                
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
                        <Button
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
                            className="flex items-center gap-2"
                            title="Download QR Code"
                        >
                            <Download className="w-4 h-4" />
                            Download QR
                        </Button>
                        <Button
                            onClick={() => window.print()}
                            variant="secondary"
                            className="flex items-center gap-2"
                            title="Print QR Code"
                        >
                            <Printer className="w-4 h-4" />
                            Print QR
                        </Button>
                    </div>
                    </>
                )}
            </div>
        </Modal>
    );
}