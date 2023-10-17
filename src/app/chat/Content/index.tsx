import { useState } from "react";

import Modal from "./Modal";
import Message from "./Message";

import * as S from "./index.styled";
import Line from "@/components/common/Line";

export default function Content() {
  const [showModal, setShowModal] = useState(false);

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
          <S.Input />
          <S.Button>보내기</S.Button>
        </S.Bottom>
      </S.Wrapper>
    </S.ContentBox>
  );
}
