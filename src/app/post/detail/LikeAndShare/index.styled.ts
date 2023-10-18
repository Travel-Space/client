import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${flexSpaceBetweenCenter}
  margin: 24px 0 48px;
`;

export const Like = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 8px;
  cursor: pointer;
`;

export const Share = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 8px;
  cursor: pointer;
`;

export const LikeBtn = styled.img`
  ${flexCenter}
  width: 24px;
  height: 24px;
  gap: 8px;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const ShareBtn = styled.img`
  ${flexCenter}
  width: 24px;
  height: 24px;
  gap: 8px;
  background-color: transparent;
  background-repeat: no-repeat;
`;

export const VerticaLine = styled.div`
  height: 24px;
  margin: 0 24px;
`;
