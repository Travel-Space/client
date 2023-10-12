"use client";

import React from "react";
import * as QMP from "./index.styled";

export default function QuestionMarkPlanet() {
  return (
    <>
      <QMP.Wrapper>
        <QMP.PlanetImg />
        <QMP.RamdomBtn>
          행성 입장하기 <QMP.RightArrow />
        </QMP.RamdomBtn>
      </QMP.Wrapper>
    </>
  );
}
