import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SwiperContainer, StyledSwiperSlide, PlanetImageContainer, PlanetName, SlideImage } from "./index.styled";
import axios from "axios";
import Link from "next/link";

interface PlanetListProps {
  id: number;
  name: string;
  hashtags: [];
  shape: string;
}

export default function PlanetList() {
  const [planetList, setPlanetList] = useState<PlanetListProps[]>([]);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPlanetList(currentPage);
  }, []);

  const fetchPlanetList = async (page: number) => {
    try {
      const response = await axios.get(`http://localhost:8080/planet?page=${page}&limit=5`);
      if (response.status === 200 && response.data.length > 0) {
        setPlanetList(prevPlanets => [...prevPlanets, ...response.data]);
      }
    } catch (error) {
      console.error("행성 리스트 가져오기 에러", error);
    }
  };

  const onSlideChange = (swiper: any) => {
    if (swiper.activeIndex === swiper.slides.length - 1) {
      setCurrentPage(prevPage => prevPage + 1);
      fetchPlanetList(currentPage + 1);
    }
  };

  const getShapeNumber = (shape: string) => {
    return shape.replace(/\D/g, "");
  };

  // 행성을 5개씩 그룹화
  const groupedPlanets = Array.from({ length: Math.ceil(planetList.length / 5) }, (_, i) => i * 5).map(start =>
    planetList.slice(start, start + 5),
  );

  return (
    <SwiperContainer className="swiper">
      <Swiper 
        spaceBetween={40} 
        pagination={{ clickable: true }} 
        modules={[Pagination]}
        onSlideChange={onSlideChange}
      >
        {groupedPlanets.map((group, idx) => (
          <SwiperSlide key={idx}>
            <StyledSwiperSlide>
              {group.map(planet => (
                <Link key={planet.id} href={`/planet/${planet.id}/map`} id="link">
                  <PlanetImageContainer
                    onMouseEnter={() => setHoveredPlanet(planet.id)}
                    onMouseLeave={() => setHoveredPlanet(null)}
                  >
                    <SlideImage
                      src={`/assets/img/icons/planet-${getShapeNumber(planet.shape)}.svg`}
                      alt={`Planet ${planet.name}`}
                      animateOnHover={hoveredPlanet === planet.id}
                    />
                    {hoveredPlanet === planet.id && (
                      <PlanetName offset={planet.shape === "SHAPE3"}>{planet.name}</PlanetName>
                    )}
                  </PlanetImageContainer>
                </Link>
              ))}
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}





