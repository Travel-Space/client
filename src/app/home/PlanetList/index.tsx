"use client";

import React from "react";
import * as PL from "./index.styled";

export default function PlanetList() {
  // 보여주고 싶은 행성 개수
    const planetCount = 5; 
  
    return (
      <PL.Wrapper>
        {Array.from({ length: planetCount }).map((_, index) => (
          <PL.PlanetImg key={index} />
        ))}
      </PL.Wrapper>
    );
  }
