"use client";

import { useEffect, useState, useRef } from "react";
import { Input } from "./index.styled";
import { GeocoderResult } from "@/@types/GeocoderResult";
import * as LI from "./index.styled";

interface LocationInputProps {
  placeholder?: string;
  type?: string;
  onLocationSelect: (address: GeocoderResult, location: GeocoderResult) => void;
  setIsAddressChecked: (value: boolean) => void;
  initialValue?: string;
}

declare global {
  interface Window {
    initializeAutocomplete: () => void;
  }
}

export default function LocationInput({
  placeholder,
  type,
  setIsAddressChecked,
  initialValue,
  onLocationSelect,
}: LocationInputProps) {
  const [address, setAddress] = useState<string>(initialValue || "");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isAddressActive, setIsAddressActive] = useState(false); // 주소 입력 시 아이콘 변경

  useEffect(() => {
    if (initialValue) {
      setAddress(initialValue);
      searchAddress(initialValue);
    }
  }, [initialValue]);

  useEffect(() => {
    window.initializeAutocomplete = function () {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });

      autocomplete.addListener("place_changed", function () {
        const selectedPlace = autocomplete.getPlace();
        if (selectedPlace.formatted_address) {
          const fullAddress = selectedPlace.formatted_address;
          setAddress(fullAddress);
          searchAddress(fullAddress);
        }
      });
    };

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places&callback=initializeAutocomplete`;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
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
            location: data.results[0].geometry.location,
          },
        };
        setAddress(selectedAddress);
        onLocationSelect(selectedAddress, location);
        setIsAddressChecked(true);
      } else {
        setIsAddressChecked(false);
        setIsAddressActive(true);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
    setIsAddressActive(event.target.value !== "");
  };

  const handleInputKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && address) {
      searchAddress(address);
    }
  };

  return (
    <LI.InputContainer>
      <LI.LocationIcon isActive={isAddressActive} />
      <Input
        type={type || "text"}
        ref={inputRef}
        placeholder={placeholder || "위치"}
        value={address}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
    </LI.InputContainer>
  );
}
