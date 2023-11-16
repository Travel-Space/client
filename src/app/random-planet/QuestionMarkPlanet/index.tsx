"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as QMP from "./index.styled";
import Link from "next/link";
import axiosRequest from "@/api";
import { Planet, ResData } from "@/@types";

export interface PagedPlanetResponse {
  totalCount: number;
  totalPages: number;
  currentPage: number;
  planets: Planet[];
}

export default function QuestionMarkPlanet() {
  const [randomPlanet, setRandomPlanet] = useState<Planet | null>(null);
  const [animatePlanet, setAnimatePlanet] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

  const fetchRandomPlanet = async () => {
    setTimeout(async () => {
      try {
        const response = await axiosRequest.requestAxios<ResData<PagedPlanetResponse>>(
          "get",
          "/planet?page=1&limit=50",
        );

        const planetsList = response.data.planets;

        if (planetsList && planetsList.length > 0) {
          let newPlanet: Planet;
          do {
            const randomIndex = Math.floor(Math.random() * planetsList.length);
            newPlanet = planetsList[randomIndex];
          } while (randomPlanet && randomPlanet.id === newPlanet.id);
          setRandomPlanet(newPlanet);
          setHoveredPlanet(newPlanet.id);
        }
      } catch (error) {
        console.error("행성 리스트 가져오기 에러", error);
      }
    }, 500);
  };

  useEffect(() => {
    if (randomPlanet) {
      setAnimatePlanet(false);
      setTimeout(() => {
        setAnimatePlanet(true);
      }, 10);
    }
    // 행성이 조회 될 때마다 애니메이션 적용
  }, [randomPlanet]);

  // shape 문자열에서 숫자 부분만 추출하는 함수
  const getShapeNumber = (shape: string) => {
    return shape.replace(/\D/g, "");
  };

  const handlePlanetEntryClick = () => {
    if (!randomPlanet) {
      alert("행성을 클릭 후 행성 입장하기를 클릭해 주세요.");
    }
  };

  return (
    <>
      <QMP.Wrapper>
        <QMP.PlanetImageContainer
          onMouseEnter={() => setHoveredPlanet(randomPlanet ? randomPlanet.id : null)}
          onMouseLeave={() => setHoveredPlanet(null)}
          onClick={fetchRandomPlanet}
        >
          <QMP.PlanetImg
            data-src={
              randomPlanet
                ? `/assets/img/planet/planet-${getShapeNumber(randomPlanet.shape)}.svg`
                : "/assets/img/planet/random-planet.svg"
            }
            src={
              randomPlanet
                ? `/assets/img/planet/planet-${getShapeNumber(randomPlanet.shape)}.svg`
                : "/assets/img/planet/random-planet.svg"
            }
            animate={animatePlanet}
          />
          {randomPlanet && hoveredPlanet && (
            <QMP.PlanetName offset={randomPlanet.shape === "SHAPE3"}>{randomPlanet.name}</QMP.PlanetName>
          )}
        </QMP.PlanetImageContainer>
        {randomPlanet ? (
          <Link href={`/planet/${randomPlanet.id}/map`}>
            <QMP.RamdomBtn>
              행성 입장하기 <QMP.RightArrow src="/assets/img/icons/right-arrow.svg" />
            </QMP.RamdomBtn>
          </Link>
        ) : (
          <QMP.RamdomBtn onClick={handlePlanetEntryClick}>
            행성 입장하기 <QMP.RightArrow src="/assets/img/icons/right-arrow.svg" />
          </QMP.RamdomBtn>
        )}
      </QMP.Wrapper>
    </>
  );
}
