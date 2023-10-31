import { flexAlignCenter, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

export const Wrap = styled.div`
  padding: 0 70px;
  padding-bottom: 70px;
  overflow: scroll;
  height: calc(100vh - 77px);
`;

export const Container = styled.div`
  ${flexColumn}
  gap: 24px;
`;

export const Buttons = styled.div<{ $right: boolean }>`
  padding: 27px;
  ${flexSpaceBetweenCenter}
  justify-content: ${props => props.$right && "right"};
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
  font-weight: 800;
  line-height: 34px;
  margin-bottom: 32px;
  ${flexCenter};
`;

export const FormGroup = styled.form`
  ${flexColumn}
  gap: 32px;
`;

export const InputGroup = styled.div<{ $marginBottom?: number; $marginTop?: number }>`
  position: relative;
  ${props =>
    props.$marginBottom &&
    css`
      margin-bottom: ${props.$marginBottom}px;
    `};
  ${props =>
    props.$marginTop &&
    css`
      margin-top: ${props.$marginTop}px;
    `};
`;

export const SmallBtnGroup = styled.div<{ $country?: boolean }>`
  ${flexAlignCenter}
  gap: 8px;
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  button {
    flex: 1;
  }
  ${props =>
    props.$country &&
    css`
      width: 48px;
      img {
        width: 100%;
        object-fit: cover;
        box-shadow: 0px 0px 6px 0px rgba(0, 0, 0, 0.25);
      }
    `};
`;

export const Timer = styled.span`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-variant-numeric: tabular-nums;
`;

export const MarginGroup = styled.div`
  margin: 8px 0;
`;

export const Error = styled.span`
  color: ${({ theme }) => theme.PALETTE.error};
  position: absolute;
  right: 0;
  bottom: -20px;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
`;

export const CountryGroup = styled(InputGroup)`
  > input {
    cursor: pointer;
  }
`;
