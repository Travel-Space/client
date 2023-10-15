import styled from "styled-components";
import { flexColumn } from "@/styles/common";

export const Container = styled.div`
  width: 100%;
  color: ${({ theme }) => theme.PALETTE.white};
`;

export const Map = styled.div`
  ${flexColumn}
  gap: 12px;
  align-items: center;
  justify-content: center;
`;
