import React, { useState, useEffect, useMemo } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { MapPin, Package, Search, Heart, ArrowLeft } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapSkeleton } from '@/components/ui/map';
import { parseGeoLocation } from '@/services/graphService';
import { decodeGeohash, formatCoordinates } from '@/services/geoService';
import { getStatusColor } from '@/services/itemService';
import { formatUnits } from 'viem';
import { Link } from 'wouter';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom marker icons for different item statuses
const createCustomIcon = (status) => {
  const colors = {
    lost: '#ef4444', // red
    found: '#10b981', // green
    returned: '#6b7280', // gray
    registered: '#3b82f6' // blue
  };

  const color = colors[status] || colors.registered;
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 4px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
      ">
        <div style="
          width: 8px;
          height: 8px;
          background-color: white;
          border-radius: 50%;
        "></div>
      </div>
    `,
    iconSize: [20, 20],
    iconAnchor: [10, 10],
    popupAnchor: [0, -10]
  });
};

// Component to fit map bounds to markers
function MapBounds({ items, center }) {
  const map = useMap();

  useEffect(() => {
    if (items && items.length > 0) {
      const validItems = items.filter(item => {
        const coords = parseItemCoordinates(item);
        return coords.lat && coords.lng;
      });

      if (validItems.length > 0) {
        const bounds = L.latLngBounds(
          validItems.map(item => {
            const coords = parseItemCoordinates(item);
            return [coords.lat, coords.lng];
          })
        );
        
        // Add some padding to the bounds
        map.fitBounds(bounds, { padding: [20, 20] });
      }
    } else if (center && center.length === 2) {
      map.setView(center, 13);
    }
  }, [map, items, center]);

  return null;
}

// Helper function to parse item coordinates from various formats
function parseItemCoordinates(item) {
  // Try different coordinate formats
  if (item.geo) {
    const coords = parseGeoLocation(item.geo);
    if (coords.lat && coords.lng) {
      return { lat: coords.lat, lng: coords.lng };
    }
  }
  
  if (item.geohash) {
    try {
      const decoded = decodeGeohash(item.geohash);
      return { lat: decoded.latitude, lng: decoded.longitude };
    } catch (error) {
      console.warn('Failed to decode geohash:', item.geohash, error);
    }
  }
  
  if (item.latitude && item.longitude) {
    return { 
      lat: parseFloat(item.latitude), 
      lng: parseFloat(item.longitude) 
    };
  }
  
  if (item.lat && item.lng) {
    return { 
      lat: parseFloat(item.lat), 
      lng: parseFloat(item.lng) 
    };
  }
  
  return { lat: null, lng: null };
}

// Item popup content component
function ItemPopup({ item, rewardTokenDecimals = 6 }) {
  const coords = parseItemCoordinates(item);
  const statusColor = getStatusColor(item.status);
  
  return (
    <div className="min-w-[250px] max-w-[300px]">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-sm text-gray-900 flex-1 mr-2">
          {item.comment || 'Untitled Item'}
        </h3>
        <Badge 
          variant="secondary" 
          className={`text-xs ${statusColor} whitespace-nowrap`}
        >
          {item.status || 'registered'}
        </Badge>
      </div>
      
      <div className="space-y-2 text-xs text-gray-600">
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3" />
          <span>{formatCoordinates(coords, 4)}</span>
        </div>
        
        {item.distance && (
          <div className="flex items-center gap-1">
            <Search className="h-3 w-3" />
            <span>{item.distance.toFixed(2)} km away</span>
          </div>
        )}
        
        {item.reward && item.status === 'lost' && (
          <div className="flex items-center gap-1">
            <Heart className="h-3 w-3 text-red-500" />
            <span className="font-medium text-red-600">
              ${formatUnits(BigInt(item.reward), rewardTokenDecimals)} reward
            </span>
          </div>
        )}
        
        <div className="flex items-center gap-1">
          <Package className="h-3 w-3" />
          <span className="text-xs text-gray-500">
            {item.owner ? `${item.owner.slice(0, 6)}...${item.owner.slice(-4)}` : 'Unknown owner'}
          </span>
        </div>
      </div>
      
      {item.hash && (
        <div className="mt-3 pt-2 border-t border-gray-200">
          <Link href={`/found/${item.hash}`}>
            <Button size="sm" className="w-full text-xs">
              View Details
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
}

/**
 * Reusable map component for displaying items by their geohash/coordinates
 * @param {Object} props - Component props
 * @param {Array} props.items - Array of items to display on map
 * @param {Array} props.center - Default map center [lat, lng]
 * @param {number} props.zoom - Default zoom level
 * @param {string} props.height - Map height class
 * @param {boolean} props.loading - Loading state
 * @param {string} props.error - Error message
 * @param {Function} props.onLocationSelect - Callback when map is clicked
 * @param {boolean} props.interactive - Whether map is interactive
 * @param {boolean} props.showZoomControl - Whether to show zoom controls
 * @param {boolean} props.fitBounds - Whether to auto-fit bounds to items
 * @param {string} props.title - Optional title for the map
 * @param {string} props.emptyMessage - Message to show when no items
 * @param {number} props.rewardTokenDecimals - Decimals for reward token formatting
 */
export default function ItemsMap({
  items = [],
  center = [40.7128, -74.0060], // Default to NYC
  zoom = 10,
  height = 'h-96',
  loading = false,
  error = null,
  onLocationSelect,
  interactive = true,
  showZoomControl = true,
  fitBounds = true,
  title,
  emptyMessage = "No items to display on map",
  rewardTokenDecimals = 6
}) {
  // Filter items that have valid coordinates
  const validItems = useMemo(() => {
    return items.filter(item => {
      const coords = parseItemCoordinates(item);
      return coords.lat && coords.lng && !isNaN(coords.lat) && !isNaN(coords.lng);
    });
  }, [items]);

  // Show loading state
  if (loading) {
    return (
      <div className="space-y-4">
        {title && (
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}
        <MapSkeleton height={height} />
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="space-y-4">
        {title && (
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
          <CardContent className="p-6 text-center">
            <MapPin className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">Failed to load map: {error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show empty state
  if (validItems.length === 0) {
    return (
      <div className="space-y-4">
        {title && (
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
        )}
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
          <CardContent className="p-6 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">{emptyMessage}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {title && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-blue-600" />
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          <Badge variant="secondary" className="text-xs">
            {validItems.length} item{validItems.length !== 1 ? 's' : ''}
          </Badge>
        </div>
      )}
      
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl overflow-hidden">
        <div className={`${height} w-full`}>
          <MapContainer
            center={center}
            zoom={zoom}
            style={{ height: '100%', width: '100%' }}
            className="z-0"
            attributionControl={false}
            zoomControl={showZoomControl}
            dragging={interactive}
            touchZoom={interactive}
            doubleClickZoom={interactive}
            scrollWheelZoom={interactive}
            boxZoom={interactive}
            keyboard={interactive}
          >
            <TileLayer 
              url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>'
            />
            
            {/* Auto-fit bounds to markers */}
            {fitBounds && <MapBounds items={validItems} center={center} />}
            
            {/* Click handler for interactive maps */}
            {interactive && onLocationSelect && (
              <MapClickHandler onLocationSelect={onLocationSelect} />
            )}
            
            {/* Item markers */}
            {validItems.map((item, index) => {
              const coords = parseItemCoordinates(item);
              const key = item.id || item.hash || `item-${index}`;
              
              return (
                <Marker
                  key={key}
                  position={[coords.lat, coords.lng]}
                  icon={createCustomIcon(item.status)}
                >
                  <Popup>
                    <ItemPopup 
                      item={item} 
                      rewardTokenDecimals={rewardTokenDecimals}
                    />
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>
      </Card>
    </div>
  );
}

// Component to handle map clicks
function MapClickHandler({ onLocationSelect }) {
  const map = useMap();
  
  useEffect(() => {
    if (!onLocationSelect) return;
    
    const handleClick = (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
    };
    
    map.on('click', handleClick);
    
    return () => {
      map.off('click', handleClick);
    };
  }, [map, onLocationSelect]);
  
  return null;
}
