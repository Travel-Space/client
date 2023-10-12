"use client";

import PostContent from "./PostContent";
import UserProfile from "./UserProfile";
import * as PD from "./page.styled";

export default function PostDetail() {
  return (
    <>
      <PD.Wrapper>
        <PostContent />
      </PD.Wrapper>
    </>
  );
}
