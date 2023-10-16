import styled from "styled-components";
import { flexAlignCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Icon = styled.div`
  margin-right: 16px;
  background: none;
  font-size: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-image: url("/assets/img/icons/favorite.svg");
`;

export const TextBox = styled.div`
  p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    margin-bottom: 8px;
  }

  span {
    font-weight: 400;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    color: #6d7b92;
  }
`;

export const RemoveContent = styled.button`
  background: none;
  font-size: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-image: url("/assets/img/icons/delete.svg");
`;

export const NotificationList = styled.li`
  ${flexSpaceBetweenCenter}
  padding: 24px 32px 24px 24px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background: #f8faff;
  }
`;

export const NotificationContent = styled.div`
  ${flexAlignCenter}
`;
