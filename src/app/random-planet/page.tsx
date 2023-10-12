"use client";

import React from "react";
import * as RP from "./page.styled";
import Title from "./Title";
import QuestionMarkPlanet from "./QuestionMarkPlanet";

export default function RandomPlanet() {
  return (
    <RP.Wrapper>
      <Title />
      <QuestionMarkPlanet />
    </RP.Wrapper>
  );
}
