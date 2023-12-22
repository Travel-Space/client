import { flexAlignCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const TitleContainer = styled.div`
  ${flexSpaceBetweenCenter}
  width: 100%;
  gap: 56px;
  margin-top: 40px;
`;

export const TitleImg = styled.img`
  width: 664px;
  height: 120px;
  background-color: transparent;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center;
`;
