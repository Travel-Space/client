"use client";

import React, { useState } from "react";
import * as CL from "./index.styled";
import CommentItem from "./CommentItem";
import Reply from "./Reply";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { Posting, ResData } from "@/@types";
import { Comment } from "@/@types/Comment";
import axiosRequest from "@/api";

interface PostContentProps {
  data?: Posting;
}

interface commentWriteDataType {
  commentWriteData?: Comment;
}

export default function CommentList({ data }: PostContentProps) {
  // const [planetId, setPlanetId] = React.useState<number>(params.id);

  const [commentContent, setCommentContent] = useState<string>("");

  const handleCommentContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCommentContent(e.target.value);
  };

  const handleCommentSubmit = async () => {
    if (!commentContent) {
      alert("댓글 내용을 입력해주세요.");
      return;
    }
      
    try {
      const articleId = parseInt(post, 10); 
      const parentId = 0;
      
      const commentData = {
        content: commentContent,
        articleId: Math.round(planetId),
        parentId
      };
      
      const response = await axiosRequest.requestAxios<ResData<Comment>>("post", `/articles/${post}/comments`, commentData);
      
      setCommentContent(''); 
   
    } catch (error) {
      console.error("Error submitting the comment:", error);
    }
  };
  

  return (
    <CL.Wrapper>
      <CL.CommentCount>{data?.comments?.length || 0}개의 댓글</CL.CommentCount>
      <Textarea
        placeholder="댓글 내용을 입력해주세요."
        name=""
        maxLength={200}
        size="comment"
        onChange={handleCommentContentChange}
      />
      <CL.BtnDisplay>
        <CL.CommentButton>
          <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handleCommentSubmit}>
            댓글 작성
          </Button>
        </CL.CommentButton>
      </CL.BtnDisplay>
      {data?.comments && data.comments.length > 0 ? <CommentItem data={data} /> : <p>작성된 댓글이 없습니다.</p>}
      {/* <Reply data={data} /> */}
    </CL.Wrapper>
  );
}
