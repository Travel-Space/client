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

export const SmallBtnGroup = styled.div`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
`;
