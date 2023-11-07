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
  LoadingBarWrapper,
} from "./index.styled";
import axiosRequest from "@/api";
import Link from "next/link";
import MESSAGE from "@/constants/message";
import { Planet, ResData } from "@/@types";
import LoadingBar from "@/components/common/LoadingBar";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";

interface PlanetListProps {
  planetList: Planet[];
}

export const PlanetList: React.FC<PlanetListProps> = ({ planetList }) => {
  const [fetchedPlanets, setFetchedPlanets] = useState<Planet[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    fetchPlanetList(currentPage);
  }, [currentPage]);


  //페이지네이션을 위한 fetchPlanet 함수
  const fetchPlanetList = async (page: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet?page=${page}&limit=10`, {});
      let planets = response.data.planets;

      if (currentUser?.isAuth) {
        // 로그인한 유저의 행성멤버쉽의 행성리스트 조회
        const userPlanetIds = currentUser.memberships.planets.map(planetMembership => planetMembership?.planetId);
        // 로그인 시 가입된 행성과 공개 행성만 보여줌
        planets = planets.filter(planet => planet.published !== false || userPlanetIds?.includes(planet.id));
      } // 비로그인 상태일 때는 모든 행성을 보여주도록 필터링을 스킵

      setFetchedPlanets(prevPlanets => [...prevPlanets, ...planets]);
      setTotalPages(response.data.totalPages);
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
      <LoadingBarWrapper>
        <LoadingBar />
      </LoadingBarWrapper>
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
