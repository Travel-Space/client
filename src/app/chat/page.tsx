"use client";

import List from "./List";
import Content from "./Content";

import * as S from "./page.styled";
import Line from "@/components/common/Line";

export default function Chat() {
  return (
    <S.Container>
      <S.ChatBox>
        <S.ListTitle>
          <span>채팅 그룹 목록</span>
        </S.ListTitle>

        <Line />

        <S.ListBox>
          <List />
          <List />
        </S.ListBox>
      </S.ChatBox>

      <Content />
    </S.Container>
  );
}
