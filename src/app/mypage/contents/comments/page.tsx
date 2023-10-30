"use client";
import axiosRequest from "@/api";
import { ResData, Comment } from "@/@types";

import { useEffect, useState } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import MyComments from "./MyComments";

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>();

  //댓글 불러오기
  //페이지네이션 추후 적용 - 수정예정
  async function getComments() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comment[]>>("get", `/comments/user`);
      const comments = response.data;
      setComments(comments);
      console.log("comments", comments);
    } catch (error) {
      alert("게시글 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching posting data: ", error);
    }
  }

  useEffect(() => {
    getComments();
  }, []);
  return (
    <S.Container>
      {comments?.length === 0 && (
        <Nothing
          src="/assets/img/icons/no-comments.svg"
          alt="no-comments"
          width={96}
          height={96}
          comment="작성된 댓글이 없습니다."
          font="lg"
        />
      )}

      <S.Header>
        <S.CommentsNumber>
          총 <span>{comments?.length}</span>개의 게시글
        </S.CommentsNumber>
      </S.Header>
      <S.MyCommentsWrap>
        {comments?.map((el, idx) => <MyComments key={`my-comments${idx}`} data={el} />)}
      </S.MyCommentsWrap>
    </S.Container>
  );
}
