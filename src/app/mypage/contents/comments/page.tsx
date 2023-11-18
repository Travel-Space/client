"use client";
import axiosRequest from "@/api";
import { ResData, Comment, Comments } from "@/@types";

import { useEffect, useState } from "react";

import * as S from "./page.styled";

import Nothing from "@/components/common/Nothing";
import MyComments from "./MyComments";
import Pagination from "@/components/common/Pagination";
import usePagination from "@/hooks/usePagination";

import MESSAGE from "@/constants/message";

export default function Comments() {
  const [comments, setComments] = useState<Comment[]>();

  //댓글 불러오기
  const getComments = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Comments>>(
        "get",
        `/comments/user?page=${page}&limit=10`,
      );
      const comments = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, comments);
      console.log("comments", response.data);
    } catch (error) {
      console.error("댓글 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getComments, setComments);

  useEffect(() => {
    getComments();
  }, []);

  return (
    <S.Container>
      {totalCount === 0 ? (
        <Nothing
          src="/assets/img/icons/no-comments.svg"
          alt="no-comments"
          width={96}
          height={96}
          comment="작성된 댓글이 없습니다."
          font="lg"
        />
      ) : (
        <>
          <S.Header>
            <S.CommentsNumber>
              총 <span>{totalCount}</span>개의 댓글
            </S.CommentsNumber>
          </S.Header>
          <S.MyCommentsWrap>
            {comments?.map((el, idx) => (
              <MyComments key={`my-comments${idx}`} data={el} page={page} saveData={saveData} setPage={setPage} />
            ))}
          </S.MyCommentsWrap>
          <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} />
        </>
      )}
    </S.Container>
  );
}
