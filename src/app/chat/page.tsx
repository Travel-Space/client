"use client";

import { useRecoilValue } from "recoil";
import { useCallback, useEffect, useRef, useState } from "react";

import { useModal } from "@/hooks/useModal";
import useSocket from "@/hooks/useSocket";
import { userAtom } from "@/recoil/atoms/user.atom";
import { getDateInfo } from "@/utils/getDateInfo";
import { Message } from "@/@types/Chat";
import { Planet } from "@/@types";
import MESSAGE from "@/constants/message";
import useImageUpload from "@/hooks/useImageUpload";

import Modal from "./Content/Modal";

import * as S from "./page.styled";
import Line from "@/components/common/Line";
import DeclarationModal from "@/components/common/DeclarationModal";
import Input from "@/components/common/Input";
import Nothing from "@/components/common/Nothing";

export default function Chat() {
  const user = useRecoilValue(userAtom);

  // ===================================== useModal 사용 =====================================
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation(); // 이벤트 캡쳐링 방지
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
    roomInfo: { name: "" },
    members: [],
    maxMember: 0,
    totalMember: 0,
  });

  // 과거 채팅 내역 및 현재 채팅 내역
  const [chat, setChat] = useState<Message[]>([]);

  // 채팅방 선택 유무
  const [clickedRoom, setClickedRoom] = useState(false);

  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (socket) {
      // 채팅방 리스트
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
  }, [socket, chat]);

  const handleClickChatRoom = useCallback(
    (roomId: number, type: string, planet: Planet, maxMember: number, totalMember: number, members: []) => {
      setClickedRoom(true);
      setClickedRoomInfo({ roomId, roomInfo: planet, members, maxMember, totalMember });
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
      const getMessage = (message: Message) => {
        setChat(prev => [...prev, message]);
      };

      socket.on("newMessage", getMessage);

      return () => {
        socket.off("newMessage", getMessage);
      };
    }
  }, [socket]);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const fileUploadHandler = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const { imageUrl, handleImage } = useImageUpload();
  const [sendImage, setSendImage] = useState<string | null>("");

  useEffect(() => {
    if (imageUrl && imageUrl !== sendImage) {
      const message = {
        chatRoomId: clickedRoomInfo.roomId,
        senderId: user?.id,
        content: imageUrl,
      };

      socket.emit("sendMessage", message);
      setSendImage(imageUrl);
    }
  }, [imageUrl]);

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
        setSendMessage("");
      }
    }
  };

  return (
    <S.Container onClick={() => setShowModal(false)}>
      {chatRoomList.length === 0 ? (
        <Nothing
          src="/assets/img/icons/chat.svg"
          alt="no-chattingRooms"
          width={100}
          height={100}
          comment={MESSAGE.CHAT.NO_CHATROOM}
          suggest={MESSAGE.CHAT.SUG_PLANET_JOIN}
          font="lg"
          color="white"
        />
      ) : (
        <>
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
                        el.planetId ? el.planet : el.spaceship,
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
                        <span>{el.planetId ? `행성 : ${el.planet?.name}` : `우주선 : ${el.spaceship?.name}`}</span>
                        {/* <img src="/assets/img/icons/new-chat.svg" /> */}
                      </S.ChatRoomTitle>

                      <S.ChatPreview>
                        <span>
                          {!el.messages.length
                            ? `${MESSAGE.CHAT.NOT_MESSAGE}`
                            : el.messages[el.messages.length - 1].content}
                        </span>
                      </S.ChatPreview>
                    </S.ChatRoom>
                  </S.ChatList>
                );
              })}
            </S.ListBox>
          </S.ChatBox>

          {/* <Content /> */}
          {!clickedRoom ? (
            <Nothing
              src="/assets/img/icons/chat.svg"
              alt="no-chatting"
              width={70}
              height={70}
              comment={MESSAGE.CHAT.NO_CLICK_CHATROOM}
              suggest={MESSAGE.CHAT.SUG_CHATTING}
              font="lg"
              color="white"
            />
          ) : (
            <S.ContentBox>
              <S.Wrapper>
                <S.Top>
                  <div />
                  <S.Title>
                    {clickedRoomInfo.roomInfo?.name}{" "}
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
                  {chat?.map((el: Message) => {
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
                    <input
                      ref={fileInputRef}
                      accept="image/*"
                      type="file"
                      id="file"
                      name="imageUrl"
                      onChange={e => handleImage(e.target.files)}
                    />
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
          )}
        </>
      )}
    </S.Container>
  );
}

// 내 메시지면 여기로 보내서 보여주고
const MyMessage: React.FC<{
  senderName: string;
  content: string;
  date: Date;
  messageId: number;
  senderImage: string;
}> = ({ content, date, messageId, senderImage }) => {
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
const SomeoneMessage: React.FC<{
  senderName: string;
  content: string;
  date: Date;
  messageId: Number;
  senderImage: string;
}> = ({ senderName, content, date, messageId, senderImage }) => {
  const { dateNoYear, time } = getDateInfo(date);
  const images = content.includes("http");

  const { modalDataState, openModal, closeModal } = useModal();
  const [selectedMessageId, setSelectedMessageId] = useState<Number | null>(null);

  const openModals = (messageId: Number) => {
    setSelectedMessageId(messageId);
    openModal({
      title: "채팅 신고하기",
      content: <DeclarationModal title={"채팅"} targetId={messageId} onClick={closeModal} />,
    });
  };

  return (
    <>
      {modalDataState.isOpen && selectedMessageId === messageId && modalDataState.content}
      <S.OtherMessage onClick={() => openModals(messageId)}>
        <div>
          <S.Image src={senderImage} />
        </div>
        <S.Info>
          <S.Nickname>{senderName}</S.Nickname>
          <S.Intro>
            {images ? <img src={content} /> : <S.TextContent>{content}</S.TextContent>}
            <div>
              {dateNoYear} {time}
            </div>
          </S.Intro>
        </S.Info>
      </S.OtherMessage>
    </>
  );
};
