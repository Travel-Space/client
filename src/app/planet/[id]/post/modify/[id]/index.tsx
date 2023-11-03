"use client";

import PostWrite from "../../write/page";
import { useParams } from "next/navigation";

export default function ModifyPost() {
  const params = useParams();
  const postId = Number(params.id);

  return <PostWrite id={postId} isEdit={true} />;
}
