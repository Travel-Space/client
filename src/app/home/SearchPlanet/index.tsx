"use client";

import React from "react";
import * as S from "./index.styled";
import Link from "next/link";
import Button from "@/components/common/Button";

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
          <S.NewCreateBtn>
            <Link href="/create-planet">
              <Button variant="white" shape="large" size="big" fontWeight="bold" children="새로운 행성 만들기" />
            </Link>
          </S.NewCreateBtn>
          <S.RandomPlanetBtn>
            <Link href="/random-planet">
              <Button variant="white" shape="large" size="big" fontWeight="bold" children="랜덤 행성 구경하기" />
            </Link>
          </S.RandomPlanetBtn>
        </S.BtnContainer>
      </S.Wrapper>
    </>
  );
}
