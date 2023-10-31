"use client";

import React, { useState } from "react";
import * as CI from "./index.styled";
import UserProfile from "@/components/common/UserProfile";
import DeclarationModal from "@/components/common/DeclarationModal";
import { useModal } from "@/hooks/useModal";
import { Posting, User } from "@/@types";
import { getDateInfo } from "@/utils/getDateInfo";
import { CommentWrite } from "../CommentWrite";
import Reply from "../Reply";

interface CommentItemProps {
  data?: Posting;
  isReply?: boolean;
  author?: User[];
}

export default function CommentItem({ data, isReply = false }: CommentItemProps) {
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
      {/* 댓글 id값 기준으로 오름차순 정렬 -> 오래된 댓글이 위로가게 */}
      {data?.comments
        ?.sort((a, b) => a.id - b.id)
        .map((comment, index) => {
          const { dateString } = getDateInfo(comment.createdAt);
          return (
            <React.Fragment key={comment.id}>
              <CI.Wrapper style={isReply ? { marginLeft: "20px" } : {}}>
                <CI.UserComment>
                  <CI.ProfileAndDate>
                    <UserProfile size="post" />
                    <CI.CommentDate>{dateString}</CI.CommentDate>
                  </CI.ProfileAndDate>
                </CI.UserComment>
                <CI.CommentContent>{comment.content}</CI.CommentContent>
                <CI.CommentActionBtn>
                  <CI.ReplyBtn>
                    {openReply === comment.id ? (
                      <CI.MinusBtn onClick={() => setOpenReply(null)}>
                        <img src="/assets/img/icons/minus.svg" alt="" />
                        숨기기
                      </CI.MinusBtn>
                    ) : (
                      <CI.PlusBtn onClick={() => setOpenReply(comment.id)}>
                        <img src="/assets/img/icons/plus.svg" alt="" />
                        답글 달기
                      </CI.PlusBtn>
                    )}
                  </CI.ReplyBtn>
                  <CI.CommentEdit>
                    <CI.DeclarationBtn onClick={openDeclarationModal}>신고</CI.DeclarationBtn>
                    <CI.EditBtn>수정</CI.EditBtn>
                    <CI.DeleteBtn>삭제</CI.DeleteBtn>
                  </CI.CommentEdit>
                </CI.CommentActionBtn>
              </CI.Wrapper>

              {/* 대댓글 작성 -> 댓글의 id를 참고해서 댓글 작성 컴포넌트를 부름*/}
              {openReply === comment.id && <CommentWrite post={String(data?.id || "")} parentId={comment.id} />}
              {/* 대댓글 -> 재귀적(자기 자신을 호출)으로 렌더링 */}
              {comment.replies && comment.replies.length > 0 && (
                <CI.ReplyWrapper key={comment.id}>
                  {comment.replies.map(reply => (
                    <CommentItem key={reply.id} data={{ ...data, comments: [reply] }} isReply={true} />
                  ))}
                </CI.ReplyWrapper>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}
