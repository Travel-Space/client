"use client";

import React from "react";
import * as HT from "./index.styled";
import Line from "@/components/common/Line";

export default function HomeTitle() {
  return (
    <>
      <HT.TitleContainer>
        <Line color="white" />
        <HT.TitleImg src="/assets/img/icons/travel-space.svg" />
        <Line color="white" />
      </HT.TitleContainer>
    </>
  );
}
