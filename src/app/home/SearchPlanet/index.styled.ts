import styled from "styled-components";
import { flexColumn, flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  width: 440px;
  height: 104px;
  gap: 24px;
`;

export const SearchContainer = styled.form`
  position: relative;
  width: 440px;
  height: 40px;
`;

export const SearchInput = styled.input`
  width: 440px;
  height: 40px;
  padding: 8px;
  background-color: transparent;
  border: none;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.big};

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.white};
  }
  &:focus {
    outline: none;
  }
`;

export const SearchBtn = styled.button`
  position: absolute;
  top: 50%;
  padding: 8px;
  right: 8px;
  transform: translateY(-50%);
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-image: url(/assets/img/icons/search.svg);
  background-repeat: no-repeat;
`;

export const BtnContainer = styled.div`
  ${flexSpaceBetweenCenter}
  gap:32px;
`;

export const RandomCreateBtn = styled.div`
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 13px 40px;
  text-align: center;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const RandomPlanetBtn = styled.div`
  border-radius: 32px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 13px 40px;
  text-align: center;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.white};
  }
`;
