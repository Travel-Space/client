import { flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

const inputStyle = css`
  width: 100%;
  outline: none;
  padding: 8px 16px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  box-shadow: 0 0 0 0px #bdddfd;
  transition: all 0.2s;
  font-family: inherit;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary[200]};
    box-shadow: 0 0 0 3px #bdddfd;
  }
`;

const buttonBgReset = css`
  background: none;
  font-size: 0;
  width: 32px;
  height: 32px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  &:disabled {
    opacity: 0.4;
  }
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Input = styled.input`
  border: none;
  outline: none;
  text-align: center;
  font-size: ${({ theme }) => theme.FONT_SIZE.big};
  font-family: inherit;
  width: inherit;
  /* Chrome, Safari, Edge, Opera */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  /* Firefox */
  &[type="number"] {
    -moz-appearance: textfield;
  }
`;

export const AdjustInput = styled.div`
  ${inputStyle}
  ${flexSpaceBetweenCenter}
`;

export const MinusButton = styled.button`
  ${buttonBgReset}
  background-image: url(/assets/img/icons/circle-minus.svg);
`;

export const PlusButton = styled.button`
  ${buttonBgReset}
  background-image: url(/assets/img/icons/circle-plus.svg);
`;
