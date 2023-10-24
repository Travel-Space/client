import { useEffect, useState, useRef } from "react";
import { Input } from "./index.styled";

interface LocationInputProps {
  placeholder?: string;
  type?: string;
}

declare global {
  interface Window {
    initializeAutocomplete: () => void;
  }
}
export default function LocationInput({ placeholder, type }: LocationInputProps) {
  const [address, setAddress] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    // Google Maps API 스크립트가 로드된 후에만 Autocomplete 초기화
    window.initializeAutocomplete = function () {
      if (!inputRef.current) return;

      const autocomplete = new google.maps.places.Autocomplete(inputRef.current, {
        types: ["geocode"],
      });

      autocomplete.addListener("place_changed", () => {
        const selectedPlace = autocomplete.getPlace();
        const selectedAddress = selectedPlace.formatted_address;

        if (selectedAddress) {
          setAddress(selectedAddress);
        }
      });
    };

    if (window.google) {
      initializeAutocomplete();
    } else {
      // API 스크립트가 아직 로드되지 않았다면 로드 후에 initializeAutocomplete를 호출
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY}&libraries=places&callback=initializeAutocomplete`;
      script.async = true;
      document.body.appendChild(script);

      // 컴포넌트가 언마운트될 때 스크립트 제거
      return () => {
        document.body.removeChild(script);
      };
    }
  }, []);

  // 지오코딩으로 주소 검색
  const searchAddress = async (searchTerm: string) => {
    const GOOGLE_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY;
    const GEOCODE_ENDPOINT = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
      searchTerm,
    )}&key=${GOOGLE_API_KEY}&language=ko`;

    try {
      const response = await fetch(GEOCODE_ENDPOINT);
      const data = await response.json();

      if (data.status === "OK") {
        const location = data.results[0].formatted_address;
        setAddress(location);
      } else {
        console.error("Failed to get the location.");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // 인풋 변경 이벤트 핸들러
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setAddress(value);
  };

  // 인풋에서 'Enter' 키를 눌렀을 때 지오코딩 시작
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
function initializeAutocomplete() {
  throw new Error("Function not implemented.");
}
