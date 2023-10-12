"use client";
import { styled } from "styled-components";
import Link from "next/link";

import Divider from "../Divider";

const Container = styled.div`
  width: 952px;
  min-height: 846px;
  padding: 28px 32px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;
const Tab = styled.ul`
  display: flex;
  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
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
  padding: 40px 0;
`;

export default function BasicInfoLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Tab>
        <Link href="/my-page/basic-info/profile">프로필 관리</Link>
        <Link href="/my-page/basic-info/planet">행성 관리</Link>
      </Tab>
      <Divider />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
}