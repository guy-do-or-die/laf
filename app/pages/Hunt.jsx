import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import ItemsMap from '@/components/ItemsMap';
import { useGeoFilteredItems, useItemsNearMe } from '@/hooks/useGeoFilteredItems';
import { getCurrentPosition, searchAddressSuggestions, forwardGeocode } from '@/services/geoService';
import { useReadLafConfig } from '@/contracts';
import { 
  MapPin, 
  Search, 
  Target, 
  Navigation, 
  Filter, 
  Loader2,
  AlertCircle,
  Package
} from 'lucide-react';

// Status filter options
const STATUS_OPTIONS = [
  { value: 'all', label: 'All Items', color: 'bg-gray-100 text-gray-800' },
  { value: 'lost', label: 'Lost Items', color: 'bg-red-100 text-red-800' },
  { value: 'found', label: 'Found Items', color: 'bg-green-100 text-green-800' },
  { value: 'registered', label: 'Registered Items', color: 'bg-blue-100 text-blue-800' }
];

// Radius options in kilometers
const RADIUS_OPTIONS = [
  { value: 1, label: '1 km' },
  { value: 5, label: '5 km' },
  { value: 10, label: '10 km' },
  { value: 25, label: '25 km' },
  { value: 50, label: '50 km' },
  { value: 100, label: '100 km' }
];

