"use client";

import * as S from "./page.styled";

import NoComments from "./NoComments";
import MyComments from "./MyComments";

export default function Comments() {
  return (
    <S.Container>
      <NoComments />

      <S.Header>
        <S.CommentsNumber>
          총 <span>26</span>개의 게시글
        </S.CommentsNumber>
      </S.Header>
      <S.MyCommentsWrap>
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
        <MyComments />
      </S.MyCommentsWrap>
    </S.Container>
  );
}
