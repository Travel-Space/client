"use client";
import { useState } from "react";

import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

import SearchForm from "@/app/mypage/SearchForm";
import Line from "@/components/common/Line";

const Container = styled.div`
  width: 100%;
  min-height: 846px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;
const Header = styled.header`
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 42px;

  & > div {
    display: flex;
    gap: 24px;
    height: 43px;
  }
`;
const FollowerNumber = styled.div`
  ${flexColumn}
`;
const FollowingNumber = styled.div`
  ${flexColumn}
`;
const Title = styled.div`
  &:hover {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
  &:focus {
    color: ${({ theme }) => theme.PALETTE.mainColor};
  }
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  margin-bottom: 8px;
`;
const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 700;
`;
const MainContainer = styled.div`
  padding: 32px 0 0;
`;

export default function FriendListLayout({ children }: { children: React.ReactNode }) {
  const [selectedMenu, setSelectedMenu] = useState("닉네임");
  const dropDownProps = {
    menuList: ["닉네임", "계정"],
    selectedMenu: selectedMenu, //선택한 메뉴
    handleClick: setSelectedMenu, //메뉴를 클릭했을 때 실행될 메서드
    placeholder: "친구 목록에서 검색합니다.",
  };

  return (
    <Container>
      <Header>
        <div>
          <FollowerNumber>
            <Title>팔로워</Title>
            <Number>102</Number>
          </FollowerNumber>
          <Line color="gray" size="vertical" />
          <FollowingNumber>
            <Title>팔로잉</Title>
            <Number>3,888</Number>
          </FollowingNumber>
        </div>
        <SearchForm select={dropDownProps} />
      </Header>
      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
