import styled from "styled-components";
import { bodyContainer } from "@/styles/common";

export const Form = styled.form`
  ${bodyContainer}
  display: flex;
  gap: 48px;
`;

export const Box = styled.div`
  flex: 1;
  border: 1px solid red;
`;

export const WhiteBox = styled.div`
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
  padding: 56px;
`;
