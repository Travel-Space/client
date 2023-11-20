"use client";

import React, { useState, useEffect } from "react";
import * as PD from "./page.styled";
import axiosRequest from "@/api";
import { ResData, Posting, Comment } from "@/@types/index";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { AxiosResponse } from "axios";
import { useRouter, useSearchParams } from "next/navigation";
import PostContent from "./detail/PostContent";
import LikeAndShare from "./detail/LikeAndShare";
import CommentList from "./detail/CommentList";

interface PostDetailProps {
  data?: Posting;
}

export default function PostDetail() {
  const params = useSearchParams();
  const post = params.get("detail");
  const router = useRouter();

  const [data, setData] = useState<Posting>();
  const [likedStatus, setLikedStatus] = useState<boolean | null>(null);

  const [currentCommentsPage, setCurrentCommentsPage] = useState(1); //댓글 페이지
  const commentsPerPage = 10; //댓글페이지
  const [totalComments, setTotalComments] = useState(0); // 전체 댓글 수
  const hasMoreComments = totalComments > currentCommentsPage * commentsPerPage;

  const [currentRepliesPage, setCurrentRepliesPage] = useState(1); // 대 댓글 페이지
  const [replyPagePage] = useState(5); // 대댓글 페이지
  const [totalReplies, setTotalReplies] = useState(0); // 전체 대 댓글 수
  const hasMoreReplies = totalReplies > currentRepliesPage * replyPagePage;

  // 게시글 본문 fetch get 함수
  async function fetchPostDetail() {
    const endpoint = `/articles/${post}?commentPage=${currentCommentsPage}&commentPageSize=${commentsPerPage}&replyPage=${currentRepliesPage}&replyPageSize=${replyPagePage}`;

    try {
      const response = await axiosRequest.requestAxios<ResData<Posting>>("get", endpoint, {});
      const totalRepliesCount = response.data.comments.reduce((acc, comment) => {
        return acc + (comment.repliesCount || 0);
      }, 0);

      // 더보기 시 다음 댓글 기존 댓글에 더하기
      let updatedComments;
      if (currentCommentsPage > 1 && data) {
        updatedComments = [...data.comments, ...response.data.comments].filter(
          (comment, index, self) => index === self.findIndex(c => c.id === comment.id),
        );
      } else {
        updatedComments = response.data.comments;
      }

      // 더보시 시 다음 대댓글 기존 대댓글에 더하기
      const updatedReplies = updatedComments.map(comment => {
        const existingReplies = (data && data.comments.find(c => c.id === comment.id)?.replies) || [];
        const newReplies = comment.replies || [];

        return {
          ...comment,
          replies: [...existingReplies, ...newReplies].filter(
            (reply, index, self) => index === self.findIndex(r => r.id === reply.id),
          ),
        };
      });

      setData({
        ...response.data,
        comments: updatedReplies,
      });
      setTotalComments(response.data.totalTopLevelCommentsCount);
      setTotalReplies(totalRepliesCount);
      // 좋아요 상태 설정
      const isLikedByCurrentUser = response.data.isLiked;
      setLikedStatus(isLikedByCurrentUser);
    } catch (error: any) {
      const errorMessage = error.response.data.message;
      alert(`${errorMessage}`);
      router.push(`/planet/${data?.planetId}/map`);
      console.error("Error fetching profile data: ", error);
    }
  }

  useEffect(() => {
    fetchPostDetail();
  }, [post, currentCommentsPage, currentRepliesPage]);

  // 댓글 페이지네이션
  const handleLoadMoreComments = () => {
    setCurrentCommentsPage(prevPage => prevPage + 1);
  };

  const handleLoadMoreReplies = () => {
    setCurrentRepliesPage(prevPage => prevPage + 1);
  };

  // 댓글의 변경사항이 있을 때 호출될 함수
  const handleCommentChange = () => {
    fetchPostDetail();
  };

  console.log(hasMoreReplies);
  console.log(totalReplies);
  console.log(currentRepliesPage);
  console.log(replyPagePage);

  // 게시글 좋아요, 좋아요 취소 함수
  async function handleLikeAction() {
    try {
      let response: AxiosResponse;

      if (likedStatus) {
        // 현재 상태가 좋아요 상태라면 좋아요 취소
        response = await axiosRequest.requestAxios("delete", `/articles/${post}/like`, {});
      } else {
        // 현재 상태가 좋아요 취소 상태라면 좋아요
        response = await axiosRequest.requestAxios("post", `/articles/${post}/like`, {});
      }
      console.log("좋아요 액션 응답 값:", response.data);
      console.log("지금 좋아요 토글상태:", likedStatus);

      setLikedStatus(prevStatus => !prevStatus);
    } catch (error) {
      console.error("Error 좋아요 액션 에러: ", error);
      alert(likedStatus ? "이미 좋아요한 게시글입니다." : "로그인 후 이용해 주세요.");
    }
  }

  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent data={data} />
        <LikeAndShare likedStatus={likedStatus} onLikeToggle={handleLikeAction} />
        <CommentList
          data={data}
          onCommentChange={handleCommentChange}
          onLoadMoreComments={handleLoadMoreComments}
          hasMoreComments={hasMoreComments}
          handleLoadMoreReplies={handleLoadMoreReplies}
          hasMoreReplies={hasMoreReplies}
        />
      </PD.Content>
    </PD.Wrapper>
  );
}
