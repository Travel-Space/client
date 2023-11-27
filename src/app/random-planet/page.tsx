"use client";

import React from "react";
import * as RP from "./page.styled";
import Title from "./components/Title";
import QuestionMarkPlanet from "./components/QuestionMarkPlanet";

export default function RandomPlanet() {
  return (
    <RP.Wrapper>
      <Title />
      <QuestionMarkPlanet />
    </RP.Wrapper>
  );
}
