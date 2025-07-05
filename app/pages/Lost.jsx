
import { useParams } from "wouter";
import { useState } from "react";
import { parseEther } from "viem";

import TxButton from "../components/TxButton";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

import { useSimulateLafLost, useWriteLafLost } from "../contracts"

export default function Lost() {
    const { secretHash } = useParams();

    const [reward, setReward] = useState("0.001");
    const [geo, setGeo] = useState("");

    const rewardValue = reward ? parseEther(reward) : parseEther("0");
    
    const lostParams = {
        args: [secretHash, geo],
        value: rewardValue,
        enabled: reward !== "0" && geo.trim() !== ""
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
                        placeholder="0.001"
                        step="0.001"
                        min="0.001"
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                    />
                    <p className="text-sm text-gray-500">This amount will be sent as ETH to the contract</p>
                </div>
                
                <div className="space-y-2">
                    <Label htmlFor="geo">Last Known Location</Label>
                    <Input
                        id="geo"
                        placeholder="e.g., New York, Central Park"
                        value={geo}
                        onChange={(e) => setGeo(e.target.value)}
                    />
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