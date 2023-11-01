import { styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  border-radius: 10px;
`;
export const Header = styled.div`
  ${flexSpaceBetweenCenter}
  margin-bottom: 24px;
`;
export const PostingsNumber = styled.div`
  & > span {
    font-weight: 500;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  }
  font-weight: 400;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

export const MyPostingsWrap = styled.div`
  width: 888px;
  padding: 24px 42px;
  margin-bottom: 40px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;

  & > div:nth-child(10n) {
    border-bottom: none;
  }
  & > div:last-child {
    border-bottom: none;
  }
`;
