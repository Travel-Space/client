import { flexCenter, flexColumnCenter, bodyContainer } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
  ${bodyContainer}
`;

export const Content = styled.div`
  ${flexColumnCenter};
  margin-top: 40px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 15px;
  padding: 88px;
`;
