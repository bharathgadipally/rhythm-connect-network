
import { useState, useCallback, useRef, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Listing } from "@/types";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { MapPin } from "lucide-react";

interface ListingsMapProps {
  listings: Listing[];
  mapApiKey?: string;
}

interface LocationCache {
  [key: string]: { lat: number; lng: number };
}

const defaultCenter = { lat: 40.7128, lng: -74.006 };
const locationCache: LocationCache = {};

// Mock Geocoder since we don't have actual coordinates in mock data
const mockGeocodeLocation = async (location: string) => {
  if (locationCache[location]) {
    return locationCache[location];
  }
  
  // Create a pseudo-random but consistent location based on the string
  const hash = location.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const lat = defaultCenter.lat + (hash % 10) / 50 * (hash % 2 === 0 ? 1 : -1);
  const lng = defaultCenter.lng + (hash % 15) / 50 * (hash % 3 === 0 ? 1 : -1);
  
  const coordinates = { lat, lng };
  locationCache[location] = coordinates;
  return coordinates;
};

const ListingsMap = ({ listings, mapApiKey }: ListingsMapProps) => {
  const navigate = useNavigate();
  const mapRef = useRef<google.maps.Map | null>(null);
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [markers, setMarkers] = useState<Array<Listing & { position: google.maps.LatLngLiteral }>>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const onMapLoad = useCallback((map: google.maps.Map) => {
    mapRef.current = map;
  }, []);
  
  // Convert locations to coordinates
  useEffect(() => {
    const geocodeListings = async () => {
      setIsLoading(true);
      
      try {
        const geocodedListings = await Promise.all(
          listings.map(async (listing) => {
            const position = await mockGeocodeLocation(listing.location);
            return { ...listing, position };
          })
        );
        
        setMarkers(geocodedListings);
        
        // If we have markers, fit bounds to show all
        if (geocodedListings.length > 0 && mapRef.current) {
          const bounds = new google.maps.LatLngBounds();
          geocodedListings.forEach(marker => {
            bounds.extend(marker.position);
          });
          mapRef.current.fitBounds(bounds);
        }
      } catch (error) {
        console.error("Error geocoding locations:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    geocodeListings();
  }, [listings]);
  
  const mapContainerStyle = {
    width: "100%",
    height: "500px",
    borderRadius: "0.5rem"
  };
  
  const apiKey = mapApiKey || import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";
  
  if (!apiKey) {
    return (
      <div className="flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-800 rounded-lg p-6 h-[500px]">
        <MapPin className="h-12 w-12 text-gray-400 mb-4" />
        <p className="text-center mb-4">
          Google Maps API key is required to display the map.
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Please add your Google Maps API key to your environment variables as VITE_GOOGLE_MAPS_API_KEY
        </p>
      </div>
    );
  }
  
  return (
    <div className="relative">
      {isLoading && (
        <div className="absolute inset-0 bg-white/70 dark:bg-black/70 flex items-center justify-center z-10 rounded-lg">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      )}
      
      <LoadScript googleMapsApiKey={apiKey}>
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={defaultCenter}
          zoom={10}
          onLoad={onMapLoad}
          options={{
            styles: [
              {
                featureType: "all",
                elementType: "labels.text.fill",
                stylers: [{ color: "#7c93a3" }]
              },
              {
                featureType: "administrative",
                elementType: "geometry",
                stylers: [{ visibility: "on" }]
              },
              {
                featureType: "road",
                elementType: "geometry.fill",
                stylers: [{ color: "#ffffff" }]
              },
              {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{ color: "#e6e6e6" }]
              },
              {
                featureType: "poi",
                elementType: "all",
                stylers: [{ visibility: "simplified" }]
              }
            ]
          }}
        >
          {markers.map((listing) => (
            <Marker
              key={listing.id}
              position={listing.position}
              icon={{
                url: listing.type === "offer" 
                  ? `data:image/svg+xml;utf8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#9b87f5" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
                    )}`
                  : `data:image/svg+xml;utf8,${encodeURIComponent(
                      '<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="#F97316" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>'
                    )}`,
                scaledSize: new google.maps.Size(32, 32),
                anchor: new google.maps.Point(16, 32),
              }}
              onClick={() => setSelectedListing(listing)}
            />
          ))}
          
          {selectedListing && (
            <InfoWindow
              position={markers.find(m => m.id === selectedListing.id)?.position || defaultCenter}
              onCloseClick={() => setSelectedListing(null)}
            >
              <div className="p-2 max-w-[200px]">
                <div className="font-bold truncate">{selectedListing.title}</div>
                <div className="text-xs mb-2 text-gray-500">{selectedListing.location}</div>
                <div className="text-xs mb-2 truncate">{selectedListing.category}</div>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full text-xs py-0 h-7"
                  onClick={() => navigate(`/listings/${selectedListing.id}`)}
                >
                  View Details
                </Button>
              </div>
            </InfoWindow>
          )}
        </GoogleMap>
      </LoadScript>
    </div>
  );
};

export default ListingsMap;
