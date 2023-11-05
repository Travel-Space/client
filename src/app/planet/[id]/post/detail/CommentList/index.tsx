"use client";

import React from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import { Posting } from "@/@types";
import { CommentWrite } from "./CommentWrite";
import Button from "@/components/common/Button";

interface CommentListProps {
  data?: Posting;
  onCommentChange: () => void;
  onLoadMoreComments: () => void;
  hasMoreComments: boolean;
  repliesPageInfo: { [commentId: number]: number };
  updateRepliesPageInfo: (commentId: number, newPage: number) => void;
  replyPageSize: number;
}

export default function CommentList({
  data,
  onCommentChange,
  onLoadMoreComments,
  hasMoreComments,
  repliesPageInfo,
  updateRepliesPageInfo,
  replyPageSize,
}: CommentListProps) {
  return (
    <CL.Wrapper>
      <CL.CommentCount>{data?.totalTopLevelCommentsCount}개의 댓글</CL.CommentCount>
      <CommentWrite post={String(data?.id || "")} onCommentChange={onCommentChange} />
      {data?.comments && data.comments.length > 0 ? (
        data.comments.map(comment => (
          <CommentItem
            key={comment.id}
            data={data}
            comment={comment}
            onCommentChange={onCommentChange}
            repliesPageInfo={repliesPageInfo}
            updateRepliesPageInfo={updateRepliesPageInfo}
            replyPageSize={replyPageSize}
          />
        ))
      ) : (
        <CL.NoComments>댓글이 없습니다.</CL.NoComments>
      )}
      {hasMoreComments && (
        <CL.MoreBtn>
          <Button variant="confirm" shape="large" fontWeight="bold" size="normal" onClick={onLoadMoreComments}>
            더 보기
          </Button>
        </CL.MoreBtn>
      )}
    </CL.Wrapper>
  );
}
