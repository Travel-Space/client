"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import * as QMP from "./index.styled";
import Link from "next/link";

interface PlanetProps {
  id: number;
  name: string;
  langth: number;
  shape: string;
}

export default function QuestionMarkPlanet() {
  const [randomPlanet, setRandomPlanet] = useState<PlanetProps | null>(null);
  const [animatePlanet, setAnimatePlanet] = useState(true);
  const [hoveredPlanet, setHoveredPlanet] = useState<number | null>(null);

  const fetchRandomPlanet = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.get("/planet");
        if (response.status === 200 && response.data.length > 0) {
          let newPlanet: PlanetProps;
          do {
            const randomIndex = Math.floor(Math.random() * response.data.length);
            newPlanet = response.data[randomIndex];
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
                ? `/assets/img/icons/planet-${getShapeNumber(randomPlanet.shape)}.svg`
                : "/assets/img/icons/random-planet.svg"
            }
            src={
              randomPlanet
                ? `/assets/img/icons/planet-${getShapeNumber(randomPlanet.shape)}.svg`
                : "/assets/img/icons/random-planet.svg"
            }
            animate={animatePlanet}
          />
          {randomPlanet && hoveredPlanet && (
            <QMP.PlanetName offset={randomPlanet.shape === "SHAPE3"}>{randomPlanet.name}</QMP.PlanetName>
          )}
        </QMP.PlanetImageContainer>
        <Link href={`/planet/${randomPlanet?.id}/map`}>
          <QMP.RamdomBtn>
            행성 입장하기 <QMP.RightArrow src="/assets/img/icons/right-arrow.svg" />
          </QMP.RamdomBtn>
        </Link>
      </QMP.Wrapper>
    </>
  );
}
