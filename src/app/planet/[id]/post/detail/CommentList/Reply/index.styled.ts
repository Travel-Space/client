import styled from "styled-components";

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background-color: #fcfcfc;
  border-radius: 10px;
  padding: 0 30px 30px 30px;
`;

export const InputBox = styled.div`
  margin: 40px 0 24px 0;
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
  gap: 16px;
`;

export const CommentButton = styled.button`
  width: 140px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  border-radius: 10px;
`;

export const CancleButton = styled.button`
  width: 140px;
  height: 100%;
  background-color: ${({ theme }) => theme.PALETTE.white};
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
`;
