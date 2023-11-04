"use client";

import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import {
  SwiperContainer,
  StyledSwiperSlide,
  PlanetImageContainer,
  PlanetName,
  SlideImage,
  LodingBarWrapper,
} from "./index.styled";
import axiosRequest from "@/api";
import Link from "next/link";
import MESSAGE from "@/constants/message";
import { Planet, ResData } from "@/@types";
import { useRecoilValue } from "recoil";
import { planetListState } from "@/recoil/atoms/searchPlanet.atom";
import planetsState from "@/recoil/atoms/planets.atom";
import { atom } from "recoil";
import LoadingBar from "@/components/common/LoadingBar";

interface PlanetListProps {
  planetList: Planet[];
}

export const PlanetList: React.FC<PlanetListProps> = ({ planetList }) => {
  const [fetchedPlanets, setFetchedPlanets] = useState<Planet[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  useEffect(() => {
    fetchPlanetList(currentPage);
  }, [currentPage]);

  const fetchPlanetList = async (page: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet?page=${page}&limit=10`, {});

      setFetchedPlanets(prevPlanets => [...prevPlanets, ...response.data.planets]);
      setTotalPages(response.data.totalPages);
      console.log(response.data.totalCount);
    } catch (error) {
      console.error("행성 리스트 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  const onSlideChange = async (swiper: any) => {
    if (swiper.activeIndex === swiper.slides.length - 5 && currentPage < totalPages) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  const getShapeNumber = (shape: string) => {
    return shape.replace(/\D/g, "");
  };

  if (!Array.isArray(planetList)) {
    console.error("행성 검색 결과가 없습니다.", planetList);
    return (
      <LodingBarWrapper>
        <LoadingBar />
      </LodingBarWrapper>
    );
  }

  return (
    <SwiperContainer className="swiper">
      <Swiper
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        onSlideChange={onSlideChange}
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
                    src={`/assets/img/icons/planet-${getShapeNumber(planet.shape)}.svg`}
                    alt={`Planet ${planet.name}`}
                  />
                  {hoveredPlanet === planet.id && (
                    <PlanetName offset={planet.shape === "SHAPE3"}>{planet.name}</PlanetName>
                  )}
                </PlanetImageContainer>
              </Link>
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
};
