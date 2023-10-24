import { flexCenter } from "@/styles/common";
import styled from "styled-components";

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

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 16px;
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
