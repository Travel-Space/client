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

const sizeCSS = {
  shortVertical: css`
    width: 1px;
    height: 12px;
  `,
  vertical: css`
    width: 1px;
    height: 100%;
  `,
  horizontal: css`
    height: 1px;
    width: 100%;
  `,
};

export const Line = styled.div<colorProp>`
  ${({ color }) => colorCSS[color]}
  ${({ size }) => sizeCSS[size]}
`;
