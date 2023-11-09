"use client";

import React from "react";
import { Comment, User } from "@/@types";
import * as UP from "./index.styled";

interface UserProfileProps {
  size: "post" | "map";
  author?: User; //게시글 작성자
  comment?: Comment; // 댓글 작성자
}

export default function UserProfile({ size, author, comment }: UserProfileProps) {
  let profileImage, nationImage, nickName;

  if (author) {
    // 게시글 작성자 정보가 있으면 사용
    ({ profileImage, nationImage, nickName } = author);
  } else if (comment && comment.author) {
    // 게시글 작성자 없으면 댓글 작성자 정보 사용
    ({ profileImage, nationImage, nickName } = comment.author);
  } else {
    // 정보가 없으면 빈 값
    return null;
  }

  const imageSrc = profileImage ?? "/assets/img/icons/profile.svg";
  const flagSrc = nationImage ?? "/assets/img/icons/noFlag";

  return (
    <UP.Wrapper size={size}>
      <UP.Profile size={size} src={imageSrc} alt="프로필 이미지" />
      <UP.NFDisplay size={size}>
        <UP.Name size={size}>{nickName}</UP.Name>
        <UP.Flag size={size} src={flagSrc} alt="국기 이미지" />
      </UP.NFDisplay>
    </UP.Wrapper>
  );
}
