import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const ContentBox = styled.div`
  ${flexColumn}
  justify-content: space-between;
  height: 100vh;
  width: 100%;
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const TopBox = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const Line = styled.div`
  width: 100%;
  height: 1px;
  border: 1px solid #d9d9d9;
`;

export const BottomBox = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 16px;
  padding: 16px 8px;
`;

export const Image = styled.img`
  height: 40px;
  width: 40px;
`;

export const Input = styled.input`
  height: 40px;
  width: 728px;
  padding: 8px 16px;
  border-radius: 20px;
`;

export const Button = styled.button`
  height: 40px;
  color: ${({ theme }) => theme.PALETTE.white};
  background-color: ${({ theme }) => theme.PALETTE.primary[200]};
  border-radius: 20px;
  padding: 0 24px;
`;
