import { styled } from "styled-components";
import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  width: 152px;
  height: 186px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  padding: 16px;
  ${flexSpaceBetweenCenter}
  flex-direction: column;
`;
export const Header = styled.div`
  ${flexSpaceBetweenCenter}
`;
export const People = styled.div`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  line-heifht: 20px;
`;
export const Title = styled.div``;
