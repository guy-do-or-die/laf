import React from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPin } from 'lucide-react';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

/**
 * Component to handle map clicks and provide map instance
 */
function MapClickHandler({ onLocationSelect, onMapReady }) {
  const map = useMapEvents({
    click: (e) => {
      if (onLocationSelect) {
        const { lat, lng } = e.latlng;
        onLocationSelect(lat, lng);
      }
    },
  });
  
  // Pass map instance to parent
  React.useEffect(() => {
    if (onMapReady) {
      onMapReady(map);
    }
  }, [map, onMapReady]);
  
  return null;
}

/**
 * Reusable Map component for displaying interactive maps
 * @param {Object} props - Component props
 * @param {Array} props.center - Map center coordinates [lat, lng]
 * @param {Array} props.position - Marker position [lat, lng] (optional)
 * @param {number} props.zoom - Map zoom level (default: 13)
 * @param {string} props.height - Map height (default: 'h-64')
 * @param {Function} props.onLocationSelect - Callback when map is clicked (optional)
 * @param {Function} props.onMapReady - Callback when map is ready (optional)
 * @param {boolean} props.interactive - Whether map is interactive (default: true)
 * @param {boolean} props.showZoomControl - Whether to show zoom controls (default: true)
 * @param {string} props.className - Additional CSS classes
 * @param {string} props.clickHint - Text to show below map for click instructions
 */
export const Map = ({ 
  center, 
  position, 
  zoom = 13, 
  height = 'h-64', 
  onLocationSelect, 
  onMapReady,
  interactive = true,
  showZoomControl = true,
  className = "",
  clickHint = null
}) => {
  if (!center || !Array.isArray(center) || center.length !== 2) {
    return (
      <div className={`${height} bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg ${className}`}>
        <div className="text-center">
          <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
          <p className="text-sm">Invalid map coordinates</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`border border-gray-200 rounded-lg overflow-hidden ${className}`}>
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
          
          {/* Click handler for interactive maps */}
          {interactive && (onLocationSelect || onMapReady) && (
            <MapClickHandler 
              onLocationSelect={onLocationSelect} 
              onMapReady={onMapReady}
            />
          )}
          
          {/* Marker if position is provided */}
          {position && Array.isArray(position) && position.length === 2 && (
            <Marker position={position} />
          )}
        </MapContainer>
      </div>
      
      {/* Click instruction hint */}
      {clickHint && (
        <div className="p-2 bg-gray-50 text-xs text-gray-600 text-center">
          {clickHint}
        </div>
      )}
    </div>
  );
};

/**
 * Loading state for Map component
 */
export const MapSkeleton = ({ height = 'h-64', className = "" }) => (
  <div className={`${height} bg-gray-100 flex items-center justify-center text-gray-500 rounded-lg border border-gray-200 ${className}`}>
    <div className="text-center">
      <MapPin className="h-8 w-8 mx-auto mb-2 text-gray-400" />
      <p className="text-sm">Loading map...</p>
    </div>
  </div>
);

export default Map;
