import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SwiperContainer, StyledSwiperSlide, SlideImage } from "./index.styled";
import axios from "axios";

interface PlanetProps {
  id: number;
  name: string;
  langth:number;
}

export default function PlanetList() {
  const [planetList, setPlanetList] = useState<PlanetProps[]>([]);

  useEffect(() => {
    fetchPlanetList();
  }, []);

  const fetchPlanetList = async () => {
    try {
      const response = await axios.get("/planet");
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

  return (
    <SwiperContainer className="swiper">
      <Swiper spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]}>
        {groupedPlanets.map((group, idx) => (
          <SwiperSlide key={idx}>
            <StyledSwiperSlide>
              {group.map(planet => (
                <SlideImage
                  key={planet.id}
                  src={`/assets/img/icons/planet-${planet.id}.svg`}
                  alt={`Planet ${planet.id}`}
                />
              ))}
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
