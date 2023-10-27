import styled from "styled-components";

export const Input = styled.input`
  width: 600px;
  height: 48px;
  border-radius: 10px;
  border: none;
  padding: 16px;
  background-repeat: no-repeat;
  outline: none;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  box-shadow: 0 0 0 0px #bdddfd;
  transition: all 0.2s;
  font-size: 16px;
  padding-left: 48px;

  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary[200]};
    box-shadow: 0 0 0 3px #bdddfd;
  }

  &::placeholder {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 700;
  }
`;
