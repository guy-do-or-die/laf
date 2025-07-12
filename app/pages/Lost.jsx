
import { parseUnits } from "viem";

import { useState } from "react";
import { useParams, useLocation } from "wouter";

import TxButton from "../components/TxButton";
import { notify } from "../components/Notification";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";

import { MapPin } from "lucide-react";

import {
    useSimulateLafLost,
    useWriteLafLost,
    useReadUsdcAllowance,
    useSimulateUsdcApprove,
    useWriteUsdcApprove,
    lafAddress
} from "../contracts"

import { useSmartWalletWriteHook, chain } from "../wallet"

import { useAccount } from "../wallet"

export default function Lost() {
    const { secretHash } = useParams();
    const [, setLocation] = useLocation();

    const contractAddress = lafAddress?.[chain.id];

    const [reward, setReward] = useState("1");
    const [geo, setGeo] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const { address } = useAccount();
    const { data: allowance, refetch: refetchAllowance } = useReadUsdcAllowance({ args: [address, contractAddress] });

    const rewardValue = reward ? parseUnits(reward, 6) : parseUnits("0", 6);
    
    const allowanceParams = {
        args: [contractAddress, rewardValue],
        enabled: reward !== "0",
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('Approved!', 'success');
                refetchAllowance();
            }
        }
    };

    const lostParams = {
        args: [secretHash, rewardValue, geo],
        enabled: reward !== "0" && geo.trim() !== "" && allowance >= rewardValue,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('Item reported lost!', 'success');
                setLocation('/items');
            }
        }
    };

    return (
        <div className="flex flex-col items-center gap-8 p-4">
            <h1 className="text-2xl font-bold">Report Lost Item</h1>
            
            <div className="w-full max-w-md space-y-4 border p-6 rounded-lg shadow-md">
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
                    <p className="text-sm text-gray-500">This amount will be sent to the escrow contract</p>
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
                    allowance < rewardValue
                        ?
                    <TxButton
                        key="approve-button"
                        simulateHook={useSimulateUsdcApprove}
                        writeHook={useSmartWalletWriteHook(useWriteUsdcApprove)}
                        params={allowanceParams}
                        text="Approve" />
                        :
                    <TxButton
                        key="lost-button"
                        simulateHook={useSimulateLafLost}
                        writeHook={useSmartWalletWriteHook(useWriteLafLost)}
                        params={lostParams}
                        text="Find" />
                }
            </div>
        </div>
    );
}