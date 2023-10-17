"use client";

import List from "./List";
import Content from "./Content";

import * as S from "./page.styled";
import Line from "@/components/common/Line";
import DeclarationModal from "@/components/common/DeclarationModal";
import { useState } from "react";

const num = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Chat() {
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <S.Container>
      {showModal && <DeclarationModal title="채팅" />}

      <S.ChatBox>
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
