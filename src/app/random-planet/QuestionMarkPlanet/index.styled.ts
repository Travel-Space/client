import styled from "styled-components";
import { flexColumnCenter, flexCenter } from "@/styles/common";

export const Wrapper = styled.div`
  ${flexColumnCenter}
  gap:56px;

`;

export const PlanetImg = styled.img`
  width: 240px;
  height: 240px;

  background-color: transparent;
  background-repeat: no-repeat;
`;

export const RamdomBtn = styled.div`
  ${flexCenter}
  border-radius: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.white};
  padding: 13px 40px;
  text-align: center;
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
`;

export const RightArrow = styled.img`
  width: 24px;
  height: 24px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: cover;
`;
