"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SwiperContainer, StyledSwiperSlide, PlanetImageContainer, PlanetName, SlideImage } from "./index.styled";
import axiosRequest from "@/api";
import Link from "next/link";
import MESSAGE from "@/constants/message";
import { Planet, ResData } from "@/@types";
import { useRecoilValue } from "recoil";
import { planetListState } from "@/recoil/atoms/searchPlanet.atom";

interface PlanetListProps {
  data?: Planet;
}

export default function PlanetList() {
  const [planetList, setPlanetList] = useState<Planet[]>([]);
  const [totalPages, setTotalPages] = useState<number>(0);
  const planetListFromRecoil = useRecoilValue(planetListState);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    fetchPlanetList(1, 10);
  }, []);

  useEffect(() => {
    if (planetListFromRecoil.planets.length > 0) {
      setPlanetList(planetListFromRecoil.planets);
    }
  }, [planetListFromRecoil]);

  //행성 리스트 불러오기
  const fetchPlanetList = async (page: number, limit: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>(
        "get",
        `/planet?page=${page}&limit=${limit}&published=true`,
        {},
      );

      // 기존의 행성 리스트에 새로운 행성들을 추가합니다.
      setPlanetList(prevPlanets => [...prevPlanets, ...response.data.planets]);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("행성 리스트 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

const onSlideChange = async (swiper: any) => {
  const nextPage = Math.floor(swiper.activeIndex / 5) + 2; 
  if (nextPage > currentPage && nextPage <= totalPages) {
    setCurrentPage(nextPage);

    await fetchPlanetList(nextPage, 5);
  }
};

  const getShapeNumber = (shape: string) => {
    return shape.replace(/\D/g, "");
  };

  return (
    <SwiperContainer className="swiper">
<Swiper
  key={'planet-swiper'}
  spaceBetween={40}
  pagination={{
    clickable: true,
    dynamicBullets: true,
    dynamicMainBullets: Math.ceil(totalPages / 5),
  }}
  modules={[Pagination]}
  onSlideNextTransitionEnd={onSlideChange}
  slidesPerView={5}
  slidesPerGroup={5}
>
        {planetList.map(planet => (
          <SwiperSlide key={planet.id}>
            <StyledSwiperSlide>
              <Link key={planet.id} href={`/planet/${planet.id}/map`} id="link">
                <PlanetImageContainer
                  onMouseEnter={() => setHoveredPlanet(planet.id)}
                  onMouseLeave={() => setHoveredPlanet(null)}
                >
                  <SlideImage
                    src={`/assets/img/planet/planet-${getShapeNumber(planet.shape)}.svg`}
                    alt={`Planet ${planet.name}`}
                  />
                  {hoveredPlanet === planet.id && (
                    <PlanetName>{planet.name}</PlanetName>
                  )}
                </PlanetImageContainer>
              </Link>
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
