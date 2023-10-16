import styled from "styled-components";
import { flexSpaceBetweenCenter } from "@/styles/common";

export const TitleContainer = styled.div`
  padding: 32px;
  ${flexSpaceBetweenCenter}
  border-bottom: 1px solid ${({ theme }) => theme.PALETTE.gray[100]};

  p {
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-weight: 900;
  }
`;

export const CloseButton = styled.button`
  background: none;
  width: 10px;
  height: 16px;
  font-size: 0;
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  background-image: url("/assets/img/icons/arrow-back.svg");
  cursor: pointer;
`;

export const NotificationListContainer = styled.ul``;
