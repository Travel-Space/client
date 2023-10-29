"use client";

import { useCallback, useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Posting } from "@/@types/Posting";

import * as S from "./page.styled";
import Side from "./Side";

export interface ArticleProps {
  params: Number;
  article: Posting[] | Posting;
  onClose?: () => void;
}

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

// 임시 중점
const center = {
  lat: 37.5465029,
  lng: 127.065263,
};

// 임시 좌표 : 마커 찍을 위치
const locations = [
  { place: "성수낙낙", lat: 37.5465029, lng: 127.065263 },
  { place: "왕십리역", lat: 37.561949, lng: 127.038485 },
  { place: "한강 공원", lat: 37.5293507, lng: 127.0699562 },
  { place: "코엑스", lat: 37.5116828, lng: 127.059151 },
];

export default function Map({ params }: { params: { id: number } }) {
  // side bar open
  const [isOpen, setIsOpen] = useState(false);

  // google map
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // 게시글 정보
  const [article, setArticle] = useState<Partial<Posting[]>>([]);

  // 게시글 정보에서 위치 정보만 담기
  const [location, setLocation] = useState([]);

  // google map key
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  // 특정 행성 게시글 정보 받아오는 api
  const getArticle = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        `/articles/byPlanet?planetId=${params.id}`,
      );
      const data = response.data;

      setArticle(data);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  // side bar open
  const handleClickSide = () => {
    setIsOpen(prev => !prev);
  };

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

  return (
    <S.Container>
      {isOpen && <Side onClose={handleClickSide} article={article} params={params.id} />}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={13}
          onLoad={handleMarkerLoad}
          onUnmount={handleMount}
        >
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

// 주석

// const Marker = () => {
//   return (
//     <S.Marker>
//       <S.Images src="https://cdn.pixabay.com/photo/2020/09/09/02/12/smearing-5556288_1280.jpg" />
//       <S.Markers src="/assets/img/icons/marker.svg" />
//     </S.Marker>
//   );
// };

{
  /* {locations.map((location, index) => (
            <CustomMarker key={index} lat={location.lat} lng={location.lng} />
          ))} */
}
{
  /* {locations.map((location, index) => (
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
          ))} */
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
