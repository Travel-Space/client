import { styled } from "styled-components";
import { ModalBackground } from "@/styles/common";

export const ImgInput = styled.input`
  display: none;
`;
export const Buttons = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 32px;
  padding-right: 16px;
  & > button {
    width: 200px;
  }
`;
export const Modal = styled.div`
  width: 800px;
  background-color: white;
  border-radius: 10px;
  z-index: 100;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  & > div:nth-child(2) {
    width: 100%;
  }
`;
export const ModalBg = styled.div`
  ${ModalBackground}
`;
export const Container = styled.div`
  position: relative;
  color: ${({ theme }) => theme.PALETTE.black};
`;
export const Title = styled.div`
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
  padding: 16px 24px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
`;
export const CropperWrap = styled.div`
  padding: 32px 16px;
`;
