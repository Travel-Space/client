import styled, { keyframes } from "styled-components";
import { ModalBackground, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

const WIDTH = "500px";

const slide = keyframes`
  from {
    right: -${WIDTH};
  }
  to {
    right: 0;
  }
`;

export const Container = styled.div`
  ${ModalBackground}
  padding: 32px 56px;
  ${flexColumn}
  gap: 40px;
  width: ${WIDTH};
  background-color: ${({ theme }) => theme.PALETTE.white};

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;

export const Middle = styled.div`
  padding: 0 8px 16px 8px;
  ${flexSpaceBetweenCenter}

  > select {
    border: none;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  }
`;

export const Button = styled.button`
  padding: 8px 24px;
  border-radius: 5px;
  color: ${({ theme }) => theme.PALETTE.white};
  background: ${({ theme }) => theme.PALETTE.mainColor};
`;

export const ScrollBox = styled.div`
  ${flexColumn}
  gap: 24px;
  overflow: scroll;
  padding-bottom: 100px;
  height: calc(100vh - 300px);
`;