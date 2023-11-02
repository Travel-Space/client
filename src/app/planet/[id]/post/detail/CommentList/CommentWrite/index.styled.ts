import { flexColumn } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${flexColumn}
  width: 100%;
  height: 100%;
  gap: 24px;
  margin-top: 24px;
`;

export const BtnDisplay = styled.div`
  display: flex;
  justify-content: right;
`;

export const CommentButton = styled.button`
  width: 140px;
  height: 100%;
  background: ${({ theme }) => theme.PALETTE.white};
`;
