"use client";

import React from "react";
import * as T from "./index.styled";

export default function Title() {
  return (
    <T.TitleWrapper>
      <T.TitleSection>
        <T.TitleLine />
        <T.TitleImg src="/assets/img/icons/random-travel.svg"/>
        <T.TitleLine />
      </T.TitleSection>
      <T.InfoText>
        랜덤으로 다양한 행성 지도를 방문해볼 수 있습니다.
        <br />
        지구 아이콘을 클릭해 보세요!
      </T.InfoText>
    </T.TitleWrapper>
  );
}
