"use client";

import * as S from "./page.styled";

import Nothing from "@/app/mypage/Nothing";
import FavoritePosting from "./FavoritePosting";

export default function FavoritePostings() {
  return (
    <S.Container>
      <Nothing
        src="/assets/img/icons/no-postings.svg"
        alt="no-postings"
        width={96}
        height={96}
        comment="좋아하는 게시글이 없습니다."
      />
      <S.MyFriends>
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
        <FavoritePosting />
      </S.MyFriends>
    </S.Container>
  );
}
