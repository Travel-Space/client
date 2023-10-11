import styled, { keyframes } from "styled-components";
import { ModalBackground } from "@/styles/common";

export const Background = styled.div`
  ${ModalBackground}
`;

const WIDTH = "443px";

const slide = keyframes`
  from {
    right: -${WIDTH};
  }
  to {
    right: 0;
  }
`;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: ${WIDTH};
  background-color: ${({ theme }) => theme.PALETTE.white};
  height: 100%;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;
