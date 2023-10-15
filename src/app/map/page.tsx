"use client";

import { useState } from "react";

import * as S from "./page.styled";
import Side from "./Side";

export default function Map() {
  const [isOpen, setIsOpen] = useState(false);

  const handleClickSide = () => {
    setIsOpen(prev => !prev);
  };

  return (
    <S.Container>
      {isOpen && <Side />}

      <S.Map>
        지도가 들어갈 자리
        <button onClick={handleClickSide}>클릭 시 모달 나옴</button>
      </S.Map>
    </S.Container>
  );
}
