"use client";
import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import { Posting } from "@/@types";
import { CommentWrite } from "./CommentWrite";
import Button from "@/components/common/Button";

interface PostContentProps {
  data?: Posting;
  onCommentChange: () => void;
  onLoadMoreComments: () => void;
  hasMoreComments: boolean;
  hasMoreReplies: boolean;
  handleLoadMoreReplies: () => void;
}

export default function CommentList({
  data,
  onCommentChange,
  onLoadMoreComments,
  hasMoreReplies,
  hasMoreComments,
  handleLoadMoreReplies,
}: PostContentProps) {
  return (
    <CL.Wrapper>
      <CL.CommentCount>{data?.totalTopLevelCommentsCount}개의 댓글</CL.CommentCount>
      <CommentWrite post={String(data?.id || "")} onCommentChange={onCommentChange} />
      {data?.comments && data.comments.length > 0 ? (
        <CommentItem
          data={data}
          onCommentChange={onCommentChange}
          handleLoadMoreReplies={handleLoadMoreReplies}
          hasMoreReplies={hasMoreReplies}
        />
      ) : (
        <CL.NoComments></CL.NoComments>
      )}
      {hasMoreComments && (
        <>
          <CL.MoreBtn>
            <Button variant="reverse" shape="large" fontWeight="bold" size="normal" onClick={onLoadMoreComments}>
              더 보기
            </Button>
          </CL.MoreBtn>
        </>
      )}
    </CL.Wrapper>
  );
}
