import styled, { css } from "styled-components";
import { colorProp } from ".";

const colorCSS = {
  gray: css`
    border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  `,
  white: css`
    border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
  `,
};

export const Line = styled.div<colorProp>`
  ${({ color }) => colorCSS[color]}
  height: 1px;
  width: 100%;
`;
