import { styled } from "styled-components";
import { flexColumn, flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  padding: 16px;
  ${flexSpaceBetweenCenter}

  &>div {
    ${flexCenter}
  }
`;
export const Info = styled.div`
  ${flexColumn}
  gap:8px;
  margin-left: 24px;
`;
export const Name = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
`;
export const Email = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;

export const FollowBtn = styled.div`
  & > button {
    padding: 5px 24px;
  }
`;
