import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const Button = styled.button`
  background: none;
  font-family: inherit;
  font-size: inherit;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: #000;
  padding: 8px 24px;
  border-radius: 100px;
`;

export const ShareButton = styled(Button)`
  ${flexCenter}
  gap: 8px;
`;

export const PlanetTitle = styled.h1`
  color: ${({ theme }) => theme.PALETTE.white};
  font-weight: 700;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.hg};
`;
