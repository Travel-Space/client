import { useRecoilState } from "recoil";

import axiosRequest from "@/api";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { ResData } from "@/@types";
import MESSAGE from "@/constants/message";

import * as S from "./index.styled";

import { Default } from "@/@types/Modal";
import BoxModal from "@/components/common/BoxModal";
import Button from "@/components/common/Button";

interface ModalProps {
  onClose?: Default;
  planetId: string;
}

export default function JoinPlanetModal({ onClose, planetId }: ModalProps) {
  const [auth, setAuth] = useRecoilState(userAtom);

  const handleJoinPlanet = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<{}>>("post", `/planet/join/${planetId}`);

      if (response.status === 201) {
        alert(MESSAGE.PLANET.JOIN);
        // 리코일 유저 플레닛 상태 추가 탑승 신청 완료시 게스트 및 아이디 추가
        const planetJoin = {
          ...auth,
          memberships: {
            planets: [...(auth?.memberships.planets || []), { planetId: Number(planetId), role: "GUEST" }],
            spaceships: auth?.memberships.spaceships,
          },
        } as UserType;

        setAuth(planetJoin);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <BoxModal onClose={() => onClose} title="행성 탑승하기">
        <S.Container>
          <span>행성에 탑승하시겠습니까?</span>

          <S.ButtonBox>
            <Button onClick={handleJoinPlanet} variant="confirm" shape="medium" size="normal" fontWeight="bold">
              확인
            </Button>
            <Button variant="reverse" shape="medium" size="normal" fontWeight="bold" onClick={() => onClose}>
              취소
            </Button>
          </S.ButtonBox>
        </S.Container>
      </BoxModal>
    </>
  );
}
