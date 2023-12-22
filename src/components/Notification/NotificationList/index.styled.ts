import styled from "styled-components";
import { flexAlignCenter, flexSpaceBetweenCenter } from "@/styles/common";
interface IconProps {
  iconUrl: string;
}

export const Icon = styled.div<IconProps>`
  margin-right: 16px;
  background: none;
  font-size: 0;
  width: 24px;
  height: 24px;
  cursor: pointer;

  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;

  background-image: url("${props => props.iconUrl}");
`;

export const TextBox = styled.div`
  width: 300px;
  p {
    font-weight: 700;
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    margin-bottom: 8px;
    word-break: keep-all;
    line-height: 1.3;
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
  padding: 24px;
  cursor: pointer;
  transition: all ease 0.3s;

  &:hover {
    background: #f8faff;
  }
`;

export const NotificationContent = styled.div`
  ${flexAlignCenter}
`;

export const ButtonBox = styled.div`
  width: fit-content;
  gap: 8px;
  ${flexAlignCenter}
`;
export const AcceptButton = styled.button`
  font-weight: 700;
  background: none;
  font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  color: ${({ theme }) => theme.PALETTE.mainColor};
`;

export const RejectButton = styled(AcceptButton)`
  color: #6d7b92;
`;
