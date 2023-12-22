import styled from "styled-components";
import { ModalBackground } from "@/styles/common";

export const ModalBackgroundContainer = styled.div`
  ${ModalBackground}
`;

export const AdminModal = styled.div`
  z-index: 1;
  min-width: 281px;
  border-radius: 10px;
  background-color: #fff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const TitleContainer = styled.div`
  position: relative;
  text-align: center;
  padding: 24px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};
  font-weight: 700;
  font-size: ${({ theme }) => theme.FONT_SIZE.md};
`;

export const Content = styled.div`
  padding: 24px 32px;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 25px;
  top: 25px;
  cursor: pointer;
  font-size: 0;
  width: 13px;
  height: 13px;
  background: none;
  background-repeat: no-repeat;
  background-position: center;
  background-size: contain;
  background-image: url("/assets/img/icons/close.svg");
`;
