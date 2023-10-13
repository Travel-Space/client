"use client";

import React from "react";
import * as QMP from "./index.styled";

export default function QuestionMarkPlanet() {
  return (
    <>
      <QMP.Wrapper>
        <QMP.PlanetImg src="/assets/img/icons/random-planet.svg" />
        <QMP.RamdomBtn>
          행성 입장하기 <QMP.RightArrow src="/assets/img/icons/right-arrow.svg" />
        </QMP.RamdomBtn>
      </QMP.Wrapper>
    </>
  );
}
