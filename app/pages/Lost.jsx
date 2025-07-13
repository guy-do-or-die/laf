
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
    useReadErc20Allowance,
    useSimulateErc20Approve,
    useWriteErc20Approve,
    useSimulateLafLost,
    useWriteLafLost,
    useReadLafItems,
    lafAddress
} from "../contracts"

import { useSmartWalletWriteHook, useSmartWalletSimulateHook, chain } from "../wallet"
import { useSmartWallets } from '@privy-io/react-auth/smart-wallets';

import { useAccount } from "../wallet"

export default function Lost() {
    const { secretHash } = useParams();
    const [, setLocation] = useLocation();

    const contractAddress = lafAddress?.[chain.id];

    const [reward, setReward] = useState("1");
    const [geo, setGeo] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const { address } = useAccount();
    const { client: smartWalletClient } = useSmartWallets();
    const isSmartWallet = !!smartWalletClient;
    
    // Get the specific Item contract address for this secretHash
    const { data: itemContractAddress } = useReadLafItems({
        args: [secretHash],
        enabled: !!secretHash
    });
    
    // Item contract does the transferFrom, so approve the Item contract
    const approvalTarget = itemContractAddress;
    
    const { data: allowance, refetch: refetchAllowance } = useReadErc20Allowance({ 
        args: [address, approvalTarget],
        enabled: !!approvalTarget
    });

    const rewardValue = reward ? parseUnits(reward, 6) : parseUnits("0", 6);
    
    // Debug info
    console.log('Debug Lost.jsx:', {
        address,
        isSmartWallet,
        smartWalletClient: !!smartWalletClient,
        allowance,
        rewardValue,
        itemContractAddress,
        approvalTarget
    });
    
    const allowanceParams = {
        args: [approvalTarget, rewardValue],
        enabled: reward !== "0" && !!approvalTarget,
        confirmationCallback: ({ data, error }) => {
            if (!error && data) {
                notify('Approved!', 'success');
                refetchAllowance();
            }
        }
    };

    const lostParams = {
        args: [secretHash, rewardValue, geo],
        enabled: reward !== "0" && geo.trim() !== "" && !!itemContractAddress && allowance >= rewardValue,
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
            
            <div className="w-full max-w-md space-y-4 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
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
                    ) : allowance < rewardValue ? (
                        <TxButton
                            key="approve-button"
                            simulateHook={useSmartWalletSimulateHook(useSimulateErc20Approve)}
                            writeHook={useSmartWalletWriteHook(useWriteErc20Approve)}
                            params={allowanceParams}
                            text="Approve" />
                    ) : (
                        <TxButton
                            key="lost-button"
                            simulateHook={useSmartWalletSimulateHook(useSimulateLafLost)}
                            writeHook={useSmartWalletWriteHook(useWriteLafLost)}
                            params={lostParams}
                            text="Find" />
                    )
                }
            </div>
        </div>
    );
}