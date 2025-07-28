import { useState } from 'react';
import { formatUnits } from 'viem';

import { cn } from '@/lib/utils';

import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useBalance, hasSufficientBalance } from '@/hooks/useBalance';
import { useLafConfig } from '@/contexts/LafConfigContext';

import LostButton from '@/components/pure/LostButton';
import LocationPicker from '@/components/pure/LocationPicker';
import { DollarSign } from 'lucide-react';


/**
 * Pure form component for reporting lost items
 * Handles reward input, geo location, and lost transaction
 * @param {Object} props - Component props
 * @param {string} props.secretHash - The secret hash of the item
 * @param {string} props.itemContractAddress - The contract address of the item
 * @param {number} props.itemStatus - The current status of the item
 * @returns {JSX.Element} The lost form component.
 */
export default function LostForm({ secretHash, itemContractAddress, itemStatus }) {
    const [geo, setGeo] = useState("");
    const [reward, setReward] = useState("");

    const { balance, balanceInUSDC } = useBalance();
    const { minReward, rewardTokenDecimals, isConfigReady } = useLafConfig();

    const rewardAmount = reward ? parseFloat(reward) : 0;
    const minRewardInUSDC = minReward ? parseFloat(formatUnits(minReward, rewardTokenDecimals)) : 1;
    const hasEnoughBalance = hasSufficientBalance(balance, rewardAmount);
 
    const isGeoValid = geo && geo.trim().length > 0;
    const isRewardValid = reward && parseFloat(reward) >= minRewardInUSDC;
    const isFormValid = isGeoValid && isRewardValid && hasEnoughBalance && isConfigReady;

    return (
        <div className="w-full max-w-md space-y-6 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
            {/* Form Status Messages */}
            {!isFormValid && (geo.length > 0 || reward.length > 0) ? (
                <div className="min-h-20 mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg flex flex-col justify-center">
                    <p className="text-sm font-medium text-amber-800">Please complete all required fields:</p>
                    <ul className="mt-1 space-y-1 text-xs text-amber-600">
                        {!isGeoValid && <li>• Enter a valid location</li>}
                        {!isRewardValid && <li>• Enter a reward amount (minimum $${minRewardInUSDC.toFixed(2)})</li>}
                        {isRewardValid && !hasEnoughBalance && (
                            <li>• Insufficient balance (${balanceInUSDC.toFixed(2)} available)</li>
                        )}
                    </ul>
                </div>
            ) : isFormValid ? (
                <div className="min-h-20 mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg flex flex-col justify-center">
                    <p className="text-sm font-medium text-blue-800">
                        🎯 Ready to report as lost!
                    </p>
                    <p className="text-xs text-blue-600 mt-1">
                        All fields completed. Click <b>Find</b> to start the lost transaction.
                    </p>
                </div>
            ) : itemStatus !== undefined && (
                <div className="min-h-20 mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex flex-col justify-center">
                    <p className="text-sm font-medium text-green-800">
                        {itemStatus === 1 ? 'Registered' : itemStatus === 4 ? 'Returned' : 'Unknown'}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        ✅ Fill the data and click <b>Find</b> if you lost it
                    </p>
                </div>
            )}

            {/* Location Picker - First */}
            <LocationPicker
                value={geo}
                onChange={setGeo}
                placeholder="Last known location"
            />
            
            {/* Reward Input - Second */}
            <div className="space-y-2">
                <div className="relative">
                    {/* Dollar Sign Icon */}
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                    </div>
                    
                    <Input
                        id="reward"
                        type="number"
                        placeholder={`Reward amount`}
                        step="0.01"
                        min={minRewardInUSDC}
                        value={reward}
                        onChange={(e) => setReward(e.target.value)}
                        style={{ 
                            fontSize: '1rem',
                        }}
                        className={cn(
                            "h-12 placeholder:text-left pl-10",
                            !isRewardValid && reward.length > 0 ? 'border-red-300' : ''
                        )}
                    />
                </div>
                
                {/* Quick Amount Buttons */}
                <div className="flex gap-2">
                    {[5, 10, 50, 100].map(amount => (
                        <Button
                            key={amount}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setReward(amount.toString())}
                            className="flex-1 text-xs px-3 py-1"
                        >
                            {amount}
                        </Button>
                    ))}
                    <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setReward(balanceInUSDC?.toString() || '0')}
                        className="flex-1 text-xs px-3 py-1"
                        disabled={!balanceInUSDC || balanceInUSDC === 0}
                    >
                        Max
                    </Button>
                </div>
                
                <p className="text-sm text-gray-500">
                    Held in escrow — refundable until item is found, else released to finder upon return
                </p>
            </div>

            {/* Lost Button */}
            <div className="pt-4">
                <LostButton
                    secretHash={secretHash}
                    itemContractAddress={itemContractAddress}
                    reward={reward}
                    geo={geo}
                    disabled={!isFormValid}
                />
            </div>
        </div>
    );
}
