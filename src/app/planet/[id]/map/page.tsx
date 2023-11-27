"use client";

import { useEffect, useState } from "react";
import { GoogleMap, useJsApiLoader } from "@react-google-maps/api";
import dynamic from "next/dynamic";

import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Posting, PostingsType } from "@/@types/Posting";

import * as S from "./page.styled";
import Side from "./components/Side";
import { Locations } from "@/@types/Locations";

const Marker = dynamic(() => import("@react-google-maps/api").then(module => module.Marker), { ssr: false });

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
  const [marker, setMarker] = useState<Locations[]>([]);

  // 마커 버튼 선택 유무
  const [clickedMarker, setClickedMarker] = useState(false);
  const [clickedMarkerLocation, setClickedMarkerLocation] = useState<Locations>({
    latitude: 0,
    longitude: 0,
  });

  // 구글 맵 키
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: `${process.env.NEXT_PUBLIC_GOOGLE_MAP_API_KEY}` || "",
  });

  // 지도 페이지 들어갔을 때 게시글 전체 조회하는 api (우주선 상관 x) = 마커 찍어주는 용도
  const getMarker = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PostingsType>>(
        "get",
        `/articles/byPlanet?planetId=${params.id}`,
      );
      const data = response.data;

      const locations = data.articles.map((article: Posting) => ({
        latitude: article.latitude,
        longitude: article.longitude,
      }));

      const uniqueLocations = Array.from(
        new Set(locations.map((item: Locations) => `${item.latitude}-${item.longitude}`)),
      )
        .map(key => locations.find((obj: Locations) => `${obj.latitude}-${obj.longitude}` === key))
        .filter((location): location is Locations => location !== undefined);

      setMarker(uniqueLocations);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  useEffect(() => {
    getMarker();
  }, []);

  // 지도 중심 잡아 주는 코드
  const calculateCenter = (marker: Locations[]) => {
    if (marker?.length > 0) {
      const avgLat = marker.reduce((sum, el) => sum + el.latitude, 0) / marker.length;
      const avgLng = marker.reduce((sum, el) => sum + el.longitude, 0) / marker.length;

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
  const handleMarkerClick = (location: Locations) => {
    const newLocation = location;
    setIsOpen(true);
    setClickedMarkerLocation(newLocation);
    setClickedMarker(true);
  };

  return (
    <S.Container>
      {isOpen && (
        <Side
          onClose={handleClickSide}
          clickMarker={clickedMarker}
          params={params.id}
          markerLocation={clickedMarkerLocation}
        />
      )}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap mapContainerStyle={containerStyle} zoom={3} onUnmount={() => setMap(null)} center={center}>
          {marker &&
            marker.map(location => (
              <Marker
                position={{
                  lat: location?.latitude,
                  lng: location.longitude,
                }}
                icon={{
                  url: "/assets/img/icons/marker2.svg",
                  scaledSize: new window.google.maps.Size(50, 50),
                }}
                onClick={() => handleMarkerClick(location)}
              />
            ))}
        </GoogleMap>
      )}
    </S.Container>
  );
}
