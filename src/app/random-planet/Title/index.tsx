"use client";

import React from "react";
import * as T from "./index.styled";
import Line from "@/components/common/Line";

export default function Title() {
  return (
    <T.TitleWrapper>
      <T.TitleSection>
        <Line color="white" />
        <T.TitleImg src="/assets/img/icons/random-travel.svg" />
        <Line color="white" />
      </T.TitleSection>
      <T.InfoText>
        랜덤으로 다양한 행성 지도를 방문해볼 수 있습니다.
        <br />
        지구 아이콘을 클릭해 보세요!
      </T.InfoText>
    </T.TitleWrapper>
  );
}
