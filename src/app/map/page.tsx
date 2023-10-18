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
      {isOpen && <Side onClose={handleClickSide} />}

      <S.Button onClick={handleClickSide}>→</S.Button>

      <S.Map>지도가 들어갈 자리</S.Map>
    </S.Container>
  );
}
