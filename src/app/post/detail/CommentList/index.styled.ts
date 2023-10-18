import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  ${flexColumn}
  width: 100%;
  height: 100%;
  gap: 24px;
`;

export const InputBox = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  height: 180px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;

export const CommentInput = styled.textarea`
  width: 100%;
  height: 100%;
  padding: 15px;
  border-radius: 10px;
  border: none;
  outline: none;
  vertical-align: top;
  line-height: 1.3;
  white-space: pre-wrap;
  overflow-wrap: break-word;
  resize: none;

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;

export const CommentCount = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-weight: 700;
`;

export const BtnDisplay = styled.div`
  display: flex;
  justify-content: right;
`;

export const CommentButton = styled.button`
  width: 140px;
  height: 48px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const ProfileAndDate = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const UserComment = styled.div`
  width: 100%;
`;
export const CommentDate = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  font-weight: 400;
`;
