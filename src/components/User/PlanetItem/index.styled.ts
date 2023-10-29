import { styled } from "styled-components";
import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  padding: 24px 18px;
  ${flexSpaceBetweenCenter}
`;
export const Info = styled.div`
  width: 100%;
  ${flexColumn}
  margin: 0 24px;
`;
export const InfoRow = styled.div`
  margin-bottom: 16px;
  ${flexSpaceBetweenCenter}
`;
export const InfoRowCol = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 8px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
`;
export const People = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const Position = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.mainColor};
  font-weight: 500;
`;
export const TagList = styled.div`
  display: flex;
  gap: 8px;
`;
export const Tag = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
  background-color: #f9f9f9;
  padding: 5px 16px;
  border-radius: 20px;
`;
