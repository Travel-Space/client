import { styled } from "styled-components";
import { flexColumn, flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  padding: 16px;
  ${flexSpaceBetweenCenter}

  &>div {
    ${flexCenter}
  }
`;
export const Info = styled.div`
  ${flexColumn}
  gap:8px;
  margin-left: 24px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
`;
export const Email = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const AddButton = styled.button`
  width: 80px;
  height: 24px;
  ${flexCenter}

  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 500;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.primary[100]};
  border-radius: 8px;
`;
