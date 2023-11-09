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
