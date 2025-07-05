import {useRef, useEffect, useState} from 'react';

import { keccak256, stringToHex, getAddress } from 'viem';

import QRCodeStyling from 'qr-code-styling';
import qrOptions from '../../qr-options.json';

import { Textarea } from "../components/ui/textarea";

import TxButton from "../components/TxButton";

import { useSimulateLafRegisterItem, useWriteLafRegisterItem } from "../contracts"


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
    const [itemData] = useState(() => {
        const { secret, secretHash } = generateRandomSecret();
        
        const qrCode = new QRCodeStyling({
            ...qrOptions,
            data: `${window.location.origin}/found/${secretHash}/${secret}`,
        });
        
        return { secret, secretHash, qrCode };
    });

    const [comment, setComment] = useState('');
    
    const qrRef = useRef(null);
    
    useEffect(() => {
        if (qrRef.current) {
            qrRef.current.innerHTML = '';
            itemData.qrCode.append(qrRef.current);
        }
    }, [itemData.qrCode]);

    const params = {args: [itemData.secretHash, comment], enabled: comment.length > 0}

    return (
        <div className="flex flex-col items-center gap-8">
            <h2 className="text-2xl font-bold">Register a New Item</h2>
            
            <div className="border p-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">Your Item's QR Code</h3>
                <div 
                    ref={qrRef} 
                    className="mb-4 cursor-pointer" 
                    onClick={() => {
                        itemData.qrCode.download({ 
                            name: `laf-item-${itemData.secretHash.slice(0, 8)}`, 
                            extension: 'png' 
                        });
                    }}
                    title="Click to download QR code"
                ></div>
                <p className="text-sm text-gray-600">The code is not being saved anywhere</p>
                <p className="text-sm text-gray-600 mb-4">Click to download</p>
                
                <div className="mb-4">
                    <Textarea
                        placeholder="Comment"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                    />
                </div>
                
                <div className="flex justify-center">
                    <TxButton
                        simulateHook={useSimulateLafRegisterItem}
                        writeHook={useWriteLafRegisterItem}
                        params={params}
                        text="Register Item"
                    />
                </div>
            </div>
        </div>
    )
}