"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import Reply from "./Reply";
import Textarea from "@/components/common/Textarea";

export default function CommentList() {
  return (
    <CL.Wrapper>
      <CL.CommentCount> 8개의 댓글</CL.CommentCount>
      <Textarea placeholder="댓글 내용을 입력해주세요." name="" maxLength={200} size="comment" />
      <CL.BtnDisplay>
        <CL.CommentButton>댓글 작성</CL.CommentButton>
      </CL.BtnDisplay>
      <CommentItem />
      <Reply />
      <CommentItem />
    </CL.Wrapper>
  );
}
