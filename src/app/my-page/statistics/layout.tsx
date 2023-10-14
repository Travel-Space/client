"use client";
import { styled } from "styled-components";
import Link from "next/link";

import Divider from "@/app/my-page/Divider";

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
  padding-top: 40px;
`;

export default function StatisticsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Tab>
        <Link href="/my-page/statistics">행성 통계</Link>
      </Tab>
      <Divider width="100%" height="1px" />

      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
