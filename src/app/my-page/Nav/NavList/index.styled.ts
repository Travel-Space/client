import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 280px;
  padding: 24px;
  display: flex;
  border-top: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const List = styled.ul`
  margin-left: 8px;
  & > a {
    text-decoration: none;
    color: ${({ theme }) => theme.PALETTE.black};
  }
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
export const Title = styled.div`
  & > a {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
    color: ${({ theme }) => theme.PALETTE.black};
    line-height: 20px;
    text-decoration: none;
  }

  margin-bottom: 1px;
`;

export const SubTitle = styled.div`
  ${flexColumn};
  gap: 8px;

  & > a {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
    color: ${({ theme }) => theme.PALETTE.gray[200]};
    line-height: 17px;
    text-decoration: none;

    &:hover {
      color: ${({ theme }) => theme.PALETTE.black};
    }
    &.active {
      color: ${({ theme }) => theme.PALETTE.black};
    }
  }
`;
