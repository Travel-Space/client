import styled, { css } from "styled-components";

const inputStyle = css`
  width: 100%;
  outline: none;
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
  font-weight: 600;
`;

interface Props {
  $rounded: boolean;
  $thin: boolean;
  $warning: boolean;
}

export const Input = styled.input<Partial<Props>>`
  ${inputStyle}
  padding: ${props => (props.$thin ? "8px 16px" : "16px")};
  border-radius: ${props => (props.$rounded ? "999px" : "10px")};
  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
  ${props =>
    props.$warning &&
    css`
      border-color: ${({ theme }) => theme.PALETTE.error};
      box-shadow: 0 0 0 3px #ff363638;
      &:focus {
        border-color: ${({ theme }) => theme.PALETTE.error};
        box-shadow: 0 0 0 3px #ff363638;
      }
    `};
`;
