import { styled } from "styled-components";
import { bodyContainer } from "@/styles/common";

export const Container = styled.div`
  ${bodyContainer}
  padding: 40px 32px 64px;

  width: 952px;
  min-height: 846px;
  margin: 40px auto 64px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const MainTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 600;
  margin-left: 8px;
  margin-bottom: 16px;
`;
export const Comment = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  margin-left: 8px;
  margin-bottom: 40px;
`;
