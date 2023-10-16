import { useState } from "react";
import * as S from "./index.styled";
import ExitPlanetModal from "../ExitPlanetModal";

export default function ShipsSettings() {
  const [showExitPlanetModal, setShowExitPlanetModal] = useState(false);
  return (
    <S.Wrap>
      <S.LinkButton>
        <img src="/assets/img/icons/users.svg" />
        행성 멤버 관리
      </S.LinkButton>
      <S.ExitButton onClick={() => setShowExitPlanetModal(true)}>행성 탈출 💥</S.ExitButton>
      {showExitPlanetModal ? (
        <ExitPlanetModal onClose={() => setShowExitPlanetModal(false)} planetTitle="일본 맛도리 여행" />
      ) : null}
    </S.Wrap>
  );
}
