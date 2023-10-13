"use client";

import * as S from "./page.styled";

import RecommendFriend from "./RecommendFriend";
import SearchForm from "../../SearchForm";
import Person from "../Person";
import NoFriends from "../list/NoFriends";

export default function Planet() {
  return (
    <S.Container>
      <S.Row>
        <S.Title>추천 친구</S.Title>
        <SearchForm />
      </S.Row>

      <S.RecommendFriendWrap>
        <RecommendFriend />
        <RecommendFriend />
        <RecommendFriend />
        <RecommendFriend />
        <RecommendFriend />
      </S.RecommendFriendWrap>

      <S.SearchResults>
        <NoFriends />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
        <Person />
      </S.SearchResults>
      <S.ShowMoreBtn>목록 더보기</S.ShowMoreBtn>
    </S.Container>
  );
}
