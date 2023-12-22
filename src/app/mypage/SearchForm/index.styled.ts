import { styled, css } from "styled-components";
import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Search = styled.form`
  display: flex;
  align-items: center;
  width: 400px;
  height: 32px;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const Filter = styled.div`
  font-weight: 400;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const SearchInput = styled.input`
  padding: 4px;
  margin-left: 10px;
  border: none;
  font-weight: 400;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  flex: 1;
  &::placeholder {
    font-weight: 400;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
export const SearchBtn = styled.button`
  background-color: transparent;
  margin-left: 8px;
  margin-right: 16px;
  ${flexCenter}
`;

interface DropButtonProps {
  isDropped: boolean;
}
export const DropButton = styled.div<DropButtonProps>`
  ${flexSpaceBetweenCenter}
  width: 70px;
  padding: 8px 0;
  margin-left: 16px;
  margin-right: 10px;

  & > div {
    background: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const MenuList = styled.div<{ isDropped: boolean }>`
  position: absolute;
  width: 96px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  & > div:last-child {
    border-bottom: none;
  }

  & > div:first-child {
    border-top-left-radius: 9px;
    border-top-right-radius: 9px;
  }
  & > div:last-child {
    border-bottom-left-radius: 9px;
    border-bottom-right-radius: 9px;
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

export const Default = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-right: 8px;

  color: ${({ theme }) => theme.PALETTE.black};
`;
export const Menu = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  padding: 8px 16px;
  border-bottom: 1px solid ${({ color }) => (color === "gray" ? "#d9d9d9" : "none")};

  &:hover {
    background-color: #f0f0f0;
  }
`;
