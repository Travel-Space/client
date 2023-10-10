"use client";

import * as S from "./page.styled";
import ChatContent from "./Content";
import ChatList from "./List";

export default function Chat() {
  return (
    <S.Container>
      <S.Wrapper>
        <S.ChatBox>
          <S.ListTitle>
            <span>채팅 그룹 목록</span>
          </S.ListTitle>

          <S.Line />

          <S.ListBox>
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
            <ChatList />
          </S.ListBox>
        </S.ChatBox>

        <ChatContent />
      </S.Wrapper>
    </S.Container>
  );
}
