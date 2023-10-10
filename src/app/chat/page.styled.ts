import { bodyContainer, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${bodyContainer}
`;

export const Wrapper = styled.div`
  ${flexAlignCenter}
  gap: 8px;
  padding: 40px 0 64px 0;
`;

export const ChatBox = styled.div`
  height: 100vh;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
`;

export const ListTitle = styled.div`
  padding: 24px 134px;

  & span {
    text-align: center;
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

export const Line = styled.div`
  height: 1px;
  border: 1px solid #d9d9d9;
`;

export const ListBox = styled.div`
  height: calc(100vh - 88px);
  overflow: scroll; /* 세로 스크롤을 활성화 */
`;
