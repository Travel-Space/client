"use client";

import * as S from "./index.styled";

import Left from "./Left";
import Right from "./Right";

import { createContext, useEffect, useState } from "react";
import { Planet, PlanetShape } from "@/@types/Planet";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";

export type PlanetType = Partial<Planet>;
// export interface PlanetType {
//   name: string;
//   description: string;
//   published: boolean;
//   ownerId: number;
//   shape: PlanetShape;
//   hashtags: string[];
//   memberLimit: number;
//   spaceshipLimit: number;
// }

export interface PlanetContextType {
  planetInfo: PlanetType;
  setPlanetInfo: React.Dispatch<React.SetStateAction<PlanetType>>;
}

export const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export default function PlanetPage({ planetId }: { planetId: string[] | string | undefined }) {
  const { id } = useRecoilValue(userAtom);
  const [planetInfo, setPlanetInfo] = useState<PlanetType>({
    name: "",
    description: "",
    published: true,
    shape: "SHAPE1",
    hashtags: [],
    memberLimit: 10,
    spaceshipLimit: 10,
    ownerId: id,
  });
  const router = useRouter();

  async function fetchPlanetData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("get", `/planet/${planetId}`, {});
      console.log(response);
      setPlanetInfo(response.data);
    } catch (error) {
      console.error("특정 행성 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
      // alert("잘못된 경로입니다.");
      // return router.back();
    }
  }

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
