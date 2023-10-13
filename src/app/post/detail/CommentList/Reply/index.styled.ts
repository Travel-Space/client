import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: #fcfcfc;
  border-radius: 10px;
  padding: 30px;
`;

export const CommentInput = styled.input`
  width: 100%;
  height: 180px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  margin: 40px 0 24px 0;
`;

export const CommentCount = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.lg};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const BtnDisplay = styled.div`
  display: flex;
  justify-content: right;
  gap: 16px;
`;

export const CommentButton = styled.button`
  width: 140px;
  height: 48px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const CancleButton = styled.button`
  width: 140px;
  height: 48px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;
