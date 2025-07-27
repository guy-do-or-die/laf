import { useState, useEffect } from "react";
import { useParams } from "wouter";

import LostButton from "../components/pure/LostButton";

import { notify } from "../components/Notification";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { MapPin } from "lucide-react";

import {
    useReadLafItems,
    useReadLafItemStatus,
} from "../contracts"


import { useAccount } from "../wallet"
import { ItemStatus, getStatusName } from "../constants/itemStatus"
import { useBlockContext } from '../contexts/BlockContext';

export default function Lost() {
    const { secretHash } = useParams();
    const { blockNumber } = useBlockContext();

    const [itemStatus, setItemStatus] = useState();

    const [reward, setReward] = useState("1");
    const [geo, setGeo] = useState("");

    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const { address } = useAccount();
    
    // Get the specific Item contract address for this secretHash
    const { data: itemContractAddress } = useReadLafItems({
        args: [secretHash],
        enabled: !!secretHash
    });
    
    // Get the current status of the item
    const { data: itemStatusData } = useReadLafItemStatus({ 
        address: itemContractAddress, 
        blockNumber 
    });

    useEffect(() => {
        if (!!itemStatusData) {
            setItemStatus(itemStatusData);
        }
    }, [itemStatusData]);
    
    // Handle different item statuses
    
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
            
            <div className="w-full max-w-md space-y-4 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
                {/* Item Status Indicator */}
                {itemStatus !== undefined && (
                    <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm font-medium text-green-800">
                            Item Status: {getStatusName(itemStatus)}
                        </p>
                        <p className="text-xs text-green-600 mt-1">
                            ✅ This item is {itemStatus === ItemStatus.Registered ? 'registered' : 'returned'} and ready to be reported as lost
                        </p>
                    </div>
                )}
                <div className="space-y-2">
                    <Label htmlFor="reward">Reward (in USDC)</Label>
                    <Input
                        id="reward"
                        type="number"
                        placeholder="1"
                        step="1"
                        min="1"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">This USDC amount will be held in escrow and given as reward when found</p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="geo">Last Known Location</Label>
                    <div className="flex gap-2">
                        <Input
                            id="geo"
                            placeholder="e.g., New York, Central Park"
                            value={geo}
                            onChange={(e) => setGeo(e.target.value)}
                            className="flex-1"
                        />
                        <Button 
                            variant="outline" 
                            size="icon"
                            disabled={isGettingLocation}
                            onClick={() => {
                                setIsGettingLocation(true);
                                if (navigator.geolocation) {
                                    navigator.geolocation.getCurrentPosition(
                                        (position) => {
                                            const { latitude, longitude } = position.coords;
                                            setGeo(`${latitude.toFixed(6)}, ${longitude.toFixed(6)}`);
                                            setIsGettingLocation(false);
                                        },
                                        (error) => {
                                            console.error("Error getting location:", error);
                                            notify("Could not get your location", "error");
                                            setIsGettingLocation(false);
                                        },
                                        { enableHighAccuracy: true }
                                    );
                                } else {
                                    notify("Geolocation is not supported by your browser", "error");
                                    setIsGettingLocation(false);
                                }
                            }}
                            title="Use current location"
                        >
                            <MapPin className={isGettingLocation ? "animate-pulse" : ""} size={18} />
                        </Button>
                    </div>
                </div>
                { 
                    !itemContractAddress ? (
                        <div className="text-center text-gray-500">Loading item...</div>
                    ) : (
                        <LostButton
                            secretHash={secretHash}
                            reward={reward}
                            geo={geo}
                            className="w-full"
                        />
                    )
                }
            </div>
        </div>
    );
}