import styled from "styled-components";
import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const TitleContainer = styled.div`
  min-width: 320px;
  text-align: center;
  padding: 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const Content = styled.div`
  width: 320px;
  padding: 24px 32px;

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    line-height: normal;
    margin-bottom: 16px;
  }
  span {
    font-weight: 600;
    line-height: normal;
  }
`;

export const Button = styled.button`
  margin-top: 16px;
  width: 100%;
  padding: 8px;
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  cursor: pointer;
  border-radius: 5px;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
`;
