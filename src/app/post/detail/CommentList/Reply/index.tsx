"use client";

import React from "react";
import * as RP from "./index.styled";
import CommentItem from "../CommentItem";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

export default function Reply() {
  return (
    <RP.Wrapper>
      <CommentItem />
      <CommentItem />
      <RP.InputBox>
        <Textarea placeholder="댓글 내용을 입력해주세요." name="" maxLength={200} size="post" />
      </RP.InputBox>
      <RP.BtnDisplay>
        <RP.CancleButton>
          <Button variant="cancel" size="big" shape="medium" children="취소" fontWeight="bold" />
        </RP.CancleButton>
        <RP.CommentButton>
          <Button variant="confirm" size="big" shape="medium" children="작성 완료" fontWeight="bold" />
        </RP.CommentButton>
      </RP.BtnDisplay>
    </RP.Wrapper>
  );
}
