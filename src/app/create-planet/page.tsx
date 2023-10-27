"use client";

import * as S from "./page.styled";

import Left from "./Left";
import Right from "./Right";

import { createContext, useEffect, useState } from "react";
import { Planet } from "@/@types/Planet";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";

export type PlanetType = Partial<Planet>;

export interface PlanetContextType {
  planetInfo: PlanetType;
  setPlanetInfo: React.Dispatch<React.SetStateAction<PlanetType>>;
}

export const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export default function CreatePlanet({ id }: { id: number | undefined }) {
  const [planetInfo, setPlanetInfo] = useState<PlanetType>({
    name: "",
    description: "",
    published: true,
    shape: "SHAPE1",
    hashtags: [],
  });

  async function fetchPlanetData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${id}`, {});
      // const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/6`, {});
      setPlanetInfo(response.data);
    } catch (error) {
      console.error("특정 행성 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    id && fetchPlanetData();
    setPlanetInfo({
      ...planetInfo,
    });
  }, []);

  return (
    <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
      <S.Wrap>
        <Left />
        <Right />
      </S.Wrap>
    </PlanetContext.Provider>
  );
}
