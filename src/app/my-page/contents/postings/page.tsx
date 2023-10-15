"use client";

import * as S from "./page.styled";

import Nothing from "@/app/my-page/Nothing";
import MyPostings from "./MyPostings";
import SearchForm from "../../SearchForm";

export default function Postings() {
  return (
    <S.Container>
      <Nothing
        src="/assets/img/icons/no-postings.svg"
        alt="no-postings"
        width={96}
        height={96}
        comment="작성된 게시글이 없습니다."
      />
      <S.Header>
        <S.PostingsNumber>
          총 <span>30</span>개의 게시글
        </S.PostingsNumber>
        <SearchForm />
      </S.Header>
      <S.MyPostingsWrap>
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
        <MyPostings />
      </S.MyPostingsWrap>
    </S.Container>
  );
}
