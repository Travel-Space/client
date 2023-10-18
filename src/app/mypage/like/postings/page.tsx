"use client";

import * as S from "./page.styled";

import Nothing from "@/app/mypage/Nothing";
import FavoritePosting from "./FavoritePosting";
import SearchForm from "@/app/mypage/SearchForm";

export default function FavoritePostings() {
  const dropDownProps = {
    placeholder: "글 제목으로 검색해보세요.",
  };
  return (
    <S.Container>
      <S.Header>
        <S.CommentsNumber>
          총 <span>26</span>개의 게시글
        </S.CommentsNumber>
        <SearchForm select={dropDownProps} />
      </S.Header>
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
