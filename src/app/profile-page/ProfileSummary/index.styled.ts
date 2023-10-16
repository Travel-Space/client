import { styled } from "styled-components";
import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter, flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 890px;
  height: 228px;
  padding: 0 52px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  ${flexSpaceBetweenCenter}
  border-radius: 10px;
`;
export const UserInfo = styled.div`
  display: flex;
  gap: 24px;
  ${flexAlignCenter}
`;
export const Nickname = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
  margin-bottom: 8px;
`;
export const Email = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  margin-bottom: 16px;
`;
export const AddButton = styled.button`
  width: 80px;
  height: 24px;
  ${flexCenter}

  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.primary[100]};
  border-radius: 8px;
`;

export const FollowerNumber = styled.div`
  ${flexColumn}
`;
export const FollowingNumber = styled.div`
  ${flexColumn}
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  margin-bottom: 8px;
`;
export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
export const Friends = styled.div`
  display: flex;
  gap: 24px;
`;
