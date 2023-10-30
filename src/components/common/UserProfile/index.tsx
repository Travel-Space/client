"use client";

import { Posting, User } from "@/@types";
import * as UP from "./index.styled";

interface UserProfileProp {
  size: "post" | "map"; // map으로 수정
  posting?: Posting; //게시글 안에 author를 가져오기
}

export default function UserProfile({
  size,
  posting,
}: UserProfileProp) {
  // Posing타입의 객체를 받아서 author(User Type)을 사용하여 프로필 정보 표시
  const userAuthor = posting?.author as User; // User 타입에 접근 (캐스팅) 
  const { nationality, nickName, profileImage } = userAuthor;
  const images = profileImage ? profileImage : "/assets/img/icons/profile.svg";

  return (
    <UP.Wrapper size={size}>
      <UP.Profile size={size} src={`${images}`} alt={`${nickName}의 프로필`} />
      <UP.NFDisplay size={size}>
        <UP.Name size={size}>{nickName}</UP.Name>
        <UP.Flag size={size}>{nationality}</UP.Flag>
      </UP.NFDisplay>
    </UP.Wrapper>
  );
}

// 사용 예시 <UserProfile size="post" posting={data} />
