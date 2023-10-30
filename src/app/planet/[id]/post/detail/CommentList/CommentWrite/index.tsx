"use CWient";

import React from "react";
import * as CW from "./index.styled";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

export default function CommentWrite() {
  const handleCommentWrite = () => {};

  return (
    <CW.Wrapper>
      <Textarea
        placeholder="댓글 내용을 입력해주세요."
        name=""
        maxLength={200}
        size="comment"
        onChange={handleCommentWrite}
      />
      <CW.BtnDisplay>
        <CW.CommentButton>
          <Button variant="confirm" size="big" shape="medium" fontWeight="bold">
            댓글 작성
          </Button>
        </CW.CommentButton>
      </CW.BtnDisplay>
    </CW.Wrapper>
  );
}
