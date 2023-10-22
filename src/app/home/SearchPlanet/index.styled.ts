import styled from "styled-components";
import { bodyContainer, flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  ${bodyContainer}
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
  padding: 8px 40px 16px 8px;
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
  width: 24px;
  height: 24px;
  right: 8px;
  transform: translateY(-60%);
  top: 50%;
  background-color: transparent;
`;

export const SerachBtnImg = styled.img`
  right: 8px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const BtnContainer = styled.div`
  ${flexSpaceBetweenCenter}
  gap:32px;
`;

export const NewCreateBtn = styled.div`
  width: 196px;
  height: 43px;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.white};
  }
`;

export const RandomPlanetBtn = styled.div`
  width: 196px;
  height: 43px;

  & a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.white};
  }
`;
