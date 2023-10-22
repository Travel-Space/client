"use client";

import { useCallback, useState } from "react";

import * as S from "./page.styled";
import Side from "./Side";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

const center = {
  lat: 37.5575,
  lng: 126.924,
};

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSide = () => {
    setIsOpen(prev => !prev);
  };

  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const onLoad = useCallback(function callback(map: any) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  return (
    <S.Container>
      {isOpen && <Side onClose={handleClickSide} />}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={15} onLoad={onLoad} onUnmount={onUnmount} />
      )}
    </S.Container>
  );
}
