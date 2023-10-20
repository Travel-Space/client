"use client";

import React from "react";
import * as S from "./index.styled";
import Link from "next/link";

export default function SearchPlanet() {
  return (
    <>
      <S.Wrapper>
        <S.SearchContainer>
          <S.SearchInput type="text" placeholder="가고 싶은 행성을 검색해 보세요." />
          <S.SearchBtn type="submit">
            <S.SerachBtnImg src="/assets/img/icons/search.svg" />
          </S.SearchBtn>
        </S.SearchContainer>
        <S.BtnContainer>
          <S.RandomCreateBtn>
            <Link href="/create-planet">새로운 행성 만들기</Link>
          </S.RandomCreateBtn>
          <S.RandomPlanetBtn>
            <Link href="/random-planet">랜덤 행성 구경하기</Link>
          </S.RandomPlanetBtn>
        </S.BtnContainer>
      </S.Wrapper>
    </>
  );
}
