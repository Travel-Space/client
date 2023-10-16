import { flexAlignCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const TitleContainer = styled.div`
  ${flexSpaceBetweenCenter}
  width: 100%;
  gap: 56px;
`;

export const TitleLine = styled.div`
  ${flexAlignCenter}
  flex: 1;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.white};
`;

export const TitleImg = styled.img`
  width: 664px;
  height: 104px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
