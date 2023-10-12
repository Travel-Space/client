"use client";
import Image from "next/image";
import * as S from "./page.styled";

import Divider from "../../Divider";
import MyPlanet from "./MyPlanet";

export default function Planet() {
  return (
    <S.Container>
      <MyPlanet />
    </S.Container>
  );
}
