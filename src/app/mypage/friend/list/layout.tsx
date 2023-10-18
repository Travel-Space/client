"use client";
import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

import SearchForm from "../../SearchForm";
import Divider from "../../Divider";

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
  return (
    <Container>
      <Header>
        <div>
          <FollowerNumber>
            <Title>팔로워</Title>
            <Number>102</Number>
          </FollowerNumber>
          <Divider width="1px" height="43px" />
          <FollowingNumber>
            <Title>팔로잉</Title>
            <Number>3,888</Number>
          </FollowingNumber>
        </div>
        <SearchForm />
      </Header>
      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
