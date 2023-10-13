"use client";

import * as S from "./page.styled";

import Nothing from "@/app/my-page/Nothing";
import MyComments from "./MyComments";

export default function Comments() {
  return (
    <S.Container>
      <Nothing
        src="/assets/img/icons/no-comments.svg"
        alt="no-comments"
        width={96}
        height={96}
        comment="작성된 댓글이 없습니다."
      />

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
