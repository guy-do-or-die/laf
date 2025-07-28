import { useState, useEffect } from 'react';

import { getStatusName, ItemStatus } from '@/constants/itemStatus';
import { Badge } from '@/components/ui/badge';
import { Modal } from '@/components/ui/modal';
import { MapPin, DollarSign } from 'lucide-react';
import { Map, MapSkeleton } from '@/components/ui/map';
import { decodeGeohash, isValidGeohash, reverseGeocode } from '@/services/geoService';

/**
 * Pure UI component for displaying item information
 * Only handles presentation, no business logic or data fetching
 * @param {Object} props - Component props
 * @param {Object} props.itemData - Item business data
 * @param {boolean} props.isLoading - Loading state
 */
export default function ItemDetails({ itemData, isLoading }) {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [mapPosition, setMapPosition] = useState(null);
    const [locationAddress, setLocationAddress] = useState('');

    if (isLoading) {
        return null; // Skeleton is handled in ItemContainer
    }

    // Enhanced status badge styling with contrasting colors for visibility
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case ItemStatus.None:
                return "bg-slate-100 text-slate-800 border-slate-300";
            case ItemStatus.Registered:
                return "bg-indigo-100 text-indigo-800 border-indigo-300";
            case ItemStatus.Lost:
                return "bg-orange-100 text-orange-800 border-orange-300";
            case ItemStatus.Found:
                return "bg-emerald-100 text-emerald-800 border-emerald-300";
            case ItemStatus.Returned:
                return "bg-purple-100 text-purple-800 border-purple-300";
            default:
                return "bg-slate-100 text-slate-800 border-slate-300";
        }
    };

    // Decode geohash and get location data when modal opens
    useEffect(() => {
        if (isMapModalOpen && itemData.geo && isValidGeohash(itemData.geo)) {
            try {
                const decoded = decodeGeohash(itemData.geo);
                const position = [decoded.latitude, decoded.longitude];
                setMapPosition(position);
                
                // Get human-readable address
                reverseGeocode(decoded.latitude, decoded.longitude)
                    .then(address => setLocationAddress(address))
                    .catch(error => {
                        console.warn('Failed to get address:', error);
                        setLocationAddress(`${decoded.latitude.toFixed(6)}, ${decoded.longitude.toFixed(6)}`);
                    });
            } catch (error) {
                console.error('Failed to decode geohash:', error);
                setLocationAddress('Invalid location data');
            }
        }
    }, [isMapModalOpen, itemData.geo]);

    const handleLocationClick = () => {
        setIsMapModalOpen(true);
    };

    return (
        <>
            <div className="flex flex-col h-full">
                {/* Item Title */}
                <div className="mb-3">
                    <h3 className="text-lg font-bold text-gray-900 leading-tight truncate group-hover:text-gray-700 transition-colors duration-200">
                        {itemData.comment || 'Untitled Item'}
                    </h3>
                </div>

                {/* Inline Badges - Centered in remaining space */}
                <div className="flex justify-center items-center gap-2 flex-1">
                    {/* Status Badge */}
                    <Badge 
                        className={`text-sm font-semibold px-3 py-1.5 border ${getStatusBadgeStyle(itemData.status)} shadow-sm`}
                    >
                        {getStatusName(itemData.status)}
                    </Badge>

                    {/* Reward Badge */}
                    {itemData.hasReward ? (
                        <Badge 
                            variant="outline"
                            className="text-sm font-medium px-3 py-1.5 bg-green-50 text-green-700 border-green-300 shadow-sm"
                        >
                            <DollarSign className="h-4 w-4 mr-1.5 text-green-600" />
                            {itemData.formattedReward}
                        </Badge>
                    ) : null}

                    {/* Location Badge - Icon Only, Clickable */}
                    {itemData.geo ? (
                        <Badge 
                            variant="outline"
                            className="text-sm font-medium px-4 py-2.5 bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200 shadow-sm flex items-center justify-center"
                            onClick={handleLocationClick}
                            title="View location on map"
                        >
                            <MapPin className="h-4 w-4 text-gray-500" />
                        </Badge>
                    ) : null}
                </div>
            </div>

            {/* Location Map Modal */}
            <Modal
                isOpen={isMapModalOpen}
                onClose={() => setIsMapModalOpen(false)}
                title="Item Location"
                className="max-w-2xl"
            >
                <div className="space-y-4">
                    {/* Address Display */}
                    <div className="flex items-center gap-2 text-gray-700 bg-gray-50 rounded-lg p-3">
                        <MapPin className="h-4 w-4 text-gray-500 flex-shrink-0" />
                        <span className="font-medium text-sm">
                            {locationAddress || 'Loading address...'}
                        </span>
                    </div>
                    
                    {/* Interactive Map */}
                    {mapPosition ? (
                        <Map 
                            center={mapPosition}
                            position={mapPosition}
                            zoom={15}
                            height="h-80"
                            interactive={false}
                            showZoomControl={true}
                        />
                    ) : (
                        <MapSkeleton height="h-80" />
                    )}
                    
                    {/* Map Info */}
                    <div className="text-xs text-gray-500 text-center">
                        This shows the location where the item was registered or last reported
                    </div>
                </div>
            </Modal>
        </>
    );
}
