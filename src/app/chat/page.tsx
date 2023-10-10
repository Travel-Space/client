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
            {/* 채팅 목록 */}
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

        {/* 채팅 내용 */}
        <ChatContent />
      </S.Wrapper>
    </S.Container>
  );
}
