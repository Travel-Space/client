"use client";

import * as S from "./page.styled";

import Left from "./Left";
import Right from "./Right";

const planets = [
  { value: "planet-1", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-2", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-3", src: "/assets/img/icons/planet-1.svg" },
  { value: "planet-4", src: "/assets/img/icons/planet-1.svg" },
];

export default function CreatePlanet() {
  return (
    <S.Wrap>
      <Left />
      <Right />
    </S.Wrap>
  );
}
