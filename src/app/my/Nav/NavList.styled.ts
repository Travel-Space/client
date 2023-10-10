import { styled } from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 280px;
  padding: 24px;
`;
export const UserImg = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};

  line-height: 20px;
  margin-bottom: 9px;
`;
export const SubTitle = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  color: ${({ theme }) => theme.PALETTE.gray[200]};

  line-height: 17px;
  margin-bottom: 8px;

  ${flexColumn}
`;
