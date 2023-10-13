import { styled } from "styled-components";
import { flexCenter, flexColumnCenter } from "@/styles/common";

export const Container = styled.div`
  width: 840px;
  height: 546px;
  display: flex;
  ${flexCenter}
  flex-direction: column;
`;
export const Explanation = styled.div`
  ${flexColumnCenter};
  & > div {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
  }
  & > div:nth-child(1) {
    margin-top: 32px;
    margin-bottom: 16px;
    font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  }
  & > div:nth-child(2) {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    font-size: ${({ theme }) => theme.FONT_SIZE.big};
  }
`;
