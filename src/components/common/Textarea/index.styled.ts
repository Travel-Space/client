import styled, { css } from "styled-components";
import { sizeProp } from ".";

const sizeCSS = {
  spaceShip: css`
    height: 96px;
  `,
  declaration: css`
    height: 116px;
  `,
  admin: css`
    height: 130px;
  `,
  comment: css`
    height: 160px;
  `,
  post: css`
    height: 180px;
  `,
  planet: css`
    height: 224px;
  `,
};

export const Textarea = styled.textarea<sizeProp>`
  ${({ size }) => sizeCSS[size]}
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 16px;
  resize: none;
  width: 100%;
  transition: all 0.2s;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  outline: none;

  ${({ size }) =>
    size === "admin"
      ? css`
          &:focus {
            border-color: ${({ theme }) => theme.PALETTE.black};
            box-shadow: 0 0 0 3px #${({ theme }) => theme.PALETTE.black};
          }
        `
      : css`
          &:focus {
            border-color: ${({ theme }) => theme.PALETTE.primary[200]};
            box-shadow: 0 0 0 3px #bdddfd;
          }
        `}

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
