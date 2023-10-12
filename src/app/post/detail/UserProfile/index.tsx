"use client";

import * as UP from "./index.styled";

export default function UserProfile() {
  return (
    <>
      <UP.Wrapper>
        <UP.Profile>프로필사진</UP.Profile>
        <UP.NFDisplay>
          <UP.Name>에스파</UP.Name>
          <UP.Flag>🇯🇵</UP.Flag>
        </UP.NFDisplay>
      </UP.Wrapper>
    </>
  );
}
