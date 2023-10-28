import { styled } from "styled-components";
import { flexAlignCenter } from "@/styles/common";

export const Container = styled.div`
  display: flex;
`;
export const Name = styled.div`
  background-color: #f9f9f9;
  border-right: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;

  width: 211px;
  padding-left: 24px;
  ${flexAlignCenter}
`;
export const Content = styled.div`
  margin: 16px 0;
  padding-left: 24px;
`;
