import { styled } from "styled-components";
import { flexCenter, flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  min-height: 846px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const Header = styled.header`
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px 42px;

  & > div {
    display: flex;
    gap: 24px;
    height: 43px;
  }
`;
export const FollowerNumber = styled.div<{ clicked: boolean }>`
  ${flexColumn}
  &>div:first-child {
    color: ${({ clicked }) => !!clicked && "#40A0FB"};
  }
`;

export const FollowingNumber = styled.div<{ clicked: boolean }>`
  ${flexColumn}
  &>div:first-child {
    color: ${({ clicked }) => !!clicked && "#40A0FB"};
  }
`;

export const Title = styled.div`
  &:hover {
    color: ${({ theme }) => theme.PALETTE.mainColor};
    cursor: pointer;
  }

  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 500;
  margin-bottom: 8px;
`;

export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 700;
`;

export const MainContainer = styled.div`
  padding: 32px 0 0;
  border-radius: 10px;
`;
