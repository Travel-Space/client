"use client";

import React from "react";
import * as RP from "./index.styled";
import CommentItem from "../CommentItem";

export default function Reply() {
  return (
    <RP.Wrapper>
      <CommentItem />
      <CommentItem />
      <RP.CommentInput type="text" />
      <RP.BtnDisplay>
        <RP.CancleButton>취소</RP.CancleButton>
        <RP.CommentButton>작성 완료</RP.CommentButton>
      </RP.BtnDisplay>
    </RP.Wrapper>
  );
}
