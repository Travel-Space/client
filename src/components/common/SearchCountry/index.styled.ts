import { flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const SearchBox = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  position: absolute;
  width: 100%;
  top: calc(100% - 1px);
  background: ${({ theme }) => theme.PALETTE.white};
  max-height: 204px;
  min-height: 80px;
  height: auto;
  overflow: scroll;
  box-shadow: 0px 6px 6px 0px rgba(0, 0, 0, 0.25);
`;

export const Search = styled.div`
  position: sticky;
  top: 0;
  background: ${({ theme }) => theme.PALETTE.white};
  padding: 8px 16px 0;
  input {
    width: 100%;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    outline: none;
    padding: 8px 0;
    border: none;
    border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
    &::placeholder {
        color: ${({ theme }) => theme.PALETTE.gray[100]};
    }
`;

export const SearchList = styled.ul`
  li {
    ${flexSpaceBetweenCenter}
    cursor: pointer;
    padding: 8px 16px;
    gap: 8px;
    &:hover {
      background: #eee;
    }
    p {
      span {
        font-size: ${({ theme }) => theme.FONT_SIZE.sm};
      }
    }
    img {
      object-fit: cover;
      width: 48px;
      box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
    }
  }
`;
