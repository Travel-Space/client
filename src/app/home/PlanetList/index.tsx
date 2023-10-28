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

  useEffect(() => {
    fetchPlanetList();
  }, []);

  const fetchPlanetList = async () => {
    try {
      const response = await axios.get("http://localhost:8080/planet");
      if (response.status === 200 && response.data.length > 0) {
        setPlanetList(response.data);
      }
    } catch (error) {
      console.error("행성 리스트 가져오기 에러", error);
    }
  };

  const groupedPlanets = Array.from({ length: Math.ceil(planetList.length / 5) }, (_, i) => i * 5).map(start =>
    planetList.slice(start, start + 5),
  );

  // shape 문자열에서 숫자 부분만 추출하는 함수
  const getShapeNumber = (shape: string) => {
    return shape.replace(/\D/g, "");
  };

  return (
    <SwiperContainer className="swiper">
      <Swiper spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]}>
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
