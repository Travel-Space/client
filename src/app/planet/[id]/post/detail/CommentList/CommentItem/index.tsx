"use client";

import React, { useState, useRef } from "react";
import * as CI from "./index.styled";
import UserProfile from "@/components/common/UserProfile";
import DeclarationModal from "@/components/common/DeclarationModal";
import { useModal } from "@/hooks/useModal";
import { Posting, User } from "@/@types";
import { getDateInfo } from "@/utils/getDateInfo";
import { CommentWrite } from "../CommentWrite";
import axiosRequest from "@/api";
import MESSAGE from "@/constants/message";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import Link from "next/link";

interface CommentItemProps {
  data?: Posting;
  isReply?: boolean;
  author?: User;
}



export default function CommentItem({ data, isReply = false }: CommentItemProps) {
  const [openReply, setOpenReply] = useState<number | null>(null);
  const { modalDataState, openModal, closeModal } = useModal();
  const currentUser = useRecoilValue(userAtom);
  const isComment = currentUser.id === data?.authorId;
  const commentRef = useRef(null);

  //댓글 삭제 함수
  const handleCommentDelete = async (commentId: number) => {
    const isConfirmed = window.confirm(MESSAGE.POST.DELETE);
    if (!isConfirmed) return;

    try {
      await axiosRequest.requestAxios("delete", `/comments/${commentId}`);
      alert("댓글이 성공적으로 삭제되었습니다.");
      // 삭제 후 페이지를 새로고침하거나, 상태를 업데이트하여 변경사항을 반영합니다.
    } catch (error) {
      alert("댓글 삭제 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error deleting comment: ", error);
    }
  };



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
              <CI.Wrapper>
                <CI.UserComment>
                  <CI.ProfileAndDate>
                    <CI.StyledLink>
                      <Link
                        href={{
                          pathname: `/user/profile/${comment.authorId}`,
                          query: { userId: comment.authorId },
                        }}
                      >
                    <UserProfile size="post" comment={comment} />
                      </Link> 
                    </CI.StyledLink>
                    <CI.CommentDate>{dateString}</CI.CommentDate>
                  </CI.ProfileAndDate>
                </CI.UserComment>
                <CI.CommentContent>{comment.content}</CI.CommentContent>
                <CI.CommentActionBtn>
                  <CI.ReplyBtn>
                    {!isReply && ( // 대댓글이 아닐 시 답글 달기 버튼 활성화
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
                    )}
                  </CI.ReplyBtn>

                  <CI.CommentEdit>
                    {isComment ? (
                      <>
                        <CI.EditBtn>수정</CI.EditBtn>
                        <CI.DeleteBtn onClick={() => handleCommentDelete(comment.id)}>삭제</CI.DeleteBtn>
                      </>
                    ) : (
                      <CI.DeclarationBtn onClick={openDeclarationModal}>신고</CI.DeclarationBtn>
                    )}
                  </CI.CommentEdit>
                </CI.CommentActionBtn>
              </CI.Wrapper>
              {/* 대댓글 작성 -> 댓글의 id를 참고해서 댓글 작성 컴포넌트를 부름*/}
              {openReply === comment.id && <CommentWrite post={String(data?.id || "")} parentId={comment.id} />}
              {/* 대댓글 -> 재귀적(자기 자신을 호출)으로 렌더링 */}
              {comment.replies && comment.replies.length > 0 && (
                <CI.ReplyWrapper key={comment.id}>
                  {comment.replies.map(reply => (
                    <CommentItem
                      key={reply.id}
                      data={{ ...data, comments: [reply] }}
                      isReply={true}
                    />
                  ))}
                </CI.ReplyWrapper>
              )}
            </React.Fragment>
          );
        })}
    </>
  );
}
