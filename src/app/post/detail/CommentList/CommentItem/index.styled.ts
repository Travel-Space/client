import { flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const ProfileAndDate = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const UserComment = styled.div`
  width: 100%;
`;
export const CommentDate = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
`;

export const CommentContent = styled.div`
  width: 100%;
  height: 100%;
  margin: 24px 0 32px 0;
  line-height: 1.3;
`;

export const CommentActionBtn = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const ReplyBtn = styled.div`
  display: flex;
  gap: 8px;
`;

export const PlusBtn = styled.div`
  ${flexSpaceBetweenCenter}
  gap:8px;
  cursor: pointer;
`;

export const MinusBtn = styled.div`
  ${flexSpaceBetweenCenter}
  gap:8px;
  cursor: pointer;
`;

export const CommentEdit = styled.div`
  ${flexSpaceBetweenCenter}
  gap:16px;
`;

export const DeclarationBtn = styled.div`
  color: ${({ theme }) => theme.PALETTE.error};
  cursor: pointer;
`;

export const EditBtn = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  cursor: pointer;
`;

export const DeleteBtn = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[200]};
  cursor: pointer;
`;
