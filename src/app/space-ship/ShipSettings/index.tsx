import { useState } from "react";
import * as S from "./index.styled";
import ExitPlanetModal from "../Modal/ExitPlanet";
import MemberManageModal from "../Modal/ManageMember";

export default function ShipsSettings() {
  const [showExitPlanetModal, setShowExitPlanetModal] = useState<boolean>(false);
  const [showMemberManageModal, setShowMemberManageModal] = useState<boolean>(false);
  return (
    <S.Wrap>
      {/* <S.LinkButton onClick={() => setShowMemberManageModal(true)}>
        <img src="/assets/img/icons/users.svg" />
        행성 멤버 관리
      </S.LinkButton> */}
      <S.ExitButton onClick={() => setShowExitPlanetModal(true)}>행성 탈출 💥</S.ExitButton>

      {showExitPlanetModal ? (
        <ExitPlanetModal onClose={() => setShowExitPlanetModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null}
      {showMemberManageModal ? <MemberManageModal onClose={() => setShowMemberManageModal(false)} /> : null}
    </S.Wrap>
  );
}
