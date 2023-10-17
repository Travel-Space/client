import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  height: 546px;
  display: flex;
  ${flexCenter}
  flex-direction: column;
`;
export const Comment = styled.div`
  margin-top: 40px;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
`;
export const Suggest = styled.div`
  margin-top: 16px;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-weight: 400;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
`;
