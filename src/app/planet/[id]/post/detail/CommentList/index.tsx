"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import { Posting } from "@/@types";
import { CommentWrite } from "./CommentWrite";

interface PostContentProps {
  data?: Posting;
  onCommentChange: () => void;
}

export default function CommentList({ data, onCommentChange }: PostContentProps) {
  return (
    <CL.Wrapper>
      <CL.CommentCount>{data?.comments?.length || 0}개의 댓글</CL.CommentCount>
      <CommentWrite post={String(data?.id || "")} onCommentChange={onCommentChange}/>
      {data?.comments && data.comments.length > 0 ? (
        <CommentItem data={data} onCommentChange={onCommentChange} />
      ) : (
        <CL.NoComments></CL.NoComments>
      )}
    </CL.Wrapper>
  );
}
