"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import { useModal } from "@/hooks/useModal";
import useSocket from "@/hooks/useSocket";
import { userAtom } from "@/recoil/atoms/user.atom";
import { getDateInfo } from "@/utils/getDateInfo";
import { Message } from "@/@types/Chat";
import { Planet } from "@/@types";

import Modal from "./Content/Modal";

import * as S from "./page.styled";
import Line from "@/components/common/Line";
import DeclarationModal from "@/components/common/DeclarationModal";
import Input from "@/components/common/Input";
import axiosRequest from "@/api";

export default function Chat() {
  const user = useRecoilValue(userAtom);

  // ===================================== useModal 사용 =====================================
  const [showModal, setShowModal] = useState(false);

  const modal = {
    title: "모달 제목",
    content: <></>,
    callback: () => {}, // 모달이 닫힐 때 실행할 로직
  };

  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  // ===================================== 1. 채팅방 리스트 불러오기 =====================================

  // 채팅방 목록 불러오기
  // 선택된 채팅방이 없을 때 채팅방을 클릭하라는 부분 띄워주기
  const socket = useSocket("CHAT");

  // 채팅방 목록
  const [chatRoomList, setChatRoomList] = useState([]);
  const [clickedRoomInfo, setClickedRoomInfo] = useState({
    roomId: 0,
    planetInfo: {},
    members: [],
    maxMember: 0,
    totalMember: 0,
  });

  // 과거 채팅 내역 및 현재 채팅 내역
  const [chat, setChat] = useState([]);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (socket) {
      // 채팅방 리스트 얻어
      socket.emit("getUserRooms", user?.id);

      const getRooms = (rooms: []) => {
        setChatRoomList(rooms);
      };

      // 여기서 채팅방 목록을 처리하는 로직을 추가
      socket.on("userRooms", getRooms);

      return () => {
        socket.off("userRooms", getRooms);
      };
    }
  }, [socket]);

  const handleClickChatRoom = useCallback(
    (roomId: number, type: string, planet: Planet, maxMember: number, totalMember: number, members: []) => {
      setClickedRoomInfo({ roomId, planetInfo: planet, members, maxMember, totalMember });
      socket.emit("joinRoom", { roomId: `${roomId}`, type });

      // 'roomHistory' 이벤트, 데이터를 처리
      socket.on("roomHistory", messages => {
        setChat(messages);
      });
    },
    [socket],
  );

  // ===================================== 2. 채팅방 리스트 중 클릭 시 메시지 렌더  =====================================

  const [sendMessage, setSendMessage] = useState("");

  useEffect(() => {
    scrollContainerRef.current?.scrollIntoView({ block: "end" });
  }, [chat]);

  useEffect(() => {
    if (socket) {
      const getMessage = (message: {}) => {
        setChat(prev => [...prev, message]);
      };

      socket.on("newMessage", getMessage);

      return () => {
        socket.off("newMessage", getMessage);
      };
    }
  }, [socket]);

  const fileInputRef = useRef<HTMLImageElement | undefined>(null);

  const fileUploadHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleImage = async (e: any) => {
    try {
      const formData = new FormData();
      formData.append("files", e.target.files[0]);

      const response = await axiosRequest.requestAxios("post", "/upload", formData);

      if (response.data[0]) {
        const message = {
          chatRoomId: clickedRoomInfo.roomId,
          senderId: user?.id,
          content: response.data[0],
        };

        socket.emit("sendMessage", message);
      }
    } catch (error) {
      alert("이미지 업로드 안 됨");
      console.error(error);
    }
  };

  const submitSendMessage = async (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.nativeEvent.isComposing) return;

    if (e.key === "Enter") {
      e.preventDefault();

      if (sendMessage) {
        const message = {
          chatRoomId: clickedRoomInfo.roomId,
          senderId: user?.id,
          content: sendMessage,
        };

        socket.emit("sendMessage", message);
        setSendMessage(""); // Clear the input after sending the message
      }
    }
  };

  return (
    <S.Container>
      <S.ChatBox>
        <S.ListTitle>
          <span>채팅 그룹 목록</span>
        </S.ListTitle>

        <Line size="horizontal" color="gray" />

        <S.ListBox>
          {chatRoomList.map((el: any) => {
            return (
              <S.ChatList
                onClick={() =>
                  handleClickChatRoom(
                    el.id,
                    el.planetId ? "planet" : "spaceship",
                    el.planet,
                    el.totalMembers,
                    el.maxMembers,
                    el.members,
                  )
                }
              >
                <S.ChatRoomImg>
                  <img src="/assets/img/icons/profile.svg" />
                </S.ChatRoomImg>

                <S.ChatRoom>
                  <S.ChatRoomTitle>
                    <span>{el.planetId ? `행성 : ${el.planet.name}` : `우주선 : ${el.spaceshipId}`}</span>
                    {/* <img src="/assets/img/icons/new-chat.svg" /> */}
                  </S.ChatRoomTitle>

                  <S.ChatPreview>
                    <span>
                      {!el.messages.length ? "현재 메시지가 없습니다." : el.messages[el.messages.length - 1].content}
                    </span>
                  </S.ChatPreview>
                </S.ChatRoom>
              </S.ChatList>
            );
          })}
        </S.ListBox>
      </S.ChatBox>

      {/* <Content /> */}
      <S.ContentBox>
        <S.Wrapper>
          <S.Top>
            <div />
            <S.Title>
              {clickedRoomInfo.planetInfo.name}{" "}
              <strong>{clickedRoomInfo.maxMember + `/` + clickedRoomInfo.totalMember}</strong>
            </S.Title>
            <S.ModalBox>
              <S.PplImage onClick={handleShowModal} src="/assets/img/icons/person.svg" />
              {showModal && <Modal members={clickedRoomInfo.members} />}
            </S.ModalBox>
          </S.Top>
          <Line size="horizontal" color="gray" />
        </S.Wrapper>

        <S.Body>
          <S.MessageBox ref={scrollContainerRef}>
            {chat.map((el: Message) => {
              const data = el.senderId === user?.id;

              return data ? (
                <MyMessage
                  senderName={el.sender?.nickName}
                  senderImage={el.sender?.profileImage}
                  content={el.content}
                  date={el.createdAt}
                  messageId={el.id}
                />
              ) : (
                <SomeoneMessage
                  senderName={el.sender?.nickName}
                  senderImage={el.sender?.profileImage}
                  content={el.content}
                  date={el.createdAt}
                  messageId={el.id}
                />
              );
            })}
          </S.MessageBox>
        </S.Body>

        <S.Wrapper>
          {/* 보내는 버튼 */}
          <Line size="horizontal" color="gray" />
          <S.Bottom>
            <div>
              <S.GalleryImage src="/assets/img/icons/gallery.svg" onClick={fileUploadHandler} />
              <input ref={fileInputRef} accept="image/*" type="file" id="file" name="imageUrl" onChange={handleImage} />
            </div>

            <Input
              value={sendMessage}
              onKeyDown={submitSendMessage}
              onChange={e => setSendMessage(e.target.value)}
              rounded
              thin
            />
          </S.Bottom>
        </S.Wrapper>
      </S.ContentBox>
    </S.Container>
  );
}

