"use client";


import CommentList from "./CommentList";
import LikeAndShare from "./LikeAndShare";
import PostContent from "./PostContent";
import * as PD from "./page.styled";

export default function PostDetail() {
  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent />
        <LikeAndShare />
        <CommentList />
      </PD.Content>
    </PD.Wrapper>
  );
}
