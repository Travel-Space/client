"use client";

import * as S from "./page.styled";

import NoPlanets from "./NoFriends";
import MyFriend from "./MyFriend";

export default function Planet() {
  return (
    <S.Container>
      <NoPlanets />

      <S.MyFriends>
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
        <MyFriend />
      </S.MyFriends>
      <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
    </S.Container>
  );
}
