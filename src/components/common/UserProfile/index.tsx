"use client";

import { User } from "@/@types";
import * as UP from "./index.styled";

interface UserProfileProp {
  size: "post" | "chat";
  author?: User;
}

export default function UserProfile({ size, author }: UserProfileProp) {
  const { nationality, nickName, profileImage } = author;

  const images = profileImage ? profileImage : "/assets/img/icons/profile.svg";

  return (
    <UP.Wrapper size={size}>
      <UP.Profile size={size} src={`${images}`} />
      <UP.NFDisplay size={size}>
        <UP.Name size={size}>{nickName}</UP.Name>
        <UP.Flag size={size}>{nationality}</UP.Flag>
      </UP.NFDisplay>
    </UP.Wrapper>
  );
}
