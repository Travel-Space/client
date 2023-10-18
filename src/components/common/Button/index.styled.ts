import styled, { css } from "styled-components";
import { ButtonHTMLAttributes } from "react";

export const variantCSS = {
  confirm: css`
    background: ${({ theme }) => theme.PALETTE.mainColor};
    color: ${({ theme }) => theme.PALETTE.white};
    cursor: pointer;
    &:disabled {
      background: ${({ theme }) => theme.PALETTE.gray[100]};
      color: ${({ theme }) => theme.PALETTE.black};
    }
  `,
  reverse: css`
    background: ${({ theme }) => theme.PALETTE.white};
    border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
    color: ${({ theme }) => theme.PALETTE.mainColor};

    &:disabled {
      background: ${({ theme }) => theme.PALETTE.gray[100]};
      color: ${({ theme }) => theme.PALETTE.black};
    }
  `,
  gradient: css`
    background: linear-gradient(90deg, #40a0fb 34.77%, #1588fc 100%);
    color: ${({ theme }) => theme.PALETTE.white};

    &:disabled {
      background: ${({ theme }) => theme.PALETTE.gray[100]};
      color: ${({ theme }) => theme.PALETTE.black};
    }
  `,
  basic: css`
    background: ${({ theme }) => theme.PALETTE.black};
    color: ${({ theme }) => theme.PALETTE.white};
  `,
  error: css`
    background: ${({ theme }) => theme.PALETTE.white};
    border: 1px solid ${({ theme }) => theme.PALETTE.error};
    color: ${({ theme }) => theme.PALETTE.error};
  `,
  white: css`
    background: ${({ theme }) => theme.PALETTE.white};
    color: ${({ theme }) => theme.PALETTE.white};
  `,
  cancel: css`
    background: ${({ theme }) => theme.PALETTE.white};
    color: ${({ theme }) => theme.PALETTE.black};
  `,
};

const shapeCSS = {
  small: css`
    border-radius: 5px;
  `,
  medium: css`
    border-radius: 10px;
  `,
  large: css`
    border-radius: 30px;
  `,
  extraLarge: css`
    border-radius: 20px;
  `,
};

const sizeCSS = {
  smallWithXsFont: css`
    width: 100%;
    padding: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    font-weight: 400;
  `,
  smallWithSmFont: css`
    width: 100%;
    padding: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
  `,
  smallWithMdFont: css`
    width: 100%;
    padding: 8px;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 400;
  `,
  normal: css`
    width: 100%;
    padding: 13px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
  `,
  medium: css`
    width: 100%;
    padding: 14px;
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    font-weight: 400;
  `,
  big: css`
    width: 100%;
    padding: 15px;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 400;
  `,
};

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: keyof typeof variantCSS;
  shape?: keyof typeof shapeCSS;
  size?: keyof typeof sizeCSS;
}

export const Button = styled.button<ButtonProps>`
  cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};

  ${({ variant }) => variant && variantCSS[variant]}
  ${({ shape }) => shape && shapeCSS[shape]}
  ${({ size }) => size && sizeCSS[size]}
`;
