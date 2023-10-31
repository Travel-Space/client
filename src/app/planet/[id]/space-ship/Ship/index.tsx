import { useState } from "react";
import * as S from "./index.styled";
import Manage from "../Modal/ShipManage";
import Info from "../Modal/ShipInfo";
import { useModal } from "@/hooks/useModal";
import ShipManage from "../Modal/ShipManage";

export default function Ship({ test }: { test: number }) {
  const { openModal, closeModal } = useModal();

  const shipManageModal = {
    title: "우주선 관리",
    content: <ShipManage onClose={closeModal} />,
  };

  return (
    <S.Wrap>
      <S.Container>
        <S.Img onClick={() => openModal(shipManageModal)}>
          {/* <S.Img onClick={() => setShowInfoModal(true)}> */}
          {/* <img src="/assets/img/icons/ship-profile-create.svg" alt="" /> */}
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.Img>
        <S.Title>우주선 {test}</S.Title>
        <S.MemberCount>1 / 10</S.MemberCount>
      </S.Container>
    </S.Wrap>
  );
}
