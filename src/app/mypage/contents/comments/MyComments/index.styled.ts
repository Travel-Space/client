import { styled } from "styled-components";
import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  padding: 24px 8px 24px 16px;
  ${flexColumn}
  gap: 16px;
`;
export const InfoRow = styled.div`
  ${flexSpaceBetweenCenter}
`;
export const InfoRowCol = styled.div`
  display: flex;
  gap: 16px;
`;
export const Planet = styled.div`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const CreatedDate = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-weight: 400;
`;
export const Comment = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
`;
export const Buttons = styled.div`
  display: flex;
  gap: 8px;

  & > button {
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
    font-weight: 400;
    padding: 8px 18px;
    border-radius: 10px;
    background-color: ${({ theme }) => theme.PALETTE.white};
  }
`;
