import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SwiperContainer, StyledSwiperSlide, SlideImage } from "./index.styled";

export default function PlanetList() {
  const planetCount = 15;

  const groupedPlanets = Array.from({ length: planetCount / 5 }, (_, i) => i * 5).map(start =>
    Array.from({ length: 5 }, (_, j) => start + j + 1),
  );

  return (
    <SwiperContainer className="swiper">
      <Swiper spaceBetween={30} pagination={{ clickable: true }} modules={[Pagination]} >
        {groupedPlanets.map((group, idx) => (
          <SwiperSlide key={idx}>
            <StyledSwiperSlide>
              {group.map(planetIdx => (
                <SlideImage
                  key={planetIdx}
                  src={`/assets/img/icons/planet-${planetIdx}.svg`}
                  alt={`Planet ${planetIdx}`}
                />
              ))}
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
