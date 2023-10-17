import { flexAlignCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.div`
  margin-bottom: 40px;
`;

export const Header = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 600;
  ${flexAlignCenter}
  gap: 8px;
`;

export const FlexBox = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const RadioBox = styled.div`
  border: 2px solid ${({ theme }) => theme.PALETTE.mainColor};
  border-radius: 10px;
  overflow: hidden;
  input {
    display: none;
    &.checked + label {
      color: ${({ theme }) => theme.PALETTE.white};
      background-color: ${({ theme }) => theme.PALETTE.mainColor};
    }
  }
  label {
    color: ${({ theme }) => theme.PALETTE.mainColor};
    font-weight: 500;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    display: inline-block;
    text-align: center;
    padding: 8px 0;
    width: 72px;
    cursor: pointer;
  }
`;

export const Description = styled.span`
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;

export const Line = styled.hr`
  background: ${({ theme }) => theme.PALETTE.gray[100]};
  margin: 16px 0;
  border: none;
  height: 1px;
`;
