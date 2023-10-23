"use client";

import CommentList from "./CommentList";
import LikeAndShare from "./LikeAndShare";
import PostContent from "./PostContent";
import { useRouter } from "next/router";
import * as PD from "./[id].styled";

export default function PostDetail() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <PD.Wrapper>
      <PD.Content>
        <PostContent postId={Number(id)} />
        <LikeAndShare />
        <CommentList />
      </PD.Content>
    </PD.Wrapper>
  );
}
