"use client";

import React from "react";
import * as HT from "./index.styled";

export default function HomeTitle() {
  return (
    <>
      <HT.TitleContainer>
        <HT.TitleLine />
        <HT.TitleImg src="/assets/img/icons/travel-space.svg" />
        <HT.TitleLine />
      </HT.TitleContainer>
    </>
  );
}
