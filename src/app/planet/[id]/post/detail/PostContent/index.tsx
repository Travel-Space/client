"use client";
import React, { useState, useEffect } from "react";
import DeclarationModal from "@/components/common/DeclarationModal";
import UserProfile from "@/components/common/UserProfile";
import * as PC from "./index.styled";
import axios from "axios";
import Button from "@/components/common/Button";
import { useModal } from "@/hooks/useModal";
import { Posting } from "@/@types/Posting";

interface PostContentProps {
  data?: Posting;
}

export default function PostContent({ data }: PostContentProps) {
  const { modalDataState, openModal, closeModal } = useModal();
  const mockTags = ["태그1", "태그2", "태그3", "태그4", "태그5"];


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
              <PC.EditBtn>
                <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                  수정
                </Button>
              </PC.EditBtn>
              <PC.DeleteBtn>
                <Button variant="reverse" size="big" shape="medium" fontWeight="bold">
                  삭제
                </Button>
              </PC.DeleteBtn>
              <PC.DeclarationBtn>
                <Button variant="error" size="big" shape="medium" fontWeight="bold" onClick={openDeclarationModal}>
                  신고
                </Button>
              </PC.DeclarationBtn>
            </PC.PostActionBtn>
          </PC.TextBottomDisplay>
        </PC.Content>
      </PC.Wrapper>
    </>
  );
}
