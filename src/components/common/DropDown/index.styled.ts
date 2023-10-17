import { css, styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

interface ContainerProps {
  shape?: "default" | "medium" | "round";
  font: "sm" | "md" | "lg";
}
export const Container = styled.div<ContainerProps>`
  width: 100%;
  position: relative;
  ${({ shape }) => shape && shapeCSS[shape]}
  ${({ font }) => fontCSS[font]}
`;

interface DropButtonProps {
  isDropped: boolean;
  color: "black" | "gray";
}
export const DropButton = styled.div<DropButtonProps>`
  ${flexSpaceBetweenCenter}
  width: 100%;
  padding: 8px 16px;

  ${props =>
    props.isDropped
      ? css`
          border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
          outline: 2px solid #beddfd;
        `
      : colorCSS[props.color]};

  & > div {
    background: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const MenuList = styled.div<{ isDropped: boolean }>`
  position: absolute;
  width: 100%;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  & > div:last-child {
    border-bottom: none;
  }
  background-color: ${({ theme }) => theme.PALETTE.white};
  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.4s ease,
    visibility 0.4s;

  z-index: 9;

  ${props =>
    props.isDropped &&
    css`
      opacity: 1;
      visibility: visible;
    `};
`;
export const Default = styled.div<{ comment?: boolean }>`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;
  ${props =>
    props.comment &&
    css`
      color: ${({ theme }) => theme.PALETTE.gray[100]};
    `};
`;
export const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  &:hover {
    background-color: #f0f0f0;
  }
`;

const shapeCSS = {
  default: css`
    & > div {
      border-radius: 4px;
    }
    & > div:nth-child(2) {
      & > div:first-child {
        border-top-left-radius: 3px;
        border-top-right-radius: 3px;
      }
      & > div:last-child {
        border-bottom-left-radius: 3px;
        border-bottom-right-radius: 3px;
      }
    }
  `,
  medium: css`
    & > div {
      border-radius: 8px;
    }
    & > div:nth-child(2) {
      & > div:first-child {
        border-top-left-radius: 7px;
        border-top-right-radius: 7px;
      }
      & > div:last-child {
        border-bottom-left-radius: 7px;
        border-bottom-right-radius: 7px;
      }
    }
  `,
  round: css`
    & > div {
      border-radius: 10px;
    }
    & > div:nth-child(2) {
      & > div:first-child {
        border-top-left-radius: 9px;
        border-top-right-radius: 9px;
      }
      & > div:last-child {
        border-bottom-left-radius: 9px;
        border-bottom-right-radius: 9px;
      }
    }
  `,
};
const fontCSS = {
  sm: css`
    & > div:first-child {
      font-size: ${({ theme }) => theme.FONT_SIZE.xs};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    }
    & > div:nth-child(2) > div {
      font-size: ${({ theme }) => theme.FONT_SIZE.es};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    }
  `,
  md: css`
    & > div:first-child {
      font-size: ${({ theme }) => theme.FONT_SIZE.sm};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
    }
    & > div:nth-child(2) > div {
      font-size: ${({ theme }) => theme.FONT_SIZE.xs};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
    }
  `,
  lg: css`
    & > div:first-child {
      font-size: ${({ theme }) => theme.FONT_SIZE.md};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
    }
    & > div:nth-child(2) > div {
      font-size: ${({ theme }) => theme.FONT_SIZE.sm};
      font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
    }
  `,
};
const colorCSS = {
  black: css`
    border: 1px solid ${({ theme }) => theme.PALETTE.black};
  `,
  gray: css`
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  `,
};
