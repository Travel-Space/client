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

export default function Map({ params }: { params: { id: number } }) {
  // side bar open
  const [isOpen, setIsOpen] = useState(false);

  // google map
  const [map, setMap] = useState<google.maps.Map | null>(null);

  // 게시글 정보
  const [article, setArticle] = useState<Partial<Posting[]>>([]);

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

  // 그냥 handleClickSide를 눌렀을 때는 article 전체가 나오게 해야 하고
  // handleClickMarker를 눌렀을 때는 selectedArticle 만 나오게 해야 함.

  const [selectedArticle, setSelectedArticle] = useState<Posting | null>();

  // side bar open
  const handleClickSide = () => {
    setIsOpen(prev => !prev);
    setSelectedArticle(null); // 전체 article 선택 해제
  };

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

  const handleMount = useCallback(function callback(map: any) {
    setMap(null);
  }, []);

  const handleMarkerLoad = useCallback(
    (map: any) => {
      if (article.length > 0) {
        const bounds = new window.google.maps.LatLngBounds();
        article.forEach(el => {
          if (el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude) {
            bounds.extend(new window.google.maps.LatLng(el.locations[0].latitude, el.locations[0].longitude));
          }
        });
        const center = bounds.getCenter();

        if (bounds.getNorthEast().equals(bounds.getSouthWest())) {
          bounds.extend(new window.google.maps.LatLng(center.lat() + 0.01, center.lng() + 0.01));
          bounds.extend(new window.google.maps.LatLng(center.lat() - 0.01, center.lng() - 0.01));
        }

        map.fitBounds(bounds);
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
          center={center}
          zoom={13}
          onLoad={handleMarkerLoad}
          onUnmount={handleMount}
        >
          {article.length >= 1 &&
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

// 주석

// const handleMarkerLoad = useCallback((map: any) => {
//   const bounds = new window.google.maps.LatLngBounds();
//   article.forEach(el => {
//     console.log(el);
//     bounds.extend(new window.google.maps.LatLng(el?.locations[0].latitude, el?.locations[0]?.longitude));
//   });
//   map.fitBounds(bounds);

//   setMap(map);
// }, []);

// const handleMarkerClick = (el: Posting) => {
//   if (el?.locations?.[0]?.latitude && el?.locations?.[0]?.longitude) {
//     setIsOpen(true);
//     // 여기서 선택한 마커 관련 게시글 정보 사용
//     console.log("Clicked Marker", el?.locations[0].latitude, el?.locations[0].longitude);
//     setArticle(el);
//   }
// };

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
