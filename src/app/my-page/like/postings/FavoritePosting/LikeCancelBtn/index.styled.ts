import { styled } from "styled-components";
import { flexCenter } from "@/styles/common";

export const Button = styled.button`
  ${flexCenter}
  background-color: transparent;
`;

export const Path = styled.path`
  &:hover {
    fill: #d9d9d9;
  }
`;
