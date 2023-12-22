import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${flexColumn}
  width: 100%;
  height: 100%;
  gap: 24px;
`;

export const BtnDisplay = styled.div`
  display: flex;
  justify-content: right;
`;

export const CommentButton = styled.div`
  display: flex;
  justify-content: right;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.PALETTE.white};
  gap: 16px;
  left: 0;

  & button {
    width: 140px;
  }
  & button:first-child:hover {
    background: #d9d9d9;
  }
  & button:last-child:hover {
    background: ${({ theme }) => theme.PALETTE.mainColor};
  }
`;
