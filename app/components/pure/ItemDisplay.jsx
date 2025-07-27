import { useState, useEffect } from 'react';

import { getStatusName } from '@/constants/itemStatus';
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
export default function ItemDisplay({ itemData, isLoading }) {
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [mapPosition, setMapPosition] = useState(null);
    const [locationAddress, setLocationAddress] = useState('');

    if (isLoading) {
        return null; // Skeleton is handled in ItemContainer
    }

    // Enhanced status badge styling with color coding
    const getStatusBadgeStyle = (status) => {
        switch (status) {
            case 0: // Registered
                return "bg-blue-100 text-blue-800 border-blue-200";
            case 1: // Lost
                return "bg-red-100 text-red-800 border-red-200";
            case 2: // Found
                return "bg-yellow-100 text-yellow-800 border-yellow-200";
            case 3: // Returned
                return "bg-green-100 text-green-800 border-green-200";
            default:
                return "bg-gray-100 text-gray-800 border-gray-200";
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
            <div className="space-y-3">
                {/* Item Title */}
                <div>
                    <h3 className="text-lg font-bold text-gray-900 leading-tight line-clamp-2 group-hover:text-gray-700 transition-colors duration-200">
                        {itemData.comment || 'Untitled Item'}
                    </h3>
                </div>

                {/* Inline Badges */}
                <div className="flex justify-between items-center gap-1">
                    {/* Status Badge */}
                    <Badge 
                        className={`text-xs font-semibold px-2.5 py-1 border ${getStatusBadgeStyle(itemData.status)} shadow-sm`}
                    >
                        {getStatusName(itemData.status)}
                    </Badge>

                    {/* Reward Badge */}
                    {itemData.hasReward && (
                        <Badge 
                            variant="outline"
                            className="text-xs font-medium px-2.5 py-1 bg-green-50 text-green-700 border-green-300 shadow-sm"
                        >
                            <DollarSign className="h-3 w-3 mr-1.5 text-green-600" />
                            {itemData.formattedReward}
                        </Badge>
                    )}

                    {/* Location Badge - Icon Only, Clickable */}
                    {itemData.geo && (
                        <Badge 
                            variant="outline"
                            className="text-xs font-medium px-2.5 py-[6px] bg-gray-50 text-gray-700 border-gray-300 hover:bg-gray-100 cursor-pointer transition-colors duration-200 shadow-sm flex items-center justify-center"
                            onClick={handleLocationClick}
                            title="View location on map"
                        >
                            <MapPin className="h-3 w-3 text-gray-500" />
                        </Badge>
                    )}
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
