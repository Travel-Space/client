"use client";

import * as S from "./page.styled";

import Left from "./Left";
import Right from "./Right";

import { createContext, useState } from "react";
import { Planet, PlanetShape } from "@/@types/Planet";

export type PlanetType = Partial<Planet>;

// export interface PlanetType {
//   name: string;
//   description: string;
//   published: boolean;
//   shape: PlanetShape;
//   hashtags: string[];
// }

export interface PlanetContextType {
  planetInfo: PlanetType;
  setPlanetInfo: (value: PlanetType) => void;
}

export const PlanetContext = createContext<PlanetContextType | undefined>(undefined);

export default function CreatePlanet() {
  const [planetInfo, setPlanetInfo] = useState<PlanetType>({
    name: "",
    description: "",
    published: true,
    shape: PlanetShape.SHAPE1,
    hashtags: [],
  });

  return (
    <PlanetContext.Provider value={{ planetInfo, setPlanetInfo }}>
      <S.Wrap>
        <Left />
        <Right />
      </S.Wrap>
    </PlanetContext.Provider>
  );
}
