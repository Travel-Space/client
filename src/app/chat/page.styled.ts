import styled from "styled-components";
import { bodyContainer, flexAlignCenter } from "@/styles/common";

export const Container = styled.div`
  ${bodyContainer}
  ${flexAlignCenter}
  height: calc(100vh - 90px);
  gap: 16px;
  padding: 20px 0 64px 0;
`;

export const ChatBox = styled.div`
  height: 100%;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: ${({ theme }) => theme.PALETTE.white};
`;

export const ListTitle = styled.div`
  padding: 24px 0;
  text-align: center;

  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  }
`;

export const ListBox = styled.div`
  height: calc(100% - 75px);
  overflow: scroll; /* 세로 스크롤을 활성화 */
`;
