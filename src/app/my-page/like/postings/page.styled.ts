import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Container = styled.div`
  border-radius: 10px;
`;

export const MyFriends = styled.div`
  width: 100%;
  padding: 24px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border: none;
  }
`;
