"use client";

import LikeAndShare from "./LikeAndShare";
import PostContent from "./PostContent";
import * as PD from "./page.styled";

export default function PostDetail() {
  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent />
        <LikeAndShare />
      </PD.Content>
    </PD.Wrapper>
  );
}
