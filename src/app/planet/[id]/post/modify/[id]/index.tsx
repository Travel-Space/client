"use client";

import PostWrite from "../../write/page";
import { useParams } from "next/navigation";

export default function ModifyPost() {
  const params = useParams();
  const id = Number(params.id);

  return <PostWrite params={{ id }} isEdit={true}/>;
}