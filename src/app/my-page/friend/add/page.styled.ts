import { styled } from "styled-components";
import { flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Container = styled.div``;

export const RecommendFriendWrap = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const SearchResults = styled.div`
  width: 888px;
  padding: 24px 42px;
  margin-top: 54px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border: none;
  }
`;
export const Row = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
export const ShowMoreBtn = styled.button`
  width: 140px;
  height: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  ${flexCenter}
  margin: 40px auto 0;
`;
