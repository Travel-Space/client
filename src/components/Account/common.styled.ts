import { flexAlignCenter, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";
import styled, { css } from "styled-components";

const commonButton = css`
  width: 100%;
  padding: 16px;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  cursor: pointer;
  font-family: inherit;
`;

const inputStyle = css`
  width: 100%;
  outline: none;
  padding: 16px;
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

export const ButtonGroup = styled.div`
  ${flexAlignCenter};
  gap: 16px;
`;

export const LinkButton = styled.button`
  ${commonButton}
  border-radius: 100px;
  background: linear-gradient(90deg, #41a0fb 34.77%, #1588fc 100%);
  color: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
  ${flexCenter}
  &:disabled {
    opacity: 0.4;
  }
`;

export const OutlineButton = styled.button`
  ${commonButton}
  color: ${({ theme }) => theme.PALETTE.primary[100]};
  border: 1px solid ${({ theme }) => theme.PALETTE.primary[100]};
  background: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const FillButton = styled.button`
  ${commonButton}
  color: ${({ theme }) => theme.PALETTE.white};
  background: ${({ theme }) => theme.PALETTE.mainColor};
  border: 1px solid ${({ theme }) => theme.PALETTE.mainColor};
  border-radius: 10px;
`;

export const UnderLineButton = styled.button`
  text-decoration: underline;
  font-weight: 300;
  background: none;
  cursor: pointer;

  &.link-in-input {
    position: absolute;
    right: 0;
    top: 0;
  }
`;

export const SmallButton = styled.button`
  cursor: pointer;
  background: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  padding: 6px 16px;
  border-radius: 5px;

  &.button-in-input {
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
  }
`;

export const Line = styled.hr`
  background: ${({ theme }) => theme.PALETTE.gray[100]};
  margin: 32px 0;
  border: none;
  height: 1px;
`;

export const InputGroup = styled.div`
  margin-bottom: 16px;
  position: relative;
`;

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
`;

export const Input = styled.input`
  ${inputStyle}
`;

export const TextArea = styled.textarea<{ $height: string }>`
  resize: none;
  height: ${props => (props.$height ? props.$height : "auto")};
  ${inputStyle}
`;

export const LineWithText = styled.span`
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  gap: 16px;
  margin: 24px 0;
  ${flexCenter}
  &::before, &::after {
    content: "";
    display: block;
    height: 1px;
    background: ${({ theme }) => theme.PALETTE.gray[100]};
    flex: 1;
  }
`;

export const InputBox = styled.div`
  position: relative;
`;
