import styled from "styled-components";
import { bodyContainer, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrap = styled.header`
  height: 90px;
  background-color: rgba(0, 0, 0, 0.5);
  a,
  button {
    text-decoration: none;
    background: none;
    color: ${({ theme }) => theme.PALETTE.white};
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
    // 너무 두꺼우면 원래대로 바꿀 예정
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
    cursor: pointer;
  }
  ${flexCenter}
`;

export const Container = styled.div`
  ${bodyContainer}
  ${flexSpaceBetweenCenter}
`;

export const List = styled.ul`
  gap: 30px;
  ${flexCenter}
`;
