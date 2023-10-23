"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import Reply from "./Reply";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

export default function CommentList() {
  return (
    <CL.Wrapper>
      <CL.CommentCount> 8개의 댓글</CL.CommentCount>
      <Textarea placeholder="댓글 내용을 입력해주세요." name="" maxLength={200} size="comment" />
      <CL.BtnDisplay>
        <CL.CommentButton>
          <Button variant="confirm" size="big" shape="medium" fontWeight="bold">
            댓글 작성
          </Button>
        </CL.CommentButton>
      </CL.BtnDisplay>
      <CommentItem />
      <Reply />
      <CommentItem />
    </CL.Wrapper>
  );
}
