"use client";

import React from "react";
import * as RP from "./index.styled";
import CommentItem from "../CommentItem";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { Posting, User } from "@/@types";
import { Comment } from "@/@types/Comment";

interface CommentItemProps {
  data?: Posting;
  isReply?: boolean;
  author?: User[];
}

export default function Reply({ data }: CommentItemProps) {


  return (
    <RP.ReplyWrapper>
      <CommentItem data={data?.comments}/>
    </RP.ReplyWrapper>
  );
}
