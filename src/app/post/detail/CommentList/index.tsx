"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import Reply from "./Reply";

export default function CommentList() {
  return (
    <CL.Wrapper>
      <CL.CommentCount> 8개의 댓글</CL.CommentCount>
      <CL.CommentInput type="text" />
      <CL.BtnDisplay>
        <CL.CommentButton>댓글 작성</CL.CommentButton>
      </CL.BtnDisplay>
      <CommentItem />
      <Reply />
      <CommentItem />
    </CL.Wrapper>
  );
}
