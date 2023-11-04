"use client";

import Link from "next/link";
import styled from "styled-components";

import { bodyContainer, flexCenter, flexColumnCenter } from "@/styles/common";

export default function Error() {
  return (
    <>
      <Container>
        <Comment>
          <div>에러가 발생했습니다!</div>
          <div>요청하신 페이지를 찾을 수 없습니다.</div>
        </Comment>

        <Button>
          <Link href={"/"}>Go To Home</Link>
        </Button>
      </Container>
    </>
  );
}

export const Container = styled.div`
  ${bodyContainer}
  ${flexCenter}
  flex-direction: column;
  gap: 20px;

  height: calc(100vh - 90px);
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const Comment = styled.div`
  line-height: 1.3;
  ${flexColumnCenter}

  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
`;

export const Button = styled.button`
  padding: 10px 24px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.primary[400]};
  font-size: ${({ theme }) => theme.FONT_SIZE.em};

  > a {
    color: ${({ theme }) => theme.PALETTE.white};
    text-decoration: none;
  }
`;
