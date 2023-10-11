import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.div`
  padding: 0 70px;
`;

export const Buttons = styled.div<{ $onlyCloseBtn: boolean }>`
  padding: 30px;
  ${flexSpaceBetweenCenter}
  justify-content: ${props => props.$onlyCloseBtn && "right"};
`;

export const Title = styled.div`
  background: url("/assets/img/background/bg-planet-illust.png") no-repeat center / contain;
  height: 280px;
  text-align: center;
  font-size: 28px;
  font-family: ${({ theme }) => theme.FONT_WEIGHT.extraBold};
  line-height: 34px;
  ${flexCenter};
`;
