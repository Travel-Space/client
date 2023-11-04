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

export default function Map({ params }: { params: { id: number } }) {
  // 게시글 목록 조회 바 상태 관리
  const [isOpen, setIsOpen] = useState(false);

  // google map
  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [center, setCenter] = useState({ lat: 0, lng: 0 }); // 초기 값은 임의로 설정하였습니다.

  // 게시글 정보
  const [article, setArticle] = useState<Partial<Posting[]>>([]);

  // 선택된 마커 게시글
  const [selectedArticle, setSelectedArticle] = useState<Posting | null>();

  // 구글 맵 키
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
        `/articles/byPlanet?planetId=${params.id}&page=1&limit=100`,
      );
      const data = response.data;

      setArticle(data.articles);
    } catch (error) {
      console.error("에러 발생: ", error);
    }
  };

  useEffect(() => {
    getArticle();
  }, []);

  // 지도 중심 잡아 주는 코드
  const calculateCenter = (articles: Posting[]) => {
    const articlesWithCoordinates = articles.filter(
      el => el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude,
    );

    if (articlesWithCoordinates.length > 0) {
      const totalLat = articlesWithCoordinates.reduce((sum, el) => sum + el.locations[0].latitude, 0);
      const totalLng = articlesWithCoordinates.reduce((sum, el) => sum + el.locations[0].longitude, 0);
      const avgLat = totalLat / articlesWithCoordinates.length;
      const avgLng = totalLng / articlesWithCoordinates.length;

      return { lat: avgLat, lng: avgLng };
    }

    return { lat: 37.5519116, lng: 126.9918127 }; // 좌표가 없는 경우 초기 중심값 반환
  };

  useEffect(() => {
    setCenter(calculateCenter(article));
  }, [article]);

  // 게시글 목록 조회 바 상태 변경 및 닫기 눌렀을 때 선택된 마커 게시글 null로 변경
  const handleClickSide = () => {
    setIsOpen(prev => !prev);
    setSelectedArticle(null); // 전체 article 선택 해제
  };

  // 마커 클릭 시 사이드 바에 마커에 해당하는 게시글만 담기
  const handleMarkerClick = (el: Posting) => {
    const isSimilarLocation = article.filter(articleEl => {
      return (
        articleEl?.locations[0]?.latitude === el.locations[0].latitude &&
        articleEl?.locations[0]?.longitude === el.locations[0].longitude
      );
    });

    if (isSimilarLocation) {
      setIsOpen(true);
      setSelectedArticle(isSimilarLocation);
    }
  };

  // 해당하는 위도 경도를 찾아서 마커 찍기
  const handleMarkerLoad = useCallback(
    (map: any) => {
      if (article.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();

        article.forEach(el => {
          if (el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude) {
            bounds.extend(new window.google.maps.LatLng(el.locations[0].latitude, el.locations[0].longitude));
          }
        });

        if (!bounds.isEmpty()) {
          map.fitBounds(bounds);
        }
      }
      setMap(map);
    },
    [article],
  );

  return (
    <S.Container>
      {isOpen && (
        <Side
          onClose={handleClickSide}
          article={
            selectedArticle ? selectedArticle : article // article를 선택한 article로 변경
          }
          params={params.id}
        />
      )}

      <S.Button onClick={handleClickSide}>→</S.Button>

      {isLoaded && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          zoom={3}
          onLoad={handleMarkerLoad}
          onUnmount={() => setMap(null)}
          center={center}
        >
          {article?.length &&
            article.map((el, index) => {
              if (el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude) {
                return (
                  <Marker
                    key={index}
                    position={{
                      lat: el?.locations[0].latitude,
                      lng: el?.locations[0].longitude,
                    }}
                    icon={{
                      url: "/assets/img/icons/marker2.svg",
                      scaledSize: new window.google.maps.Size(50, 50),
                    }}
                    onClick={() => handleMarkerClick(el)}
                  />
                );
              }
              return null; // 위치 정보가 없는 경우 null 반환
            })}
        </GoogleMap>
      )}
    </S.Container>
  );
}
