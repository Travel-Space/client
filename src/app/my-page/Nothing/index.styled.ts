import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 840px;
  height: 546px;
  display: flex;
  ${flexCenter}
  flex-direction: column;
`;
export const Comment = styled.div`
  margin-top: 40px;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
`;
export const Suggest = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
`;
