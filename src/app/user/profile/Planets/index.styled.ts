import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  display: flex;
  ${flexColumn}
`;
export const UserPlanets = styled.div`
  margin-top: 32px;
  margin-bottom: 48px;

  ${flexColumn}
`;
export const Header = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 700;
  color: ${({ theme }) => theme.PALETTE.black};
  margin-bottom: 16px;
`;
export const Planets = styled.div`
  display: flex;
  gap: 16px;
`;
export const NoMyPlanets = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  margin-top: 30px;
  border-radius: 5px;
  padding: 8px 16px;
  display: flex;
  justify-content: center;
`;
export const Number = styled.div`
  & > span {
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
  }
  font-weight: 500;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const Content = styled.div`
  padding: 24px;
  border: 1px solid #d9d9d9;
  border-radius: 10px;

  & > div:last-child {
    border-bottom: none;
  }
`;
export const InfiniteScrollTarget = styled.div`
  height: 20px;
  width: 100%;
  border: none;
`;
