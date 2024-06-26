"use client";
import { styled } from "styled-components";

import { flexColumn, flexColumnCenter } from "@/styles/common";

export const Container = styled.div`
  width: 890px;
  padding: 40px 45px;
  ${flexColumn}

  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[200]};
`;
export const TabListWrap = styled.div<{ selectedTab: number }>`
  display: flex;
  & > div:nth-child(${props => props.selectedTab + 1}) {
    color: ${({ theme }) => theme.PALETTE.black};
    border-bottom: 1px solid ${({ theme }) => theme.PALETTE.black};
  }
`;
export const Tab = styled.div`
  text-decoration: none;
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 700;
  line-height: 17px;
  padding: 10px 20px;

  &:hover {
    cursor: pointer;
    color: ${({ theme }) => theme.PALETTE.black};
  }
`;
export const MainContent = styled.div`
  ${flexColumnCenter}
`;