// 내 메시지면 여기로 보내서 보여주고
export const MyMessage: React.FC<{
  senderName: string;
  content: string;
  date: Date;
  messageId: number;
  senderImage: string;
}> = ({ senderName, content, date, messageId, senderImage }) => {
  const { dateNoYear, time } = getDateInfo(date);
  const images = content.includes("http");

  return (
    <S.Message key={messageId}>
      <S.Intro>
        <div>
          {dateNoYear} {time}
        </div>
        {images ? <img src={content} /> : <S.TextContent>{content}</S.TextContent>}
      </S.Intro>
      <div>
        <S.Image src={senderImage} />
      </div>
    </S.Message>
  );
};

// 남 메시지면 여기로 보내서 보여줌
export const SomeoneMessage: React.FC<{
  senderName: string;
  content: string;
  date: Date;
  messageId: Number;
  senderImage: string;
}> = ({ senderName, content, date, messageId, senderImage }) => {
  const { dateNoYear, time } = getDateInfo(date);
  const images = content.includes("http");

  const { modalDataState, openModal, closeModal } = useModal();

  const openModals = (messageId: Number) => {
    openModal({
      title: "채팅 신고하기",
      content: <DeclarationModal title={"채팅"} targetId={messageId} onClick={closeModal} />,
    });
  };

  return (
    <>
      {modalDataState.isOpen && modalDataState.content}
      <S.OtherMessage key={messageId}>
        <div>
          <S.Image src={senderImage} />
        </div>
        <S.Info>
          <S.Nickname>{senderName}</S.Nickname>
          <S.Intro>
            {images ? (
              <img src={content} />
            ) : (
              <S.TextContent onClick={() => openModals(messageId)}>{content}</S.TextContent>
            )}
            <div>
              {dateNoYear} {time}
            </div>
          </S.Intro>
        </S.Info>
      </S.OtherMessage>
    </>
  );
};
