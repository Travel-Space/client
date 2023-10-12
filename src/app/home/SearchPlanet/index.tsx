"use client";

import React from "react";
import * as S from "./index.styled";

export default function SearchPlanet() {
  return (
    <>
      <S.Wrapper>
        <S.SearchContainer>
          <S.SearchInput type="text" placeholder="가고 싶은 행성을 검색해 보세요." />
          <S.SearchBtn type="submit" />
        </S.SearchContainer>
        <S.BtnContainer>
          <S.RandomCreateBtn>
            <a href="/random-planet">새로운 행성 만들기</a>
          </S.RandomCreateBtn>
          <S.RandomPlanetBtn>
            <a href="/random-planet">랜덤 행성 구경하기</a>
          </S.RandomPlanetBtn>
        </S.BtnContainer>
      </S.Wrapper>
    </>
  );
}
