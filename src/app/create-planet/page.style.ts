import styled, { css } from "styled-components";
import { bodyContainer, flexCenter } from "@/styles/common";
import { InputGroup } from "../account/common.styled";

export const Form = styled.form`
  ${bodyContainer}
  display: flex;
  gap: 48px;
  padding: 40px 0 64px;
`;

export const Box = styled.div`
  flex: 1;
  &.left {
    padding-top: 64px;
  }
  &.right {
    background-color: ${({ theme }) => theme.PALETTE.white};
    border-radius: 10px;
    padding: 56px;
  }
`;

export const Center = styled.div`
  ${flexCenter}
  gap: 24px;
`;

export const FormGroup = styled(InputGroup)`
  margin-bottom: 24px;
  width: 100%;
`;

export const AdjustBtnGroup = styled(InputGroup)`
  margin-bottom: 24px;
  width: 100%;
`;

const buttonBgReset = css`
  background: none;
  font-size: 0;
  width: 32px;
  height: 32px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;

export const ArrowLeft = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-left.svg");
`;

export const ArrowRight = styled.button`
  ${buttonBgReset}
  background-image: url("/assets/img/icons/arrow-right.svg");
`;
