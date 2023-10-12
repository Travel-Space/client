import { flexColumnCenter } from "@/styles/common";
import styled from "styled-components";

export const TitleWrapper = styled.div`
  ${flexColumnCenter}
  display: flex;
  width: 100%;
  gap: 48px;
`;

export const TitleSection = styled.div`
  display: flex;
  width: 100%;
  gap: 56px;
`;

export const TitleLine = styled.div`
  flex: 1;
  height: 48px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
`;

export const TitleImg = styled.div`
  width: 664px;
  height: 104px;
  background-color: transparent;
  background-image: url(/assets/img/icons/random-travel.svg);
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;

export const InfoText = styled.div`
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  line-height: 2;
  text-align: center;

`;