"use client";

import * as S from "./page.styled";

import NoPostings from "./NoPostings";
import MyPostings from "./MyPostings";
import SearchForm from "../../SearchForm";

export default function Postings() {
  return (
    <S.Container>
      <NoPostings />

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
