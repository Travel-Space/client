"use client";

import React, { useState } from "react";
import * as CI from "./index.styled";
import UserProfile from "../../UserProfile";
import DeclarationModal from "@/components/common/DeclarationModal";

export default function CommentItem() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openDeclarationModal = () => {
    setIsModalOpen(true);
  };

  const closeDeclarationModal = () => {
    setIsModalOpen(false);
  };

  return (
    <CI.Wrapper>
      {isModalOpen && <DeclarationModal title={"댓글"} onClick={closeDeclarationModal} />}

      <CI.UserComment>
        <CI.ProfileAndDate>
          <UserProfile />
          <CI.CommentDate>2023년 9월 23일</CI.CommentDate>
        </CI.ProfileAndDate>
      </CI.UserComment>
      <CI.CommentContent>
        읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글
        달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점
        있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰
        궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서
        감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글
        달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점 있으시면 댓글 달아주세요!읽어 주셔서 감사합니다.🥰 궁금한 점
        있으시면 댓글 달아주세요!
      </CI.CommentContent>
      <CI.CommentActionBtn>
        <CI.ReplyBtn>
          <CI.PlusBtn>
            <img src="/assets/img/icons/plus.svg" alt="" />
            답글 달기
          </CI.PlusBtn>
          <CI.MinusBtn>
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
  );
}
