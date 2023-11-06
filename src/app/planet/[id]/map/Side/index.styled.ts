import styled, { keyframes } from "styled-components";
import { ModalBackground, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

const WIDTH = "500px";

const slide = keyframes`
  from {
    left: -${WIDTH};
  }
  to {
    left: 0;
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

export const Container = styled.div`
  ${ModalBackground}
  width: ${WIDTH};
  background: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 4px 0px 4px 0px rgba(51, 51, 51, 0.1);
  z-index: 98;

  animation-duration: 0.5s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;

export const Wrapper = styled.div`
  ${flexColumn}
  gap: 40px;
  padding: 32px 56px;
  background: ${({ theme }) => theme.PALETTE.white};

  animation: ${fadeIn} 0.3s ease forwards;
`;

export const Middle = styled.div`
  padding: 0 8px 16px 8px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  ${flexSpaceBetweenCenter}

  > div {
    width: 160px;
  }

  > select {
    border: none;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;

export const CloseBtn = styled.button`
  width: 70px;
  height: 80px;
  top: 50%;
  right: -40px;
  ${flexCenter}
  position: absolute;
  padding: 10px 0 10px 30px;
  border-radius: 0px 10px 10px 0px;
  background: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  z-index: -1;
`;

export const Button = styled.button`
  padding: 8px 24px;
  border-radius: 5px;
  color: ${({ theme }) => theme.PALETTE.white};
  background: ${({ theme }) => theme.PALETTE.mainColor};
`;

export const ScrollBox = styled.div`
  ${flexColumn}
  overflow: scroll;
  padding-bottom: 40px;
  height: calc(100vh - 300px);
`;

export const ObserverRef = styled.div`
  height: 10px;
  border: none;
`;
