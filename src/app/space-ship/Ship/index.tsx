import { useState } from "react";
import * as S from "./index.styled";
import Manage from "../Modal/Manage";
import Info from "../Modal/Info";

export default function Ship({ test }: { test: number }) {
  const [showManageModal, setShowManageModal] = useState<boolean>(false);
  const [showInfoModal, setShowInfoModal] = useState<boolean>(false);
  return (
    <S.Wrap>
      <S.Container>
        {/* <S.Img onClick={() => setShowManageModal(true)}> */}
        <S.Img onClick={() => setShowInfoModal(true)}>
          {/* <img src="/assets/img/icons/ship-profile-create.svg" alt="" /> */}
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.Img>
        <S.Title>우주선 이름 {test}</S.Title>
        <S.MemberCount>1 / 10</S.MemberCount>
      </S.Container>
      {showManageModal ? <Manage onClose={() => setShowManageModal(false)} /> : null}
      {showInfoModal ? <Info onClose={() => setShowInfoModal(false)} /> : null}
    </S.Wrap>
  );
}
