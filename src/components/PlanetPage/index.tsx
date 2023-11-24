"use client";

import { createContext, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import axiosRequest from "@/api";

import { ResData } from "@/@types";
import { Planet, PlanetShape } from "@/@types/Planet";

import * as S from "./index.styled";

import Left from "./Left";
import Right from "./Right";

import VALIDATE from "@/constants/regex";

export interface PlanetType {
  id?: number;
  ownerId?: number;
  name: string;
  description: string;
  published: boolean;
  shape: PlanetShape;
  hashtags: string[];
  memberLimit: number;
  spaceshipLimit: number;
}

const initPlanetInfo: PlanetType = {
  name: "",
  description: "",
  published: true,
  shape: "SHAPE1",
  hashtags: [],
  memberLimit: VALIDATE.PLANET.MEMBER_LIMIT,
  spaceshipLimit: VALIDATE.PLANET.SPACESHIP_LIMIT,
};

interface PlanetState {
  planetInfo: PlanetType;
  nameValid: boolean;
  hashtagValid: boolean;
  notAllow: boolean;
}

export interface PlanetContextType extends PlanetState {
  setPlanetInfo: React.Dispatch<React.SetStateAction<PlanetType>>;
  setNameValid: React.Dispatch<React.SetStateAction<boolean>>;
  setDescriptionValid: React.Dispatch<React.SetStateAction<boolean>>;
  setHashtagValid: React.Dispatch<React.SetStateAction<boolean>>;
  setHashtagCountValid: React.Dispatch<React.SetStateAction<boolean>>;
}

export const PlanetContext = createContext<PlanetContextType>({
  planetInfo: initPlanetInfo,
  nameValid: false,
  hashtagValid: false,
  notAllow: false,
  setPlanetInfo: () => {},
  setNameValid: () => {},
  setDescriptionValid: () => {},
  setHashtagValid: () => {},
  setHashtagCountValid: () => {},
});

export default function PlanetPage({ planetId }: { planetId?: number }) {
  const [planetInfo, setPlanetInfo] = useState<PlanetType>(initPlanetInfo);
  const [nameValid, setNameValid] = useState(false);
  const [descriptionValid, setDescriptionValid] = useState(false);
  const [hashtagValid, setHashtagValid] = useState(false);
  const [hashtagCountValid, setHashtagCountValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const getPlanetData = async () => {
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
    planetId && getPlanetData();
  }, [planetId]);

  useEffect(() => {
    if (nameValid && descriptionValid && hashtagCountValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [nameValid, descriptionValid, hashtagCountValid]);

  return (
    <PlanetContext.Provider
      value={{
        planetInfo,
        nameValid,
        hashtagValid,
        notAllow,
        setPlanetInfo,
        setNameValid,
        setDescriptionValid,
        setHashtagValid,
        setHashtagCountValid,
      }}
    >
      <S.Wrap>
        <Left />
        <Right />
      </S.Wrap>
    </PlanetContext.Provider>
  );
}
