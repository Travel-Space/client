import { flexAlignCenter } from "@/styles/common";
import styled, { css } from "styled-components";

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

export const InputBox = styled.div`
  position: relative;
`;
