import styled, { css } from "styled-components";
import { ModalBackground, flexSpaceBetweenCenter } from "@/styles/common";

export const Background = styled.div`
  ${ModalBackground}
`;

export const Container = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: ${({ theme }) => theme.PALETTE.white};
  z-index: 100;
  border-radius: 10px;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.3);
  width: 560px;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.primary[100]};
  padding: 16px 24px;
  ${flexSpaceBetweenCenter}
`;

export const Title = styled.p`
  color: ${({ theme }) => theme.PALETTE.primary[100]};
  font-weight: 600;
`;

const buttonBgReset = css`
  background: none;
  font-size: 0;
  width: 16px;
  height: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
`;
export const CloseBtn = styled.button`
  ${buttonBgReset}
  background-image: url('/assets/img/icons/close-blue.svg');
`;

export const Body = styled.div`
  padding: 24px;
`;
