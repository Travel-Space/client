import { flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.div`
  padding: 0 70px;
  padding-bottom: 70px;
  overflow: scroll;
  height: calc(100vh - 77px);
`;

export const Buttons = styled.div<{ $onlyCloseBtn: boolean }>`
  padding: 27px;
  ${flexSpaceBetweenCenter}
  justify-content: ${props => props.$onlyCloseBtn && "right"};
`;

export const Button = styled.button`
  cursor: pointer;
  font-size: 0;
  width: 23px;
  height: 23px;
  background: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  &.close {
    background-image: url("/assets/img/icons/close.svg");
  }
  &.prev {
    background-image: url("/assets/img/icons/prev.svg");
  }
`;

export const Title = styled.div`
  background: url("/assets/img/background/bg-planet-illust.png") no-repeat center / contain;
  height: 280px;
  text-align: center;
  font-size: 28px;
  font-family: ${({ theme }) => theme.FONT_WEIGHT.extraBold};
  line-height: 34px;
  margin-bottom: 32px;
  ${flexCenter};
`;
