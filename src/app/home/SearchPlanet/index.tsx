"use client";

import React from "react";
import * as S from "./index.styled";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useRecoilValue } from 'recoil';
import { userAtom } from "@/recoil/atoms/user.atom";

export default function SearchPlanet() {
  const user = useRecoilValue(userAtom);

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
          {user.isAuth && (
            <S.NewCreateBtn>
              <Link href="/create-planet">
                <Button variant="white" shape="large" size="big" fontWeight="bold">
                  새로운 행성 만들기
                </Button>
              </Link>
            </S.NewCreateBtn>
          )}
          <S.RandomPlanetBtn>
            <Link href="/random-planet">
              <Button variant="white" shape="large" size="big" fontWeight="bold">
                랜덤 행성 구경하기
              </Button>
            </Link>
          </S.RandomPlanetBtn>
        </S.BtnContainer>
      </S.Wrapper>
    </>
  );
}
