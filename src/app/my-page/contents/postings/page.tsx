"use client";

import * as S from "./page.styled";

import NoPostings from "./NoPostings";
import MyPostings from "./MyPostings";

export default function Postings() {
  return (
    <S.Container>
      <NoPostings />

      <S.Header>
        <S.PostingsNumber>
          총 <span>30</span>개의 게시글
        </S.PostingsNumber>
        <S.Search>
          <S.Filter>글제목 ▾</S.Filter>
          <S.VerticalDivider />
          <S.SearchInput type="text" placeholder={`게시글 관리에서 검색합니다.`} />
        </S.Search>
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
