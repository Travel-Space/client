import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Search = styled.form`
  display: flex;
  align-items: center;
  width: 323px;
  height: 30px;
  padding: 5px 16px;
  display: flex;
  gap: 4px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const Filter = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const SearchInput = styled.input`
  border: none;
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  flex: 1;
  &::placeholder {
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
export const SearchBtn = styled.button`
  background-color: transparent;
  margin-left: 8px;
  ${flexCenter}
`;
