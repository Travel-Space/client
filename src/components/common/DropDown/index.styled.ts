import { css, styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  position: relative;
`;
export const DropButton = styled.div<{ isDropped: boolean }>`
  ${flexSpaceBetweenCenter}
  width: 100%;
  height: 32px;
  padding: 0 16px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 8px;

  ${props =>
    props.isDropped &&
    css`
      border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
      outline: 2px solid #beddfd;
    `};

  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
    background: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const MenuList = styled.div<{ isDropped: boolean }>`
  position: absolute;

  width: 100%;
  border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};

  opacity: 0;
  visibility: hidden;

  transition:
    opacity 0.4s ease,
    visibility 0.4s;

  ${props =>
    props.isDropped &&
    css`
      opacity: 1;
      visibility: visible;
    `};

  z-index: 9;

  & > div:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  & > div:last-child {
    border-bottom: none;
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 32px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  &:hover {
    background-color: #f0f0f0;
  }
`;
