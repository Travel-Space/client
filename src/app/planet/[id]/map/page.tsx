"use client";

import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Posting } from "@/@types/Posting";

import * as S from "./page.styled";
import Side from "./Side";
import { Locations } from "@/@types/Locations";

const containerStyle = {
  width: "100%",
  height: "calc(100vh - 90px)",
};

export default function Map({ params }: { params: { id: number } }) {
  // 게시글 목록 조회 바 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // google map
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // 초기 값은 임의로 설정

  // 마커 정보
  const [marker, setMarker] = useState<Partial<Locations>>();

  // 마커 버튼 선택 유무
  const [clickedMarker, setClickedMarker] = useState(false);

  // 구글 맵 키
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY || "";

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey,
  });

  // 지도 페이지 들어갔을 때 게시글 전체 조회하는 api (우주선 상관 x) = 마커 찍어주는 용도
  const getMarker = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting[]>>(
        "get",
        `/articles/byPlanet?planetId=${params.id}`,
      );
      const data = response.data;
      const locations = data.articles.flatMap((article: Posting) => article.locations); // [{}, {}, {}, {} ... {}]

      setMarker(locations);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  useEffect(() => {
    getMarker();
  }, []);

  // 지도 중심 잡아 주는 코드 → calculateCenter 함수는 marker의 유효한 위치들로부터 중심값을 계산합니다
  const calculateCenter = (marker: Locations[]) => {
    if (marker?.length > 0) {
      const totalLat = marker.reduce((sum, el) => sum + el.latitude, 0);
      const totalLng = marker.reduce((sum, el) => sum + el.longitude, 0);
      const avgLat = totalLat / marker.length;
      const avgLng = totalLng / marker.length;

      return { lat: avgLat, lng: avgLng };
    }

    return { lat: 37.5519116, lng: 126.9918127 }; // 좌표가 없는 경우 초기 중심값 반환
  };

  // useEffect를 통해 중심값을 설정
  useEffect(() => {
    const center = calculateCenter(marker);
    setCenter(center);
  }, [marker]);

  // 게시글 목록 조회 바 상태 변경 및 닫기 눌렀을 때 선택된 마커 게시글 false로 변경
  const handleClickSide = () => {
    setIsOpen(prev => !prev);
    setClickedMarker(false); // 전체 article 선택 해제
  };

  // 마커 클릭 시 사이드 바에 마커에 해당하는 게시글만 담기
  const handleMarkerClick = () => {
    setIsOpen(true);
    setClickedMarker(true);
  };

  return (
    <S.Container>
      {isOpen && <Side onClose={handleClickSide} clickMarker={clickedMarker} params={params.id} />}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} zoom={3} onUnmount={() => setMap(null)} center={center}>
          {marker &&
            marker.map((location: Locations, index: Number) => (
              <Marker
                key={index}
                position={{
                  lat: location.latitude,
                  lng: location.longitude,
                }}
                icon={{
                  url: "/assets/img/icons/marker2.svg",
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                onClick={handleMarkerClick}
              />
            ))}
        </GoogleMap>
      )}
    </S.Container>
  );
}

// 해당하는 위도 경도를 찾아서 마커 찍기
// const handleMarkerLoad = useCallback(
//   (map: any) => {
//     if (article.length > 0) {
//       const bounds = new window.google.maps.LatLngBounds();

//       article.forEach(el => {
//         if (el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude) {
//           bounds.extend(new window.google.maps.LatLng(el.locations[0].latitude, el.locations[0].longitude));
//         }
//       });

//       if (!bounds.isEmpty()) {
//         map.fitBounds(bounds);
//       }
//     }
//     setMap(map);
//   },
//   [article],
// );

// onLoad={handleMarkerLoad}
