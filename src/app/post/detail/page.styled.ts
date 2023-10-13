import { flexCenter, flexColumnCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  ${flexCenter}
`;

export const Content = styled.div`
  ${flexColumnCenter};
  margin-top: 40px;
  width: 1280px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 15px;
  padding: 88px;
`;
