import styled, { css } from "styled-components";
import { commonContainer } from "../page.styled";
import { flexAlignCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrap = styled.div`
  ${commonContainer}
  padding: 40px 56px;
  background-color: white;
  border-radius: 10px;
  ${flexColumn}
  justify-content: space-between;
  gap: 24px;
`;

export const BetweenGroup = styled.div<{ $half?: boolean }>`
  ${flexSpaceBetweenCenter}
  gap: 16px;
  ${({ $half }) =>
    $half &&
    css`
      > * {
        flex: 1;
      }
    `}
`;

export const Header = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 600;
  ${flexAlignCenter}
  gap: 8px;
`;

export const RadioBox = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
  border-radius: 10px;
  overflow: hidden;
`;

export const Radio = styled.input`
  display: none;
  &:checked + label {
    color: ${({ theme }) => theme.PALETTE.white};
    background-color: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;

export const Label = styled.label`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  font-weight: 500;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  display: inline-block;
  text-align: center;
  padding: 8px 0;
  width: 72px;
  cursor: pointer;
`;

export const Description = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;

export const MarginGroup = styled.div`
  margin: 16px 0;
`;

export const InputGroup = styled.div`
  textarea {
    font-size: inherit;
    transition: all 0.2s;
    &::placeholder {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
    }
  }
`;
