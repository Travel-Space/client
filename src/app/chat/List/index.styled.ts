import { flexAlignCenter, flexCenter, flexColumn, flexSpaceBetweenCenter } from "@/styles/common";
import styled from "styled-components";

export const ListBox = styled.div`
  ${flexCenter}
  padding: 24px 32px;
  gap: 16px;
`;

export const ChatRoomImg = styled.div``;

export const Image = styled.img`
  width: 50px;
  height: 50px;
`;

export const ChatRoom = styled.div`
  ${flexColumn}
  gap: 8px;
`;

export const ChatRoomTitle = styled.div`
  display: flex;
  gap: 8px;

  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-family: ${({ theme }) => theme.FONT_WEIGHT.bold};
`;

export const ChatPreview = styled(ChatRoomTitle)`
  font-family: ${({ theme }) => theme.FONT_WEIGHT.regular};

  & span {
    white-space: nowrap; /* 텍스트를 한 줄에 표시 */
    overflow: hidden; /* 넘칠 경우 숨김 처리 */
    text-overflow: ellipsis; /* 넘칠 경우 "..."으로 표시 */
    width: 240px; /* 표시할 너비 설정 */
  }
`;

export const Line = styled.div`
  height: 1px;
  border: 1px solid #d9d9d9;
  width: 100%;
`;
