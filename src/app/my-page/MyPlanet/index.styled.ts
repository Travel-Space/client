import { styled } from "styled-components";
import { flexSpaceBetweenCenter, flexCenter } from "@/styles/common";

export const Container = styled.div`
  width: 152px;
  height: 186px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 15px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
  padding: 16px;
  ${flexSpaceBetweenCenter}
  flex-direction: column;
  position: relative;
`;
export const Header = styled.div`
  width: 100%;
  ${flexSpaceBetweenCenter}
`;
export const People = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  line-heifht: 20px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;
export const Likes = styled.div`
  width: 88px;
  height: 24px;
  background-color: ${({ theme }) => theme.PALETTE.error};
  color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 15px;
  border: 1px solid rgba(225, 225, 225, 0.5);
  ${flexCenter};

  position: absolute;
  bottom: 42px;
`;
export const Number = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
  margin-left: 4px;
`;
