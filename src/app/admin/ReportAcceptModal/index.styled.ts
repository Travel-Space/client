import { flexSpaceBetweenCenter, flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const TitleContainer = styled.div`
  min-width: 320px;
  text-align: center;
  padding: 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const Content = styled.div`
  padding: 24px 16px;
`;

export const TitleList = styled.li`
  margin-bottom: 16px;
  ${flexAlignCenter}
`;

export const TitleText = styled.p`
  margin-left: 8px;
  font-weight: 700;
`;

export const Circle = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.PALETTE.black};

  p {
    color: ${({ theme }) => theme.PALETTE.white};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 8px;
  background-color: ${({ theme }) => theme.PALETTE.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const ButtonContainer = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 16px;
`;

export const TextareaContainer = styled.div`
  margin-bottom: 24px;
`;
