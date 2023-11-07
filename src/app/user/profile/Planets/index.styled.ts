import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  display: flex;
  ${flexColumn}
`;
export const Number = styled.div`
  margin-top: 40px;
  margin-bottom: 16px;
  & > span {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  font-weight: 500;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const Content = styled.div`
  padding: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;
  & > div:nth-child(10n) {
    border-bottom: none;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;
export const InfiniteScrollTarget = styled.div`
  height: "20px";
  width: "100%";
  border: "none";
`;
