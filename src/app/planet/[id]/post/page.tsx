"use client";

import React, { useState, useEffect } from "react";
import * as PD from "./page.styled";
import axiosRequest from "@/api";
import { ResData, Posting } from "@/@types/index";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { AxiosResponse } from "axios";
import { useSearchParams } from "next/navigation";
import PostContent from "./detail/PostContent";
import LikeAndShare from "./detail/LikeAndShare";
import CommentList from "./detail/CommentList";

interface PostDetailProps {
  data?: Posting;
}

export default function PostDetail() {
  const params = useSearchParams();
  const post = params.get("detail");

  const [data, setData] = useState<Posting | null>(null);
  const [likedStatus, setLikedStatus] = useState<boolean | null>(null);

  const currentUser = useRecoilValue(userAtom);

  // 게시글 본문 fetch get 함수
  async function fetchPostDetail() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Posting>>("get", `/articles/${post}`, {});
      setData(response.data);
      console.log(response.data.likes);

      // 현재 로그인한 사용자가 좋아요를 눌렀는지 확인
      const isLikedByCurrentUser = response.data.likes.some(like => like.userId === currentUser.id);
      setLikedStatus(isLikedByCurrentUser);
      console.log(isLikedByCurrentUser);
    } catch (error) {
      alert("게시글 정보를 가져오는 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }

  useEffect(() => {
    fetchPostDetail();
  }, [post]);

  if (!data) return <div>Loading...</div>;

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
      console.log("Like action response:", response.data);
      console.log("Current liked status before toggle:", likedStatus);

      setLikedStatus(prevStatus => !prevStatus);
    } catch (error) {
      console.error("Error with like action: ", error);
      console.error("Error during like action:", error);
      alert(likedStatus ? "이미 좋아요한 게시글입니다." : "좋아요에 실패하였습니다.");
    }
  }

  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent data={data} />
        <LikeAndShare likedStatus={likedStatus} onLikeToggle={handleLikeAction} />
        <CommentList data={data} />
      </PD.Content>
    </PD.Wrapper>
  );
}
