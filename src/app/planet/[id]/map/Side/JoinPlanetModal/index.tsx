import { useState } from "react";

import axiosRequest from "@/api";

import * as S from "./index.styled";

import { Default } from "@/@types/Modal";
import BoxModal from "@/components/common/BoxModal";
import Button from "@/components/common/Button";

interface ModalProps {
  onClose?: Default;
  planetId: string;
}

export default function JoinPlanetModal({ onClose, planetId }: ModalProps) {
  const [planet, setPlanet] = useState();

  const handleJoinPlanet = async () => {
    try {
      const response = await axiosRequest.requestAxios("post", `/planet/join/${planetId}`);
      alert("행성 탑승 신청이 완료되었습니다.");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <BoxModal onClose={onClose} title="행성 탑승하기">
      <S.Container>
        <span>행성에 탑승하시겠습니까?</span>

        <S.ButtonBox>
          <Button onClick={handleJoinPlanet} variant="confirm" shape="medium" size="normal" fontWeight="bold">
            확인
          </Button>
          <Button variant="reverse" shape="medium" size="normal" fontWeight="bold" onClick={onClose}>
            취소
          </Button>
        </S.ButtonBox>
      </S.Container>
    </BoxModal>
  );
}
