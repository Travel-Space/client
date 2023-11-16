import { flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Wrap = styled.main`
  ${flexColumn}
  justify-content: center;
  height: calc(100vh - 90px);
`;

export const Container = styled.div`
  background: ${({ theme }) => theme.PALETTE.white};
  width: 360px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
`;
