import { flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const Wrapper = styled.div`
  padding: 40px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;

export const ProfileAndDate = styled.div`
  ${flexSpaceBetweenCenter}
`;

export const StyledLink = styled.a`
  & a {
    text-decoration: none;
    color: black;

    &:hover,
    &:active,
    &:focus {
      text-decoration: none;
    }
  }
`;

export const UserComment = styled.div`
  width: 100%;
`;

export const CommentDate = styled.div`
  color: ${({ theme }) => theme.PALETTE.gray[100]};
  font-weight: 400;
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

export const ReplyWrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: #fcfcfc;
  border-radius: 10px;
  padding: 0 30px 30px 30px;
`;

export const ReplyDisPlay = styled.div``;

//수정 css
export const EditWrapper = styled.div`
  ${flexColumn}
  padding: 40px 0;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  gap: 24px;
`;

export const EditInput = styled.textarea`
  width: 100%;
  margin: 24px 0;
  padding: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 4px;
  resize: none;
`;

export const ActionButtons = styled.div`
  ${flexSpaceBetweenCenter}
  gap: 8px;
  display: flex;
  justify-content: right;
  width: 100%;
  height: 100%;
  gap: 16px;
  left: 0;
  & button {
    width: 140px;
  }
`;

export const MoreBtn = styled.div`
  display: flex;
  justify-content: space-around;
  width: 1100px;
  margin-top: 30px;

  & button {
    width: 200px;
  }
`;
