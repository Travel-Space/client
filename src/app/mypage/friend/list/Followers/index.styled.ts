import { flexCenter } from "@/styles/common";
import { styled } from "styled-components";

export const MyFriendsWrap = styled.div`
  width: 100%;
  padding: 24px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
export const MyFriends = styled.div`
  & > div:nth-child(10n) {
    border-bottom: none;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;
export const ShowMoreBtn = styled.button`
  width: 140px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  ${flexCenter}
  margin: 40px auto 0;
  &:disabled {
    display: none;
  }
`;
