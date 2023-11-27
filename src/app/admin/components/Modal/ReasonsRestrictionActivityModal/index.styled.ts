import { flexAlignCenter } from "@/styles/common";
import styled from "styled-components";

export const Title = styled.p`
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  margin-bottom: 16px;
`;

export const Content = styled.div`
  width: 281px;
`;

export const SelectWithDefaultWrapper = styled.div`
  margin-bottom: 16px;
`;

export const TextareaWrapper = styled.div`
  margin-bottom: 16px;
`;

export const Button = styled.button`
  width: 100%;
  border-radius: 5px;
  padding: 8px;
  background-color: ${({ theme }) => theme.PALETTE.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 700;
  color: ${({ theme }) => theme.PALETTE.white};
`;
