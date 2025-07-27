import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MapPin } from 'lucide-react';
import LostButton from './LostButton';
import { notify } from '@/components/Notification';

/**
 * Pure form component for reporting lost items
 * Handles reward input, geo location, and lost transaction
 * @param {Object} props - Component props
 * @param {string} props.secretHash - The secret hash of the item
 * @param {string} props.itemContractAddress - The contract address of the item
 * @param {number} props.itemStatus - The current status of the item
 * @returns {JSX.Element} The lost form component
 */
export default function LostForm({ secretHash, itemContractAddress, itemStatus }) {
    const [geo, setGeo] = useState("");
    const [reward, setReward] = useState("");
    const [isGettingLocation, setIsGettingLocation] = useState(false);

    // Validation - both fields must have valid values
    const isGeoValid = geo.trim().length > 0;
    const isRewardValid = reward && parseFloat(reward) >= 1;
    const isFormValid = isGeoValid && isRewardValid;

    const handleGetLocation = () => {
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
                    notify("Unable to get location. Please enter manually.", "error");
                    setIsGettingLocation(false);
                }
            );
        } else {
            notify("Geolocation is not supported by this browser.", "error");
            setIsGettingLocation(false);
        }
    };

    return (
        <div className="w-full max-w-md space-y-4 border-0 p-6 rounded-xl shadow-lg backdrop-blur-sm bg-white/95">
            {/* Item Status Indicator */}
            {itemStatus !== undefined && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm font-medium text-green-800">
                        Item Status: {itemStatus === 1 ? 'Registered' : itemStatus === 4 ? 'Returned' : 'Unknown'}
                    </p>
                    <p className="text-xs text-green-600 mt-1">
                        ✅ This item is {itemStatus === 1 ? 'registered' : 'returned'} and ready to be reported as lost
                    </p>
                </div>
            )}

            {/* Geo Location Input - First */}
            <div className="space-y-2">
                <Label htmlFor="geo">Last Known Location *</Label>
                <div className="flex gap-2">
                    <Input
                        id="geo"
                        placeholder="e.g., New York, Central Park"
                        value={geo}
                        onChange={(e) => setGeo(e.target.value)}
                        className={`flex-1 ${!isGeoValid && geo.length > 0 ? 'border-red-300' : ''}`}
                    />
                    <Button 
                        variant="outline" 
                        size="icon"
                        disabled={isGettingLocation}
                        onClick={handleGetLocation}
                        title="Get current location"
                    >
                        <MapPin className={`h-4 w-4 ${isGettingLocation ? 'animate-pulse' : ''}`} />
                    </Button>
                </div>
                <p className="text-sm text-gray-500">
                    Where was this item last seen? Click the location button to use GPS.
                </p>
            </div>
            
            {/* Reward Input - Second */}
            <div className="space-y-2">
                <Label htmlFor="reward">Reward (in USDC) *</Label>
                <Input
                    id="reward"
                    type="number"
                    placeholder="1"
                    step="1"
                    min="1"
                    value={reward}
                    onChange={(e) => setReward(e.target.value)}
                    className={!isRewardValid && reward.length > 0 ? 'border-red-300' : ''}
                />
                <p className="text-sm text-gray-500">
                    This USDC amount will be held in escrow and given as reward when found
                </p>
            </div>

            {/* Form Validation Message */}
            {!isFormValid && (geo.length > 0 || reward.length > 0) && (
                <div className="text-sm text-amber-600 bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="font-medium">Please complete all required fields:</p>
                    <ul className="mt-1 space-y-1">
                        {!isGeoValid && <li>• Enter a valid location</li>}
                        {!isRewardValid && <li>• Enter a reward amount (minimum 1 USDC)</li>}
                    </ul>
                </div>
            )}

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
