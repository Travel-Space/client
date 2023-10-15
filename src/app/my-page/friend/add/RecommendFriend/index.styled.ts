import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 152px;
  height: 186px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px;
  ${flexCenter}
  flex-direction: column;
`;
export const Nickname = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  margin: 16px 0 8px;
`;
export const FollowBtn = styled.button`
  width: 80px;
  height: 24px;
  background-color: ${({ theme }) => theme.PALETTE.primary[100]};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.white};
  ${flexCenter}
`;