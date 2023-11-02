import { flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

const selectStyle = css`
  width: 100%;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  font-family: inherit;
`;

export const SelectBox = styled.div`
  ${selectStyle}
  ${flexSpaceBetweenCenter}
  position: relative;
`;

export const Select = styled.div`
  ${flexSpaceBetweenCenter}
  width: 100%;
  > * {
    padding: 8px 16px;
    height: 32px;
    box-sizing: content-box;
    line-height: 32px;
  }
  button {
    background: none;
    border-left: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
    line-height: unset;
  }
`;

export const ListGroup = styled.ul`
  position: absolute;
  top: calc(100% + 1px);
  left: 0;
  ${selectStyle};
  border: none;
  box-shadow: 0 0 0 1px ${({ theme }) => theme.PALETTE.gray[100]};
  background: ${({ theme }) => theme.PALETTE.white};
  overflow: hidden;
  z-index: 1;
`;

export const List = styled.li<{ $selected: boolean }>`
  padding: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  &:last-child {
    border-bottom: none;
  }
  &:hover {
    cursor: pointer;
    background: #eee;
  }
    ${({ $selected }) =>
      $selected &&
      css`
        color: ${({ theme }) => theme.PALETTE.primary[100]};
      `};
}
`;
