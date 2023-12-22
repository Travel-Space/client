import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const Notification = styled.div`
  text-align: center;
  line-height: 32px;
  b {
    font-weight: 700;
  }
  margin-bottom: 24px;
`;

export const NoList = styled.div`
  padding: 40px 0;
  p {
    opacity: 0.5;
  }
`;

export const MemberList = styled.div`
  margin-top: 24px;
  height: 400px;
  overflow: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const SearchGroup = styled.div`
  ${flexCenter}
  margin-bottom: 24px;
  > input {
    flex: 5;
    border-radius: 10px 0 0 10px;
    border-right: none;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    padding: 0 16px;
    height: 40px;
  }
  > button {
    flex: 1;
    height: 40px;
    border-radius: 0 10px 10px 0;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    ${flexCenter}
    gap: 8px;
  }
`;
