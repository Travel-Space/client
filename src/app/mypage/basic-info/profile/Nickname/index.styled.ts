import { styled } from "styled-components";

export const NicknameInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  line-height: 17px;
  width: 244px;
  height: 33px;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 500;
`;
export const DoubleCheck = styled.button`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  background-color: ${({ theme }) => theme.PALETTE.white};
  margin-left: 16px;

  &:disabled {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;
