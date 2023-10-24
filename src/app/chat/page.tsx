"use client";

import { useModal } from "@/hooks/useModal";

import List from "./List";
import Content from "./Content";

import * as S from "./page.styled";
import Line from "@/components/common/Line";
import DeclarationModal from "@/components/common/DeclarationModal";

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Chat() {
  const { modalDataState, openModal, closeModal } = useModal();

  const modal = {
    title: "모달 제목",
    content: <></>,
    callback: () => {
      console.log("모달이 닫힘");
    }, // 모달이 닫힐 때 실행할 로직
  };

  return (
    <S.Container>
      {modalDataState.isOpen && <DeclarationModal onClick={closeModal} title="r" />}

      <S.ChatBox>
        <button onClick={() => openModal(modal)}>button</button>
        <S.ListTitle>
          <span>채팅 그룹 목록</span>
        </S.ListTitle>

        <Line size="horizontal" color="gray" />

        <S.ListBox>
          {num.map(num => (
            <List />
          ))}
        </S.ListBox>
      </S.ChatBox>

      <Content />
    </S.Container>
  );
}