export default function Hunt() {
  // State for search parameters
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState('lost');
  const [selectedRadius, setSelectedRadius] = useState(10);
  const [addressSuggestions, setAddressSuggestions] = useState([]);
  const [searchingAddress, setSearchingAddress] = useState(false);
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);

  // Get LAF configuration for reward token decimals
  const { data: lafConfig } = useReadLafConfig();
  const rewardTokenDecimals = lafConfig?.rewardTokenDecimals || 6;

  // Hook for items near current location
  const {
    items: nearMeItems,
    loading: nearMeLoading,
    error: nearMeError,
    location: currentLocation,
    locationError,
    gettingLocation,
    getCurrentLocation
  } = useItemsNearMe(selectedRadius, selectedStatus === 'all' ? null : selectedStatus);

  // Hook for items near selected location
  const {
    items: searchItems,
    loading: searchLoading,
    error: searchError,
    loadItems: loadSearchItems
  } = useGeoFilteredItems(
    selectedLocation?.latitude,
    selectedLocation?.longitude,
    selectedRadius,
    selectedStatus === 'all' ? null : selectedStatus,
    null, // owner filter
    null, // finder filter
    false // don't auto-load
  );

  // Determine which data to use
  const items = useCurrentLocation ? nearMeItems : searchItems;
  const loading = useCurrentLocation ? nearMeLoading : searchLoading;
  const error = useCurrentLocation ? nearMeError : searchError;

  // Handle address search
  const handleAddressSearch = useCallback(async (query) => {
    if (!query.trim()) {
      setAddressSuggestions([]);
      return;
    }

    try {
      setSearchingAddress(true);
      const suggestions = await searchAddressSuggestions(query, 5);
      setAddressSuggestions(suggestions);
    } catch (error) {
      console.error('Address search failed:', error);
      setAddressSuggestions([]);
    } finally {
      setSearchingAddress(false);
    }
  }, []);

  // Debounced address search
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      handleAddressSearch(searchLocation);
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchLocation, handleAddressSearch]);

  // Handle address selection
  const handleAddressSelect = useCallback(async (address) => {
    try {
      const coords = await forwardGeocode(address);
      setSelectedLocation(coords);
      setSearchLocation(address);
      setAddressSuggestions([]);
      setUseCurrentLocation(false);
      
      // Load items for the selected location
      setTimeout(() => loadSearchItems(), 100);
    } catch (error) {
      console.error('Failed to geocode address:', error);
    }
  }, [loadSearchItems]);

  // Handle current location button
  const handleUseCurrentLocation = useCallback(() => {
    setUseCurrentLocation(true);
    setSelectedLocation(null);
    setSearchLocation('');
    setAddressSuggestions([]);
    getCurrentLocation();
  }, [getCurrentLocation]);

  // Handle map click for location selection
  const handleMapLocationSelect = useCallback((lat, lng) => {
    const newLocation = { latitude: lat, longitude: lng };
    setSelectedLocation(newLocation);
    setSearchLocation(`${lat.toFixed(4)}, ${lng.toFixed(4)}`);
    setUseCurrentLocation(false);
    setAddressSuggestions([]);
    
    // Load items for the clicked location
    setTimeout(() => loadSearchItems(), 100);
  }, [loadSearchItems]);

  // Get map center
  const mapCenter = useCurrentLocation && currentLocation
    ? [currentLocation.latitude, currentLocation.longitude]
    : selectedLocation
    ? [selectedLocation.latitude, selectedLocation.longitude]
    : [40.7128, -74.0060]; // Default to NYC

  // Get current status option for display
  const currentStatusOption = STATUS_OPTIONS.find(opt => opt.value === selectedStatus);

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      {/* Page Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Target className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Hunt for Items</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Discover lost items near you or search specific locations. Help reunite people with their belongings and earn rewards.
        </p>
      </div>

      {/* Search Controls */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="h-5 w-5" />
            Search Parameters
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Location Search */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Location</label>
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Input
                  placeholder="Enter address or coordinates..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pr-10"
                />
                {searchingAddress && (
                  <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 animate-spin text-gray-400" />
                )}
                
                {/* Address suggestions dropdown */}
                {addressSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 z-50 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                    {addressSuggestions.map((suggestion, index) => (
                      <button
                        key={index}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 text-sm"
                        onClick={() => handleAddressSelect(suggestion.display_name)}
                      >
                        <div className="font-medium text-gray-900">{suggestion.display_name}</div>
                        <div className="text-xs text-gray-500">
                          {suggestion.latitude.toFixed(4)}, {suggestion.longitude.toFixed(4)}
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              <Button
                variant="outline"
                onClick={handleUseCurrentLocation}
                disabled={gettingLocation}
                className="flex items-center gap-2"
              >
                {gettingLocation ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Navigation className="h-4 w-4" />
                )}
                Use Current Location
              </Button>
            </div>
            
            {locationError && (
              <div className="flex items-center gap-2 text-sm text-red-600">
                <AlertCircle className="h-4 w-4" />
                {locationError}
              </div>
            )}
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Status Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Item Status</label>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      <div className="flex items-center gap-2">
                        <Badge className={`text-xs ${option.color}`}>
                          {option.label}
                        </Badge>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Radius Filter */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Search Radius</label>
              <Select value={selectedRadius.toString()} onValueChange={(value) => setSelectedRadius(parseInt(value))}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RADIUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value.toString()}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Current Search Summary */}
          <div className="flex items-center gap-2 p-3 bg-blue-50 rounded-lg">
            <Filter className="h-4 w-4 text-blue-600" />
            <span className="text-sm text-blue-800">
              Searching for{' '}
              <Badge className={`text-xs ${currentStatusOption?.color}`}>
                {currentStatusOption?.label}
              </Badge>
              {' '}within {selectedRadius} km of{' '}
              {useCurrentLocation ? 'your current location' : 'selected location'}
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      {!loading && items && (
        <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Package className="h-5 w-5 text-blue-600" />
                <span className="font-medium text-gray-900">
                  Found {items.length} item{items.length !== 1 ? 's' : ''}
                </span>
              </div>
              
              {items.length > 0 && (
                <Badge variant="secondary" className="text-xs">
                  {items.filter(item => item.status === 'lost').length} lost • {' '}
                  {items.filter(item => item.status === 'found').length} found • {' '}
                  {items.filter(item => item.status === 'registered').length} registered
                </Badge>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Items Map */}
      <ItemsMap
        items={items}
        center={mapCenter}
        zoom={12}
        height="h-[500px]"
        loading={loading}
        error={error}
        onLocationSelect={handleMapLocationSelect}
        interactive={true}
        showZoomControl={true}
        fitBounds={true}
        title="Items Near Your Search Location"
        emptyMessage={
          useCurrentLocation
            ? "No items found near your current location. Try expanding your search radius."
            : "No items found at the selected location. Try a different area or expand your search radius."
        }
        rewardTokenDecimals={rewardTokenDecimals}
      />

      {/* Instructions */}
      <Card className="bg-white/95 backdrop-blur-sm shadow-lg border-0 rounded-xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            How to Use the Hunt Map
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm text-gray-600">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">1</span>
            </div>
            <div>
              <strong>Choose your search location:</strong> Enter an address, use your current location, or click directly on the map.
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">2</span>
            </div>
            <div>
              <strong>Filter by status:</strong> Focus on lost items for rewards, or browse all items to see what's in your area.
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">3</span>
            </div>
            <div>
              <strong>Adjust search radius:</strong> Expand or narrow your search area to find more or fewer items.
            </div>
          </div>
          
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-xs font-bold text-blue-600">4</span>
            </div>
            <div>
              <strong>Click on markers:</strong> View item details, rewards, and get directions to help reunite items with their owners.
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
