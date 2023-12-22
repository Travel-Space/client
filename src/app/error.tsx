"use client";

import Link from "next/link";
import styled from "styled-components";

import { bodyContainer, flexCenter, flexColumnCenter } from "@/styles/common";

export default function Error() {
  return (
    <>
      <Container>
        <img src="/assets/img/icons/error/error.png" />

        <Comment>
          <div>문제가 발생했습니다!</div>
          <div>다시 메인으로 돌아가 주세요!</div>
        </Comment>

        <Button>
          <Link href={"/"}>
            <div>Click</div>
            <img src="/assets/img/icons/error/click.svg" />
          </Link>
        </Button>
      </Container>
    </>
  );
}

const Container = styled.div`
  ${bodyContainer}
  ${flexCenter}
  flex-direction: column;
  gap: 20px;

  height: calc(100vh - 90px);
  color: ${({ theme }) => theme.PALETTE.white};

  > img {
    width: 280px;
  }
`;

const Comment = styled.div`
  line-height: 1.5;
  ${flexColumnCenter}

  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 600;
`;

const Button = styled.div`
  padding: 8px 10px 8px 20px;
  border-radius: 50px;
  background: none;
  border: 2px solid ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  font-weight: 600;

  > a {
    ${flexCenter}
    color: ${({ theme }) => theme.PALETTE.white};
    text-decoration: none;

    > img {
      width: 30px;
    }
  }
`;
