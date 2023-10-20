import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { SwiperContainer, StyledSwiperSlide, SlideImage } from "./index.styled";
import axios from "axios";
import Link from "next/link"; // Next.js의 Link 컴포넌트 import

interface PlanetListProps {
  id: number;
  name: string;
  hashtags: [];
}

export default function PlanetList(){
  const [planetList, setPlanetList] = useState<PlanetListProps[]>([]);


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
                <Link key={planet.id} href={`/planet/${planet.id}`} id="link">
                    <SlideImage src={`/assets/img/icons/planet-${planet.id}.svg`} alt={`Planet ${planet.name}`} />
                </Link>
              ))}
            </StyledSwiperSlide>
          </SwiperSlide>
        ))}
      </Swiper>
    </SwiperContainer>
  );
}
