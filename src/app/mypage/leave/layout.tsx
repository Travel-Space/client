"use client";
import { styled } from "styled-components";
import Link from "next/link";

import Divider from "@/app/mypage/Divider";

const Container = styled.div`
  width: 952px;
  min-height: 846px;
  padding: 28px 32px 54px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;
const Tab = styled.ul`
  display: flex;
  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 700;
    line-height: 17px;
    padding: 10px 20px;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.black};
    }
    &:focus {
      color: ${({ theme }) => theme.PALETTE.black};
      border-bottom: 1px solid ${({ theme }) => theme.PALETTE.black};
    }
  }
`;
const MainContainer = styled.div`
  padding-top: 40px;
`;

export default function FriendLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Tab>
        <Link href="/mypage/leave">회원 탈퇴</Link>
      </Tab>
      <Divider width="100%" height="1px" />

      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
