import { flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${flexColumn}
  gap: 16px;
`;
export const Error = styled.span`
  color: ${({ theme }) => theme.PALETTE.error};
  right: 0;
  bottom: -20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  margin-left: 16px;
`;
export const InputGroup = styled.div`
  & > input {
    line-height: 17px;
    width: 244px;
    height: 33px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;
