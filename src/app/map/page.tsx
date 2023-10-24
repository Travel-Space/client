"use client";

import { useCallback, useState } from "react";

import * as S from "./page.styled";
import Side from "./Side";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

const center = {
  lat: 37.5465029,
  lng: 127.065263,
};

const locations = [
  { place: "성수낙낙", lat: 37.5465029, lng: 127.065263 },
  { place: "왕십리역", lat: 37.561949, lng: 127.038485 },
  { place: "한강 공원", lat: 37.5293507, lng: 127.0699562 },
  { place: "코엑스", lat: 37.5116828, lng: 127.059151 },
];

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

  const handleMount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const handleMarkerLoad = useCallback((map: any) => {
    const bounds = new window.google.maps.LatLngBounds();
    locations.forEach(locations => {
      bounds.extend(new window.google.maps.LatLng(locations.lat, locations.lng));
    });
    map.fitBounds(bounds);

    setMap(map);
  }, []);

  // const Marker = () => {
  //   return (
  //     <S.Marker>
  //       <S.Images src="https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_1280.jpg" />
  //       <S.Markers src="/assets/img/icons/marker.svg" />
  //     </S.Marker>
  //   );
  // };

  return (
    <S.Container>
      {isOpen && <Side onClose={handleClickSide} />}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={handleMarkerLoad}
          onUnmount={handleMount}
        >
          {/* {locations.map((location, index) => (
            <CustomMarker key={index} lat={location.lat} lng={location.lng} />
          ))} */}
          {/* {locations.map((location, index) => (
            <MarkerF
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "/assets/img/icons/marker.svg",
                scaledSize: new window.google.maps.Size(40, 40),
              }}
            >
              <S.Images src="https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_1280.jpg" />
            </MarkerF>
          ))} */}
          {locations.map((location, index) => (
            <Marker
              key={index}
              position={{ lat: location.lat, lng: location.lng }}
              icon={{
                url: "/assets/img/icons/marker2.svg", // 커스텀 마커 이미지의 URL
                scaledSize: new window.google.maps.Size(50, 50), // 이미지 크기
              }}
              onClick={handleClickSide}
            ></Marker>
          ))}
        </GoogleMap>
      )}
    </S.Container>
  );
}

// interface MarkerProp {
//   lat: Number;
//   lng: Number;
// }

// const CustomMarker = ({ lat, lng }: MarkerProp) => {
//   // 위치 정보를 사용하여 마커 위치 설정
//   const position = { lat: lat, lng: lng };

//   return (
//     <Marker
//       position={{ position }}
//       icon={{
//         url: "URL_TO_MARKER_IMAGE",
//         scaledSize: new window.google.maps.Size(40, 40),
//       }}
//     >
//       {/* 원하는 마커 컨텐츠 추가 가능 */}
//     </Marker>
//   );
// };
