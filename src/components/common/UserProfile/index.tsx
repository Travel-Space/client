"use client";

import * as UP from "./index.styled";


 interface UserProfileProp {
  size : "post" | "chat"
 }


export default function UserProfile({size}:UserProfileProp) {
  return (
    <>
      <UP.Wrapper size={size}>
        <UP.Profile size={size}></UP.Profile>
        <UP.NFDisplay size={size}>
          <UP.Name size={size}>에스파</UP.Name>
          <UP.Flag size={size}>🇯🇵</UP.Flag>
        </UP.NFDisplay>
      </UP.Wrapper>
    </>
  );
}
