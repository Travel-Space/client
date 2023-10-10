import styled from "styled-components";
import { ModalBackground } from "@/styles/common";

export const Background = styled.div`
  ${ModalBackground}
`;

export const Container = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  width: 443px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  height: 100%;
`;
