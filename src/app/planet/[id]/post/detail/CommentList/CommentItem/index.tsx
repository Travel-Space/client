"use client";

import React, { useState } from "react";
import * as CI from "./index.styled";
import UserProfile from "@/components/common/UserProfile";
import DeclarationModal from "@/components/common/DeclarationModal";
import { useModal } from "@/hooks/useModal";
import { Posting } from "@/@types";
import { getDateInfo } from "@/utils/getDateInfo";
import CommentWrite from "../CommentWrite";

interface PostContentProps {
  data?: Posting;
}

export default function CommentItem({ data }: PostContentProps) {
  const [openReply, setOpenReply] = useState<number | null>(null);

  const { modalDataState, openModal, closeModal } = useModal();

  const openDeclarationModal = () => {
    openModal({
      title: "댓글",
      content: <DeclarationModal title={"댓글"} onClick={closeModal} />,
    });
  };

  return (
    <>
      {modalDataState.isOpen && modalDataState.content}

      {data?.comments?.map((comment, index) => {
        const { dateString } = getDateInfo(comment.createdAt);
        return (
          <>
            <CI.Wrapper key={comment.id}>
              <CI.UserComment>
                <CI.ProfileAndDate>
                  <UserProfile size="post" />
                  <CI.CommentDate>{dateString}</CI.CommentDate>
                </CI.ProfileAndDate>
              </CI.UserComment>
              <CI.CommentContent>{comment.content}</CI.CommentContent>
              <CI.CommentActionBtn>
                <CI.ReplyBtn>
                  <CI.PlusBtn onClick={() => setOpenReply(comment.id)}>
                    <img src="/assets/img/icons/plus.svg" alt="" />
                    답글 달기
                  </CI.PlusBtn>
                  <CI.MinusBtn onClick={() => setOpenReply(null)}>
                    <img src="/assets/img/icons/minus.svg" alt="" />
                    숨기기
                  </CI.MinusBtn>
                </CI.ReplyBtn>
                <CI.CommentEdit>
                  <CI.DeclarationBtn onClick={openDeclarationModal}>신고</CI.DeclarationBtn>
                  <CI.EditBtn>수정</CI.EditBtn>
                  <CI.DeleteBtn>삭제</CI.DeleteBtn>
                </CI.CommentEdit>
              </CI.CommentActionBtn>
            </CI.Wrapper>
            {openReply === comment.id && <CommentWrite />}
          </>
        );
      })}
    </>
  );
}
