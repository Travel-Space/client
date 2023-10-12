import { flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

`;

export const Profile = styled.div`
  width: 48px;
  height: 48px;
  overflow: hidden;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
  border-radius: 50%;
  text-align: center;
`;

export const NFDisplay = styled.div`
  display: flex;
  gap: 8px;
`;

export const Name = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
`;

export const Flag = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
`;