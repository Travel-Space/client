"use client";

import React, { useState } from "react";
import * as CW from "./index.styled";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import axiosRequest from "@/api";
import { ResData } from "@/@types";

interface CommentWriteProps {
  post: string;
  parentId?: number | null;
}

export const CommentWrite: React.FC<CommentWriteProps> = ({ post, parentId }) => {
  const [content, setContent] = useState<string>();
  async function handleCommentSubmit() {
    try {
      const payload: { [key: string]: any } = {
        content: content,
        articleId: parseInt(post),
      };
      //parentId가 있으면 post 요청에 parentId를 포함 시킴
      if (parentId !== null) {
        payload.parentId = parentId;
      }

      const response = await axiosRequest.requestAxios<ResData<Comment>>("post", `/comments/${post}/comments`, payload);
      setContent("");
    } catch (error) {
      console.error("Error submitting the comment:", error);
      alert("로그인을 하신 후 댓글을 작성할 수 있습니다.");
    }
  }

  const handleCommentWrite = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };


  
  return (
    <CW.Wrapper>
      <Textarea
        placeholder="댓글 내용을 입력해주세요."
        maxLength={200}
        size="comment"
        onChange={handleCommentWrite}
        name={""}
        value={content}
      />
      <CW.BtnDisplay>
        <CW.CommentButton>
          <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handleCommentSubmit}>
            댓글 작성
          </Button>
        </CW.CommentButton>
      </CW.BtnDisplay>
    </CW.Wrapper>
  );
};
