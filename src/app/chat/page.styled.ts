import styled from "styled-components";
import { bodyContainer, flexAlignCenter, flexColumn, flexCenter, flexSpaceBetweenCenter } from "@/styles/common";

export const Container = styled.div`
  ${bodyContainer}
  ${flexAlignCenter}
  height: calc(100vh - 90px);
  gap: 16px;
  padding: 20px 0 64px 0;
`;

export const ChatBox = styled.div`
  height: 100%;
  border-radius: 10px;
  border: 1px solid #d9d9d9;
  background-color: ${({ theme }) => theme.PALETTE.white};
  width: 370px;
  padding-bottom: 30px;
`;

export const ListTitle = styled.div`
  padding: 24px 0;
  text-align: center;

  & span {
    font-size: ${({ theme }) => theme.FONT_SIZE.em};
    font-weight: 700;
  }
`;

export const ListBox = styled.div`
  height: calc(100% - 75px);
  overflow: scroll; /* 세로 스크롤을 활성화 */
`;

// 채팅방 리스트
export const ChatList = styled.div`
  padding: 24px 32px;
  ${flexCenter}
  gap: 16px;
  border-bottom: 1px solid #d9d9d9;

  > div {
    cursor: pointer;
  }

  &:last-child {
    border: none;
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
  font-weight: 700;
`;

export const ChatPreview = styled(ChatRoomTitle)`
  font-weight: 400;

  > span {
    width: 240px; /* 표시할 너비 설정 */
    overflow: hidden; /* 넘칠 경우 숨김 처리 */
    white-space: nowrap; /* 텍스트를 한 줄에 표시 */
    text-overflow: ellipsis; /* 넘칠 경우 "..."으로 표시 */
  }
`;

// content part
export const ContentBox = styled.div`
  width: 100%;
  height: 100%;
  ${flexColumn}
  justify-content: space-between;
`;

export const Wrapper = styled.div``;

export const Top = styled.div`
  padding: 24px 16px;
  ${flexSpaceBetweenCenter}
`;

export const Title = styled.div`
  font-size: ${({ theme }) => theme.FONT_SIZE.em};
  font-weight: 600;
  color: ${({ theme }) => theme.PALETTE.white};

  > strong {
    color: ${({ theme }) => theme.PALETTE.gray[100]};
    font-size: ${({ theme }) => theme.FONT_SIZE.sm};
    font-weight: 500;
  }
`;

export const ModalBox = styled.div`
  position: relative;
`;

export const PplImage = styled.img`
  width: 25px;
  height: 17px;
  cursor: pointer;
`;

export const Bottom = styled(Top)`
  gap: 16px;
  padding: 16px 8px;

  > div > input {
    display: none;
  }
`;

export const GalleryImage = styled(PplImage)`
  width: 40px;
  height: 40px;
`;

// chat Message
export const Body = styled.div`
  overflow: scroll; /* 세로 스크롤을 활성화 */
  padding: 12px 0 12px 0;
  margin: 0 16px;
  margin-top: auto;
`;

export const DateLine = styled.div`
  ${flexCenter}
  gap: 16px;
  margin: 0 0 24px 0;
`;

export const Date = styled.div`
  width: 30%;
  display: flex;
  justify-content: center;
`;

export const MessageBox = styled.div`
  ${flexColumn}
  gap: 16px;
`;

export const Message = styled.div`
  ${flexCenter};
  justify-content: flex-end;
  gap: 8px;
  width: 100%;

  > div:last-child {
    align-self: flex-end;
  }
`;

export const OtherMessage = styled.div`
  ${flexCenter};
  justify-content: flex-start;
  gap: 8px;
  width: 100%;

  > div:first-child {
    align-self: flex-end;
  }
`;

export const PhotoMessage = styled(Message)`
  align-items: flex-end;

  & img {
    cursor: pointer;
  }
`;

export const Image = styled.img`
  width: 56px;
  height: 56px;
  border-radius: 50px;
`;

export const Info = styled.div`
  ${flexColumn}
  gap: 8px;
`;

export const Intro = styled.div`
  color: ${({ theme }) => theme.PALETTE.white};
  display: flex;
  align-items: flex-end;
  gap: 8px;

  > img {
    width: 500px;
  }

  > div {
    font-size: ${({ theme }) => theme.FONT_SIZE.xs};
  }
`;

export const Nickname = styled.div`
  color: ${({ theme }) => theme.PALETTE.white};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  font-weight: 700;
`;

export const TextContent = styled.span`
  color: ${({ theme }) => theme.PALETTE.black};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
  padding: 10px 24px;
  border-radius: 20px;
  border: 1px solid #d9d9d9;
  background: ${({ theme }) => theme.PALETTE.white};
  ${flexAlignCenter}
`;

export const Images = styled.div`
  > img {
    width: 200px;
    height: 200px;
    object-fit: cover;
    border-radius: 10px;
    border: 5px solid #fff;
  }
`;
