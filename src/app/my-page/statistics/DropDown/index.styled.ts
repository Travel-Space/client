import { css, styled } from "styled-components";
import { flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Default = styled.div`
  ${flexSpaceBetweenCenter}
  width: 180px;
  padding: 0 16px;
  height: 32px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;

  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  }
`;

export const PlanetListWrap = styled.div<{ isDropped: boolean }>`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.2);

  opacity: 0;
  visibility: hidden;
  position: absolute;
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

  & > div:first-child {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  & > div:last-child {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export const PlanetList = styled.div`
  ${flexSpaceBetweenCenter}
  width: 180px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  height: 32px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  border: none;

  &:hover {
    background-color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
