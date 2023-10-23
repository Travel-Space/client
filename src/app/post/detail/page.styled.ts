import { flexCenter, flexColumnCenter, bodyContainer } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
  ${bodyContainer}
`;

export const Content = styled.div`
  ${flexColumnCenter};
  margin: 40px 0 64px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 15px;
  padding: 88px;
`;
