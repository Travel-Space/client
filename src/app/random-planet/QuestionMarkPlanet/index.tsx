"use client";

import React, { useState } from "react";
import axios from "axios";
import * as QMP from "./index.styled";
import Link from "next/link"; 

interface PlanetProps {
  id: number;
  name: string;
  langth: number;
}

export default function QuestionMarkPlanet() {
  const [randomPlanet, setRandomPlanet] = useState<PlanetProps | null>(null);

  const fetchRandomPlanet = async () => {
    setTimeout(async () => {
      try {
        const response = await axios.get("/planet");
        if (response.status === 200 && response.data.length > 0) {
          const randomIndex = Math.floor(Math.random() * response.data.length);
          setRandomPlanet(response.data[randomIndex]);
        }
      } catch (error) {
        console.error("행성 리스트 가져오기 에러", error);
      }
    }, 500); 
  };

  return (
    <>
      <QMP.Wrapper>
        <QMP.PlanetImg
          src={randomPlanet ? `/assets/img/icons/planet-${randomPlanet.id}.svg` : "/assets/img/icons/random-planet.svg"}
          onClick={fetchRandomPlanet}
        />
        <Link href={`/planet/${randomPlanet?.id}`}>
          <QMP.RamdomBtn>
            행성 입장하기 <QMP.RightArrow src="/assets/img/icons/right-arrow.svg" />
          </QMP.RamdomBtn>
        </Link>
      </QMP.Wrapper>
    </>
  );
}
