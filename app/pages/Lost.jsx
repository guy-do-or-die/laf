

import { useState } from "react";
import { parseEther } from "viem";
import { useParams, useLocation } from "wouter";

import TxButton from "../components/TxButton";
import { notify } from "../components/Notification";

import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Button } from "../components/ui/button";
import { MapPin } from "lucide-react";

import { useSimulateLafLost, useWriteLafLost } from "../contracts"

export default function Lost() {
    const { secretHash } = useParams();
    const [, setLocation] = useLocation();

    const [reward, setReward] = useState("0.00001");
    const [geo, setGeo] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    const rewardValue = reward ? parseEther(reward) : parseEther("0");
    
    const lostParams = {
        args: [secretHash, geo],
        value: rewardValue,
        enabled: reward !== "0" && geo.trim() !== "",
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
                    <Label htmlFor="reward">Reward (in ETH)</Label>
                    <Input
                        id="reward"
                        type="number"
                        placeholder="0.00001"
                        step="0.00001"
                        min="0.00001"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                        className="retro-input"
                    />
                    <p className="text-sm text-gray-500">This amount will be sent as ETH to the contract</p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="geo">Last Known Location</Label>
                    <div className="flex gap-2">
                        <Input
                            id="geo"
                            placeholder="e.g., New York, Central Park"
                            value={geo}
                            onChange={(e) => setGeo(e.target.value)}
                            className="flex-1 retro-input"
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
                
                <TxButton
                    simulateHook={useSimulateLafLost}
                    writeHook={useWriteLafLost}
                    params={lostParams}
                    text="Find" />
            </div>
        </div>
    );
}