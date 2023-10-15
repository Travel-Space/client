"use client";

import React from "react";
import * as RP from "./index.styled";
import CommentItem from "../CommentItem";

export default function Reply() {
  return (
    <RP.Wrapper>
      <CommentItem />
      <CommentItem />
      <RP.InputBox>
        <RP.CommentInput placeholder="댓글 내용을 입력해주세요." />
      </RP.InputBox>
      <RP.BtnDisplay>
        <RP.CancleButton>취소</RP.CancleButton>
        <RP.CommentButton>작성 완료</RP.CommentButton>
      </RP.BtnDisplay>
    </RP.Wrapper>
  );
}
