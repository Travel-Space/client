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
  post: css`
    height: 160px;
  `,
  comment: css`
    height: 180px;
  `,
};

export const Textarea = styled.textarea<sizeProp>`
  ${({ size }) => sizeCSS[size]}
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 0 16px;
  resize: none;
`;
