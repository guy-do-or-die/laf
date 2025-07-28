import React, { useState, useEffect, useCallback, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import { MapPinned, MapPin, Crosshair, Loader2 } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  getCurrentPosition, 
  GEOLOCATION_ERRORS, 
  encodeGeohash, 
  decodeGeohash, 
  isValidGeohash,
  reverseGeocode,
  searchAddressSuggestions 
} from '@/services/geoService';
import { notify } from '@/components/Notification';
import 'leaflet/dist/leaflet.css';

// Fix for default markers in react-leaflet
import L from 'leaflet';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Component to handle map clicks and provide map instance
function MapClickHandler({ onLocationSelect, onMapReady }) {
  const map = useMapEvents({
    click: (e) => {
      const { lat, lng } = e.latlng;
      onLocationSelect(lat, lng);
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



export default function LocationPicker({ 
  value, 
  onChange, 
  label = "Location",
  placeholder = "Enter address or use location buttons",
  className = "",
  disabled = false 
}) {
  const [position, setPosition] = useState(null);
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingAddress, setIsLoadingAddress] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]); // Default to London
  const inputRef = useRef(null);
  const suggestionsRef = useRef(null);
  const searchTimeoutRef = useRef(null);
  const mapInstanceRef = useRef(null);

  // Parse existing geohash value and update input
  useEffect(() => {
    if (value && typeof value === 'string' && value.length > 0) {
      if (isValidGeohash(value)) {
        try {
          const decoded = decodeGeohash(value);
          const lat = decoded.latitude;
          const lng = decoded.longitude;
          setPosition([lat, lng]);
          setMapCenter([lat, lng]);
          
          // Get address for existing geohash and update input
          setIsLoadingAddress(true);
          reverseGeocode(lat, lng).then(addr => {
            setInputValue(addr);
            setIsLoadingAddress(false);
          }).catch(error => {
            console.warn('Failed to get address for geohash:', error);
            const coordStr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
            setInputValue(coordStr);
            setIsLoadingAddress(false);
          });
        } catch (error) {
          console.warn('Failed to decode geohash:', error);
        }
      } else {
        console.warn('Invalid geohash:', value);
      }
    }
  }, [value]);

  // Handle location selection from map or suggestions
  const handleLocationSelect = useCallback(async (lat, lng) => {
    setPosition([lat, lng]);
    setIsLoadingAddress(true);
    setShowSuggestions(false);
    
    try {
      // Generate geohash (12 characters for ~3.7m precision)
      const geohash = encodeGeohash(lat, lng, 12);
      
      // Get human-readable address and update input
      const addr = await reverseGeocode(lat, lng);
      setInputValue(addr);
      
      // Pass geohash to parent component
      onChange(geohash);
    } catch (error) {
      console.error('Failed to process location selection:', error);
      notify('Failed to process selected location. Please try again.', 'error');
      const coordStr = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
      setInputValue(coordStr);
    } finally {
      setIsLoadingAddress(false);
    }
  }, [onChange]);

  // Get current location using geoService
  const getCurrentLocation = useCallback(async () => {
    setIsLoadingLocation(true);
    
    try {
      const coordinates = await getCurrentPosition();
      const lat = coordinates.latitude;
      const lng = coordinates.longitude;
      
      handleLocationSelect(lat, lng);
      setMapCenter([lat, lng]);
      notify('Location detected successfully', 'success');
    } catch (error) {
      console.error('Error getting location:', error);
      
      let errorMessage = 'Unable to get your current location. Please try typing an address.';
      
      switch (error.type) {
        case GEOLOCATION_ERRORS.PERMISSION_DENIED:
          errorMessage = 'Location access denied. Please allow location access or type an address.';
          break;
        case GEOLOCATION_ERRORS.POSITION_UNAVAILABLE:
          errorMessage = 'Location unavailable. Please check your GPS or type an address.';
          break;
        case GEOLOCATION_ERRORS.TIMEOUT:
          errorMessage = 'Location request timed out. Please try again or type an address.';
          break;
        case GEOLOCATION_ERRORS.NOT_SUPPORTED:
          errorMessage = 'Geolocation is not supported by this browser. Please type an address.';
          break;
      }
      
      notify(errorMessage, 'error');
    } finally {
      setIsLoadingLocation(false);
    }
  }, [handleLocationSelect]);

  // Handle input change with debounced search
  const handleInputChange = useCallback((e) => {
    const value = e.target.value;
    setInputValue(value);
    
    // Clear existing timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    
    // If input is empty, hide suggestions
    if (!value.trim()) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    
    // Debounce search for 300ms
    searchTimeoutRef.current = setTimeout(async () => {
      if (value.trim().length >= 2) {
        setIsSearching(true);
        try {
          const results = await searchAddressSuggestions(value.trim(), 5);
          setSuggestions(results);
          setShowSuggestions(results.length > 0);
        } catch (error) {
          console.warn('Search suggestions failed:', error);
          setSuggestions([]);
          setShowSuggestions(false);
        } finally {
          setIsSearching(false);
        }
      }
    }, 300);
  }, []);

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion) => {
    const { latitude, longitude } = suggestion.coordinates;
    handleLocationSelect(latitude, longitude);
    setMapCenter([latitude, longitude]);
    setPosition([latitude, longitude]);
    
    // Move map view to the selected location
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setView([latitude, longitude], 15);
    }
  }, [handleLocationSelect]);

  // Handle map ready callback
  const handleMapReady = useCallback((mapInstance) => {
    mapInstanceRef.current = mapInstance;
  }, []);

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target) &&
          inputRef.current && !inputRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className={cn("space-y-3", className)}>
      {/* Single Input with Icon Buttons */}
      <div className="relative">
        <div className="relative">
          {/* Location Icon */}
          <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10">
            {isLoadingAddress ? (
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            ) : (
              <MapPin className="w-4 h-4 text-muted-foreground" />
            )}
          </div>
          
          {/* Input Field */}
          <Input
            ref={inputRef}
            type="text"
            placeholder={placeholder}
            value={inputValue}
            onChange={handleInputChange}
            disabled={disabled}
            className="h-12 text-base pl-10 pr-20"
            style={{
              fontSize: '1rem',
              textAlign: 'left',
            }}
          />
          
          {/* Loading Indicator for Search */}
          {isSearching && (
            <div className="absolute right-16 top-1/2 -translate-y-1/2">
              <Loader2 className="w-4 h-4 text-muted-foreground animate-spin" />
            </div>
          )}
          
          {/* Icon Buttons */}
          <div className="absolute right-1 top-1/2 -translate-y-1/2 flex">
            {/* Current Location Button */}
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={getCurrentLocation}
              disabled={disabled || isLoadingLocation}
              className="h-8 w-8 p-0"
              title="Use current location"
            >
              {isLoadingLocation ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Crosshair className="w-4 h-4" />
              )}
            </Button>
            
            {/* Show/Hide Map Button */}
            <Button
              type="button"
              variant={showMap ? "default" : "ghost"}
              size="sm"
              onClick={() => setShowMap(!showMap)}
              disabled={disabled}
              className={cn(
                "h-8 w-8 p-0",
                showMap && "bg-primary text-primary-foreground shadow-sm"
              )}
              title={showMap ? 'Hide map' : 'Show map'}
            >
              <MapPinned className="w-4 h-4" />
            </Button>
          </div>
        </div>
        
        {/* Autocomplete Dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div 
            ref={suggestionsRef}
            className="absolute z-[9999] w-full mt-2 bg-background/95 backdrop-blur-md text-foreground rounded-lg shadow-lg border max-h-60 overflow-hidden"
          >
            {suggestions.map((suggestion, index) => (
              <Button
                key={index}
                variant="ghost"
                onClick={() => handleSuggestionSelect(suggestion)}
                className="w-full justify-start h-auto p-3 text-left font-normal hover:bg-accent"
              >
                <div className="flex items-start space-x-2 w-full">
                  <MapPin className="w-4 h-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm truncate">{suggestion.displayName}</p>
                    {suggestion.type && (
                      <p className="text-xs text-muted-foreground capitalize">{suggestion.type}</p>
                    )}
                  </div>
                </div>
              </Button>
            ))}
          </div>
        )}
      </div>

      {/* Interactive Map */}
      {showMap && (
        <div className="border border-gray-200 rounded-lg overflow-hidden">
          <div className="h-64 w-full">
            <MapContainer
              style={{ height: '100%', width: '100%' }}
              center={mapCenter}
              zoom={13}
              className="z-0"
              attributionControl={false}
              zoomControl={false}
            >
              <TileLayer url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png" />
              <MapClickHandler 
                onLocationSelect={handleLocationSelect} 
                onMapReady={handleMapReady}
              />
              {position && (
                <Marker position={position} />
              )}
            </MapContainer>
          </div>
          <div className="p-2 bg-gray-50 text-xs text-gray-600">
            Click anywhere on the map to select a location
          </div>
        </div>
      )}
    </div>
  );
}
