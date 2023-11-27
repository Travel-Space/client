import { flexCenter } from "@/styles/common";
import styled from "styled-components";

export const Notification = styled.p`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  text-align: center;
  line-height: 32px;
  b {
    font-weight: 700;
  }
  margin-bottom: 24px;
  padding: 24px 0;
`;

export const NotificationBox = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  text-align: center;
  line-height: 32px;
  b {
    font-weight: 700;
  }
  margin-bottom: 24px;
  padding: 24px 0;
`;

export const CenterGroup = styled.div`
  ${flexCenter}
  gap: 16px;
`;

export const MemberList = styled.div`
  margin-top: 24px;
  max-height: 400px;
  overflow: scroll;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;
