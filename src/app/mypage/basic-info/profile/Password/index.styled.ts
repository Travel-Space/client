import { flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Container = styled.div`
  ${flexColumn}
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  & > div:first-child > div {
    border-top-left-radius: 10px;
  }
  & > div:last-child > div {
    border-bottom-left-radius: 10px;
  }
`;
export const Error = styled.span`
  color: ${({ theme }) => theme.PALETTE.error};
  right: 0;
  bottom: -20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  margin-left: 16px;
`;
export const InputGroup = styled.div`
  & > input:first-child {
    -webkit-text-security: disc;
  }
  & > input {
    line-height: 17px;
    width: 244px;
    height: 33px;
    padding: 0 24px;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;
