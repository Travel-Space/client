"use client";

import * as S from "./page.styled";

import NoPlanets from "./NoFriends";
import Person from "../Person";

export default function Planet() {
  return (
    <S.Container>
      <NoPlanets />

      <S.MyFriends>
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </S.MyFriends>
      <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
    </S.Container>
  );
}
