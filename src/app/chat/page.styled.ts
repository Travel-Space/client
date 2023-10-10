import { bodyContainer, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${bodyContainer}
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const Wrapper = styled.div`
  ${flexAlignCenter}
  gap: 8px;
  margin: 40px 0 64px 0;
  border: 1px solid red;
`;

export const ChatBox = styled.div`
  border: 1px solid #d9d9d9;
  background-color: ${({ theme }) => theme.PALETTE.white};
`;

export const ListTitle = styled.div`
  padding: 24px 0;

  & span {
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

export const Line = styled.div``;
