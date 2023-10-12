import { styled } from "styled-components";
import { flexAlignCenter } from "@/styles/common";

export const Container = styled.div`
  border-radius: 10px;
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
export const UserImg = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
`;
export const DeleteImgBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 0;
  top: 0;
`;
export const EditImgBtn = styled.button`
  background-color: transparent;
  position: absolute;
  right: 0;
  bottom: 0;
`;
export const Row = styled.div`
  display: flex;
`;
export const Title = styled.div`
  background-color: #f9f9f9;
  border-right: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};

  width: 211px;
  padding-left: 24px;
  ${flexAlignCenter}
`;
export const Content = styled.div`
  margin: 16px 0;
  padding-left: 24px;
`;
export const Input = styled.input`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  line-height: 17px;
  width: 244px;
  height: 33px;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  color: ${({ theme }) => theme.PALETTE.gray[100]};
`;
export const NicknameInput = styled.input`
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  line-height: 17px;
  width: 244px;
  height: 33px;
  padding: 0 24px;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
`;
export const DoubleCheck = styled.button`
  color: ${({ theme }) => theme.PALETTE.mainColor};
  background-color: ${({ theme }) => theme.PALETTE.white};
  margin-left: 16px;
`;
export const Withdrawal = styled.button`
  display: flex;
  gap: 8px;
  background-color: ${({ theme }) => theme.PALETTE.white};

  & > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
    color: ${({ theme }) => theme.PALETTE.gray[200]};

    line-height: 17px;
  }
  & > button {
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};
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
export const Save = styled.button`
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.medium};
  border-radius: 10px;
`;
