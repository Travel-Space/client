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
};

export const Textarea = styled.textarea<sizeProp>`
  ${({ size }) => sizeCSS[size]}
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  padding: 16px;
  resize: none;
  width: 100%;
`;
