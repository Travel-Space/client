import { styled } from "styled-components";
import { flexColumn, flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 280px;
  height: 267px;
  padding: 40px 0;
  ${flexColumn}
  ${flexCenter}
`;
export const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  margin-bottom: 16px;
  cursor: pointer;
`;
export const Nickname = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-weight: 700;

  line-height: 24px;
  margin-bottom: 8px;
`;
export const Email = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 400;
  color: ${({ theme }) => theme.PALETTE.gray[200]};

  line-height: 19px;
`;
