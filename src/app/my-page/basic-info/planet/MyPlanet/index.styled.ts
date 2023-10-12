import { styled } from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

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
