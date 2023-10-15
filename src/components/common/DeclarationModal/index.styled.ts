import styled from "styled-components";
import css from "styled-jsx/css";
import { ModalBackground, flexAlignCenter, flexCenter, flexColumn } from "@/styles/common";

export const Background = styled.div`
  ${ModalBackground}
`;

export const Container = styled.div`
  width: 464px;
  background-color: ${({ theme }) => theme.PALETTE.white};
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  position: fixed;
  border-radius: 15px;
  border: 1px solid #d9d9d9;
  ${flexColumn}
  align-items: center;
  gap: 24px;
`;

export const Top = styled.div`
  ${flexCenter}
  width: 100%;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #d9d9d9;

  > img {
    width: 23px;
  }

  > span {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 700;
  }
`;

export const Middle = styled.div`
  ${flexColumn}
  justify-content: center;
  gap: 24px;
  width: 410px;
`;

export const Description = styled(Middle)`
  gap: 16px;

  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.md};
    font-weight: 700;
  }

  > textarea {
    height: 116px;
    padding: 16px 16px;
    resize: none;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  }
`;

export const Reason = styled(Description)`
  > select {
    height: 40px;
    padding: 0 16px;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

    & option {
      color: ${({ theme }) => theme.PALETTE.gray[100]};
    }
  }
`;

export const Picture = styled(Description)``;

export const File = styled.div`
  ${flexAlignCenter}
  justify-content: space-between;
  gap: 16px;

  > input {
    width: 341px;
    height: 40px;
    padding: 0 16px;
    pointer-events: none;
    border-radius: 10px;
    border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  }

  > input:nth-child(3) {
    display: none;
  }
`;

export const ImgButton = styled.label`
  ${flexAlignCenter}
  height: 40px;
  border-radius: 4px;
  background: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  color: ${({ theme }) => theme.PALETTE.primary[100]};
  font-weight: 500;
  cursor: pointer;
`;

export const Bottom = styled.div`
  ${flexCenter}
  gap: 16px;
  margin: 8px 0 32px 0;
`;

export const CancelBtn = styled.button`
  width: 105px;
  height: 32px;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  background: ${({ theme }) => theme.PALETTE.white};
`;

export const CheckBtn = styled(CancelBtn)`
  background: ${({ theme }) => theme.PALETTE.mainColor};
  color: ${({ theme }) => theme.PALETTE.white};
`;
