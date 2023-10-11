"use client";
import { styled } from "styled-components";

import Nav from "./Nav";

const Container = styled.div`
  display: flex;
  gap: 48px;
  padding: 40px 80px;
`;
const MainContainer = styled.div`
  width: 952px;
  min-height: 846px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
`;
export default function MypageLayout({ children }: { children: React.ReactNode }) {
  return (
    <Container>
      <Nav />
      <MainContainer>{children}</MainContainer>
    </Container>
  );
}
