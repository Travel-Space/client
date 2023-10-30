"use client";

import React from "react";
import * as RP from "./index.styled";
import CommentItem from "../CommentItem";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import { Posting } from "@/@types";

interface PostContentProps {
  data?: Posting;
}

export default function Reply({ data }: PostContentProps) {

  const handleReplyWrite = () => {

  }
  return (
    <RP.Wrapper>
      <CommentItem data={data}/>
      <RP.InputBox>
        <Textarea placeholder="댓글 내용을 입력해주세요." name="" maxLength={200} size="post" onChange={handleReplyWrite}/>
      </RP.InputBox>
      <RP.BtnDisplay>
        <RP.CancleButton>
          <Button variant="cancel" size="big" shape="medium" fontWeight="bold">
            취소
          </Button>
        </RP.CancleButton>
        <RP.CommentButton>
          <Button variant="confirm" size="big" shape="medium" fontWeight="bold">
            작성 완료
          </Button>
        </RP.CommentButton>
      </RP.BtnDisplay>
    </RP.Wrapper>
  );
}
