import { useState, useEffect } from "react";
import { useParams } from "wouter";

import {
    useReadLafItems,
    useReadLafItemStatus,
} from "../contracts"


import { ItemStatus, getStatusName } from "../constants/itemStatus"
import { useBlockContext } from '../contexts/BlockContext';

import LostForm from "../components/pure/LostForm";

export default function Lost() {
    const { secretHash } = useParams();
    const { blockNumber } = useBlockContext();

    const [itemStatus, setItemStatus] = useState();
    
    const { data: itemContractAddress } = useReadLafItems({
        args: [secretHash],
        enabled: !!secretHash
    });
    
    const { data: itemStatusData } = useReadLafItemStatus({ 
        address: itemContractAddress, 
        blockNumber 
    });

    useEffect(() => {
        if (!!itemStatusData) {
            setItemStatus(itemStatusData);
        }
    }, [itemStatusData]);
    
    if (!itemContractAddress) {
        return (
            <div className="flex flex-col items-center gap-8 p-4">
                <h1 className="text-2xl font-bold">Item Not Found</h1>
                <div className="w-full max-w-md space-y-4 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                    <h3 className="text-lg font-semibold mb-4 text-red-600">Item Not Registered</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        This item has not been registered in the LAF system yet, or the QR code is invalid.
                    </p>
                    <p className="text-xs text-gray-500">
                        Secret Hash: {secretHash}
                    </p>
                </div>
            </div>
        );
    }

    if (itemStatus !== undefined && itemStatus !== ItemStatus.Registered && itemStatus !== ItemStatus.Returned) {
        const statusName = getStatusName(itemStatus);

        return (
            <div className="flex flex-col items-center gap-8 p-4">
                <h1 className="text-2xl font-bold">Cannot Report as Lost</h1>
                <div className="w-full max-w-md space-y-4 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                    <h3 className="text-lg font-semibold mb-4 text-orange-600">Item Status: {statusName}</h3>
                    <p className="text-sm text-gray-600 mb-4">
                        {itemStatus === ItemStatus.Lost && "This item has already been reported as lost."}
                        {itemStatus === ItemStatus.Found && "This item has already been found."}
                        {itemStatus === ItemStatus.None && "This item is not in a valid state."}
                    </p>
                    <p className="text-xs text-gray-500">
                        Only registered or returned items can be reported as lost.
                    </p>
                </div>
            </div>
        );
    }


    
    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Report Lost Item</h1>
            
            <LostForm
                secretHash={secretHash}
                itemContractAddress={itemContractAddress}
                itemStatus={itemStatus}
            />
        </div>
    );
}