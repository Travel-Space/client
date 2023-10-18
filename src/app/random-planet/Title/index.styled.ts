import { flexAlignCenter, flexColumnCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const TitleWrapper = styled.div`
  ${flexColumnCenter}
  display: flex;
  width: 100%;
  gap: 48px;
  margin-top: 40px;
`;

export const TitleSection = styled.div`
  ${flexSpaceBetweenCenter}
  width: 100%;
  gap: 56px;
`;

export const TitleImg = styled.img`
  width: 664px;
  height: 104px;
  background-color: transparent;

  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const InfoText = styled.div`
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 400;
  line-height: 2;
  text-align: center;
`;
