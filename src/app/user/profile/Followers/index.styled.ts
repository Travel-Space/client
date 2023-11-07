import { flexCenter } from "@/styles/common";
import { styled } from "styled-components";

export const MyFriendsWrap = styled.div`
  margin-top: 40px;
  width: 100%;
`;
export const MyFriends = styled.div`
  padding: 24px 42px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
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
export const InfiniteScrollTarget = styled.div`
  height: 20px;
  width: 100%;
  border: none;
`;
