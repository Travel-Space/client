import { useEffect, useState, useRef } from "react";
import { Input } from "./index.styled";

interface LocationInputProps {
  placeholder?: string;
  type?: string;
  onLocationSelect: (address: GeocoderResult, location: GeocoderResult) => void;
}

declare global {
  interface Window {
    initializeAutocomplete: () => void;
  }
}

interface LatLng {
  equals(other: LatLng): boolean;
  lat(): number;
  lng(): number;
}
interface GeocoderGeometry {
  location: LatLng;
}
interface GeocoderResult {
  formatted_address: string;
  geometry: GeocoderGeometry;
}




export default function LocationInput({ placeholder, type, onLocationSelect }: LocationInputProps) {
  const [address, setAddress] = useState<string>("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    window.initializeAutocomplete = function () {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });
    };
    if (window.google) {
      window.initializeAutocomplete();
    } else {
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places&callback=initializeAutocomplete`;
      script.async = true;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  const searchAddress = async (searchTerm: string) => {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const GEOCODE_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchTerm,
    )}&key=${GOOGLE_API_KEY}&language=ko`;

    try {
      const response = await fetch(GEOCODE_ENDPOINT);
      const data = await response.json();

      if (data.status === "OK") {
        const selectedAddress = data.results[0].formatted_address;
        const location = {
          formatted_address: selectedAddress,
          geometry: {
            location: data.results[0].geometry.location
          }
        };
      
        setAddress(selectedAddress);
        onLocationSelect(selectedAddress, location);
      } else {
        console.error("Failed to get the location.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && address) {
      searchAddress(address);
    }
  };

  return (
    <div>
      <Input
        type={type || "text"}
        ref={inputRef}
        placeholder={placeholder || "위치"}
        value={address}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
    </div>
  );
}
