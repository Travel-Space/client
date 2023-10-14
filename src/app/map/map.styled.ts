import styled, { keyframes } from "styled-components";

export const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.PALETTE.white};
`;

const WIDTH = "500px";

const slide = keyframes`
  from {
    right: -${WIDTH};
  }
  to {
    right: 0;
  }
`;

export const SideModal = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  width: ${WIDTH};
  background-color: ${({ theme }) => theme.PALETTE.white};
  height: 100%;
  z-index: 100;

  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${slide};
  animation-fill-mode: forwards;
`;
