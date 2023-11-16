"use client";
import React, { useState, useRef } from "react";
import * as CI from "./index.styled";
import UserProfile from "@/components/common/UserProfile";
import DeclarationModal from "@/components/common/DeclarationModal";
import { useModal } from "@/hooks/useModal";
import { Comment, Posting, User } from "@/@types";
import { getDateInfo } from "@/utils/getDateInfo";
import { CommentWrite } from "../CommentWrite";
import axiosRequest from "@/api";
import MESSAGE from "@/constants/message";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import Link from "next/link";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
interface CommentItemProps {
  data?: Posting;
  isReply?: boolean;
  author?: User;
  comment?: Comment;
  onCommentChange: () => void;
  hasMoreReplies: boolean;
  handleLoadMoreReplies: () => void;
}

export default function CommentItem({
  onCommentChange,
  data,
  hasMoreReplies,
  handleLoadMoreReplies,
  isReply = false,
}: CommentItemProps): React.JSX.Element {
  const [openReply, setOpenReply] = useState<number | null>(null);
  const { modalDataState, openModal, closeModal } = useModal();
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const currentUser = useRecoilValue(userAtom);

  //댓글 삭제 함수
  const handleCommentDelete = async (commentId: number) => {
    const isConfirmed = window.confirm(MESSAGE.POST.DELETE);
    if (!isConfirmed) return;
    try {
      await axiosRequest.requestAxios("delete", `/comments/${commentId}`);
      alert("댓글이 성공적으로 삭제되었습니다.");
      onCommentChange();
    } catch (error) {
      alert("댓글 삭제 중 에러가 발생했습니다. 다시 시도해 주세요.");
      console.error("Error deleting comment: ", error);
    }
  };

  const handleHideReply = () => {
    setOpenReply(null); // 답글 입력창을 닫음
  };
  const openDeclarationModal = (commentId: number, isReply: boolean) => {
    openModal({
      title: "댓글 신고",
      content: <DeclarationModal title={"댓글"} onClick={closeModal} targetId={commentId} />,
    });
  };

  //수정 시작
  const handleStartEditing = (comment: Comment) => {
    setEditingCommentId(comment.id); // 편집 중인 댓글 ID를 설정
    setEditedContent(comment.content); // 현재 댓글 내용으로 상태 초기화
    setIsEditing(true); // 편집 모드 활성화
  };

  //수정 댓글 저장
  const handleUpdateComment = async () => {
    if (!editedContent.trim()) {
      alert("댓글 내용을 입력해 주세요.");
      return;
    }
    if (editingCommentId === null) {
      alert("수정할 댓글을 찾을 수 없습니다.");
      return;
    }
    try {
      const response = await axiosRequest.requestAxios("put", `/comments/${editingCommentId}`, {
        content: editedContent,
      });
      if (onCommentChange) {
        onCommentChange();
      }
      setIsEditing(false);
      setEditingCommentId(null);
      setEditedContent("");
    } catch (error) {
      console.error("댓글 수정 중 오류가 발생했습니다: ", error);
      alert("댓글을 저장하는 동안 오류가 발생했습니다. 다시 시도해 주세요.");
    }
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditingCommentId(null);
  };

  return (
    <>
      {modalDataState.isOpen && modalDataState.content}
      {/* 댓글 id값 기준으로 오름차순 정렬 -> 오래된 댓글이 위로가게 */}
      {data?.comments?.map(comment => {
        const isCommentAuthor = currentUser?.id === comment.authorId;
        const { dateString, time } = getDateInfo(comment.createdAt);
        {
          /* 수정모드일 때  작성 인풋*/
        }
        if (isEditing && comment.id === editingCommentId) {
          return (
            <CI.EditWrapper key={comment.id}>
              <UserProfile size="post" comment={comment} />
              <Textarea
                placeholder={""}
                maxLength={200}
                size="comment"
                onChange={e => setEditedContent(e.target.value)}
                name={""}
                value={editedContent}
              />
              <CI.ActionButtons>
                <Button variant="cancel" size="big" shape="medium" fontWeight="bold" onClick={handleCancelEdit}>
                  취소
                </Button>
                <Button variant="confirm" size="big" shape="medium" fontWeight="bold" onClick={handleUpdateComment}>
                  댓글 수정
                </Button>
              </CI.ActionButtons>
            </CI.EditWrapper>
          );
        }
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
                  <CI.CommentDate>
                    {dateString} {time}
                  </CI.CommentDate>
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
                  {isCommentAuthor ? (
                    <>
                      <CI.EditBtn onClick={() => handleStartEditing(comment)}>수정</CI.EditBtn>
                      <CI.DeleteBtn onClick={() => handleCommentDelete(comment.id)}>삭제</CI.DeleteBtn>
                    </>
                  ) : (
                    currentUser && (
                      <CI.DeclarationBtn onClick={() => openDeclarationModal(comment.id, isReply)}>
                        신고
                      </CI.DeclarationBtn>
                    )
                  )}
                </CI.CommentEdit>
              </CI.CommentActionBtn>
            </CI.Wrapper>
            {/* 대댓글 작성 -> 댓글의 id를 참고해서 댓글 작성 컴포넌트를 부름*/}
            {openReply === comment.id && (
              <CommentWrite
                post={String(data?.id || "")}
                parentId={comment.id}
                onClose={handleHideReply}
                onCommentChange={onCommentChange || (() => {})}
              />
            )}
            {/* 대댓글 -> 재귀적(자기 자신을 호출)으로 렌더링 */}
            {comment.replies && comment.replies.length > 0 && (
              <CI.ReplyWrapper key={comment.id}>
                {comment.replies.map(reply => (
                  <CommentItem
                    key={reply.id}
                    data={{ ...data, comments: [reply] }}
                    isReply={true}
                    onCommentChange={onCommentChange || (() => {})}
                    hasMoreReplies={hasMoreReplies}
                    handleLoadMoreReplies={handleLoadMoreReplies}
                  />
                ))}
                {hasMoreReplies && (
                  <CI.MoreBtn>
                    <Button
                      variant="cancel"
                      shape="large"
                      fontWeight="bold"
                      size="normal"
                      onClick={() => handleLoadMoreReplies()}
                    >
                      더 보기
                    </Button>
                  </CI.MoreBtn>
                )}
              </CI.ReplyWrapper>
            )}
          </React.Fragment>
        );
      })}
    </>
  );
}
