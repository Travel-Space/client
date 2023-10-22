import { flexColumn } from "@/styles/common";
import styled, { css } from "styled-components";

export const Wrap = styled.div`
  ${flexColumn}
  gap: 24px;
`;

export const InputGroup = styled.div<{ $marginBottom?: number }>`
  position: relative;
  ${props =>
    props.$marginBottom &&
    css`
      margin-bottom: ${props.$marginBottom}px;
    `};
`;

export const SmallBtnGroup = styled.div<{ $country?: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  ${props =>
    props.$country &&
    css`
      width: 48px;
      img {
        width: 100%;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
      }
    `};
`;
