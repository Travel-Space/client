import { styled, css } from "styled-components";

export const Container = styled.div`
  border-radius: 10px;
`;
export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-weight: 700;
  margin-bottom: 24px;
`;
export const Main = styled.div`
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  border-radius: 10px;
  & > div:first-child > div {
    border-top-left-radius: 10px;
  }
  & > div:first-child > div:nth-child(2) {
    position: relative;
  }
  & > div:last-child > div {
    border-bottom-left-radius: 10px;
  }
`;
export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  line-height: 17px;
  width: 244px;
  height: 33px;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 500;
  outline: none;
  &:focus {
    border-color: ${({ theme }) => theme.PALETTE.primary[200]};
    box-shadow: 0 0 0 3px #bdddfd;
  }
  &:read-only {
    box-shadow: none;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
    color: ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;

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

export const ButtonWrap = styled.div`
  & > button {
    width: 139px;
    height: 51px;
  }
  margin-top: 16px;
  margin-bottom: 32px;

  display: flex;
  justify-content: flex-end;
`;
export const Leave = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 8px;
  background-color: ${({ theme }) => theme.PALETTE.white};

  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 400;
    color: ${({ theme }) => theme.PALETTE.gray[200]};

    line-height: 17px;
  }
  & > a {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: ${({ theme }) => theme.PALETTE.black};
    font-weight: 400;
    line-height: 17px;
    text-decoration: underline;

    background-color: ${({ theme }) => theme.PALETTE.white};
  }
`;
export const Footer = styled.div`
  margin-top: 16px;
  display: flex;
  justify-content: space-between;
`;
export const Save = styled.div`
  & > button {
    padding: 16px 24px;
  }
`;

export const Nationality = styled.div`
  position: relative;
  & > img {
    width: 30px;
    height: 20px;
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translate(-50%, -50%);
  }
`;
