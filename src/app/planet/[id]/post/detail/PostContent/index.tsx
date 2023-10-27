"use client";
import React, { useState, useEffect } from "react";
import DeclarationModal from "@/components/common/DeclarationModal";
import UserProfile from "@/components/common/UserProfile";
import * as PC from "./index.styled";
import axios from "axios";
import Button from "@/components/common/Button";
import { useModal } from "@/hooks/useModal";
import { Posting } from "@/@types/Posting";
import { useSearchParams, useRouter } from "next/navigation";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";
interface PostContentProps {
  data?: Posting;
}

export default function PostContent({ data }: PostContentProps) {
  const { modalDataState, openModal, closeModal } = useModal();
  const mockTags = ["태그1", "태그2", "태그3", "태그4", "태그5"];
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentUser = useRecoilValue(userAtom);
  const isMyPost = currentUser.id === data?.authorId;

  //게시글 삭제 함수
  const handlePostDelete = async () => {
    if (!data?.id) return;

    const isConfirmed = window.confirm("게시글을 삭제하시겠습니까?");
    if (!isConfirmed) return;

    try {
      await axios.delete(`/articles/${data.id}`);
      alert("게시글이 성공적으로 삭제되었습니다.");

      // 현재 URL에서 planet의 동적 값을 추출
      const planetId = searchParams.get("planetId");

      if (planetId) {
        router.push(`/planet/${planetId}/map`);
      } else {
        router.push("/"); // 행성 경로가 없을 경우 홈 화면으로
      }
    } catch (error) {
      alert("게시글 삭제 중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error deleting post: ", error);
    }
  };

  const openDeclarationModal = () => {
    openModal({
      title: "게시글 신고",
      content: <DeclarationModal title={"게시글"} onClick={closeModal} />,
    });
  };

  return (
    <>
      <PC.Wrapper>
        {modalDataState.isOpen && modalDataState.content}
        <PC.TitleSection>
          <PC.Title>{data?.title}</PC.Title>
          <PC.Date>2023년 9월 25일</PC.Date>
        </PC.TitleSection>
        <PC.PostInfoSection>
          <UserProfile size="post" />
          <PC.PostInfo>
            <PC.RocketImg src="/assets/img/icons/rocket.svg" />
            피식대학 우주선
            <PC.PlanetImg src="/assets/img/icons/planet.svg" />
            일본 맛도리 행성
          </PC.PostInfo>
        </PC.PostInfoSection>
        <PC.Content>
          <PC.Location>
            <PC.LocationImg src="/assets/img/icons/location.svg" />
            서울특별시 강남구 논현동 332-2
          </PC.Location>
          <PC.Text>{data?.content}</PC.Text>
          <PC.TextBottomDisplay>
            <PC.TagsDisplay>
              {mockTags.map((tag, index) => (
                <PC.Tags key={index}>{tag}</PC.Tags>
              ))}
            </PC.TagsDisplay>
            <PC.PostActionBtn>
              {isMyPost ? (
                <>
                  <PC.EditBtn>
                    <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                      수정
                    </Button>
                  </PC.EditBtn>
                  <PC.DeleteBtn onClick={handlePostDelete}>
                    <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                      삭제
                    </Button>
                  </PC.DeleteBtn>
                </>
              ) : (
                <PC.DeclarationBtn>
                  <Button variant="error" size="big" shape="medium" fontWeight="bold" onClick={openDeclarationModal}>
                    신고
                  </Button>
                </PC.DeclarationBtn>
              )}
            </PC.PostActionBtn>
          </PC.TextBottomDisplay>
        </PC.Content>
      </PC.Wrapper>
    </>
  );
}
