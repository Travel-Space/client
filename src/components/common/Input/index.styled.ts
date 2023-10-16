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

export const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-family: ${({ theme }) => theme.FONT_WEIGHT.semiBold};
`;

export const Input = styled.input`
  ${inputStyle}
`;
