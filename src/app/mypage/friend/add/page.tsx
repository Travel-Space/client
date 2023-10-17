"use client";

import * as S from "./page.styled";

import RecommendFriend from "./RecommendFriend";
import SearchForm from "../../SearchForm";
import Person from "../Person";
import Nothing from "@/app/mypage/Nothing";

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
        <Nothing
          src="/assets/img/icons/no-friends.svg"
          alt="no-friends"
          width={216}
          height={216}
          comment="검색결과가 없습니다."
          suggest="닉네임 또는 계정을 검색해 보세요."
        />
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
