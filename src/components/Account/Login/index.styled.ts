import { flexCenter, flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.div`
  ${flexColumn}
  gap: 24px;
`;

export const LineWithText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  gap: 16px;
  margin: 8px 0;
  ${flexCenter}
  &::before, &::after {
    content: "";
    display: block;
    height: 1px;
    background: ${({ theme }) => theme.PALETTE.gray[100]};
    flex: 1;
  }
`;

export const MarginGroup = styled.div`
  margin: 8px 0;
`;

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 16px;
`;

export const InputGroup = styled.div`
  position: relative;
`;

export const UnderLine = styled.button`
  text-decoration: underline;
  font-weight: 300;
  background: none;
  cursor: pointer;
  position: absolute;
  right: 0;
  top: 0;
`;
