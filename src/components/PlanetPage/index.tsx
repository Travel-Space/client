"use client";

import * as S from "./index.styled";

import Left from "./Left";
import Right from "./Right";

import { createContext, useEffect, useState } from "react";
import { Planet, PlanetShape } from "@/@types/Planet";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { isAxiosError } from "axios";

export interface PlanetType {
  id?: number;
  ownerId?: number;
  name: string;
  description: string;
  published: boolean;
  shape: PlanetShape;
  hashtags: string[];
  memberLimit?: number;
  spaceshipLimit?: number;
}

export interface PlanetContextType {
  planetInfo: PlanetType;
  setPlanetInfo: React.Dispatch<React.SetStateAction<PlanetType>>;
}

export const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export default function PlanetPage({ planetId }: { planetId?: string[] | string }) {
  const [planetInfo, setPlanetInfo] = useState<PlanetType>({
    name: "",
    description: "",
    published: true,
    shape: "SHAPE1",
    hashtags: [],
    memberLimit: 10,
    spaceshipLimit: 10,
  });

  const fetchPlanetData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${planetId}`, {});
      const { id, name, description, published, shape, hashtags, memberLimit, spaceshipLimit, ownerId } = response.data;
      console.log(response);
      setPlanetInfo({ id, name, description, published, shape, hashtags, memberLimit, spaceshipLimit, ownerId });
    } catch (error) {
      console.error("특정 행성 조회 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    planetId && fetchPlanetData();
  }, [planetId]);

  return (
    <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
      <S.Wrap>
        <Left />
        <Right />
      </S.Wrap>
    </PlanetContext.Provider>
  );
}
