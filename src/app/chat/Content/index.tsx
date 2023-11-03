import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

import Modal from "./Modal";
import Message from "./Message";
import { Chat } from "@/@types/Chat";
import { userAtom } from "@/recoil/atoms/user.atom";
import useSocket from "@/hooks/useSocket";

import * as S from "./index.styled";
import Line from "@/components/common/Line";
import Input from "@/components/common/Input";
import Button from "@/components/common/Button";

interface Message {
  chat: Chat;
}

export default function Content() {
  const { id } = useRecoilValue(userAtom);

  const [showModal, setShowModal] = useState(false);

  const [sendMessage, setSendMessage] = useState();
  const [chat, setChat] = useState();
  const [connected, setConnected] = useState(false);

  const socket = useSocket();

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to the chat server", socket.id);
      setConnected(true);

      socket.emit("joinRoom", "room123");
    });

    console.log(socket);
  }, [socket]);

  const handleShowModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <S.ContentBox>
      <S.Wrapper>
        <S.Top>
          <div />
          <S.Title>
            제목이 들어간다 제목이 들어간다 <strong>6/100</strong>
          </S.Title>
          <S.ModalBox>
            <S.PplImage onClick={handleShowModal} src="/assets/img/icons/person.svg" />
            {showModal && <Modal />}
          </S.ModalBox>
        </S.Top>

        <Line size="horizontal" color="gray" />
      </S.Wrapper>

      <Message />

      <S.Wrapper>
        <Line size="horizontal" color="gray" />

        <S.Bottom>
          <S.GalleryImage src="/assets/img/icons/gallery.svg" />
          <Input rounded thin />
          <Button variant="confirm" shape="extraLarge" size="smallWithXsFont" fontWeight="bold">
            보내기
          </Button>
        </S.Bottom>
      </S.Wrapper>
    </S.ContentBox>
  );
}
