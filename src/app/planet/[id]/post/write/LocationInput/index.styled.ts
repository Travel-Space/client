import styled from "styled-components";

export const InputContainer = styled.div`
  position: relative;
  width: 600px;
`;

export const Input = styled.input`
  width: 100%;
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
  padding-right: 80px;  // 버튼 크기 만큼 오른쪽 패딩 추가

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

export const SearchButton = styled.button`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background-color: ${({ theme }) => theme.PALETTE.white};
  color: ${({ theme }) => theme.PALETTE.primary[200]};
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
`;