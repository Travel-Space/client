import styled from "styled-components";
import { flexCenter, flexColumn } from "@/styles/common";

export const ListBox = styled.div`
  padding: 24px 32px;
  ${flexCenter}
  gap: 16px;

  > div {
    cursor: pointer;
  }
`;

export const ChatRoomImg = styled.div`
  > img {
    width: 50px;
    height: 50px;
  }
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

  > span {
    width: 240px; /* 표시할 너비 설정 */
    overflow: hidden; /* 넘칠 경우 숨김 처리 */
    white-space: nowrap; /* 텍스트를 한 줄에 표시 */
    text-overflow: ellipsis; /* 넘칠 경우 "..."으로 표시 */
  }
`;
