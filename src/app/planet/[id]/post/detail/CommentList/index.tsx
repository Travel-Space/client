"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import { Posting } from "@/@types";
import { CommentWrite } from "./CommentWrite";

interface PostContentProps {
  data?: Posting;
}

export default function CommentList({ data }: PostContentProps) {
  return (
    <CL.Wrapper>
      <CL.CommentCount>{data?.comments?.length || 0}개의 댓글</CL.CommentCount>
      <CommentWrite post={String(data?.id || '')} />
      {data?.comments && data.comments.length > 0 ? <CommentItem data={data} /> : <p>작성된 댓글이 없습니다.</p>}
    </CL.Wrapper>
  );
}