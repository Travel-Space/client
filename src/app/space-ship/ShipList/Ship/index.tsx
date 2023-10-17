import { useState } from "react";
import * as S from "./index.styled";
import ManageShip from "../../Modal/ManageShip";
import InfoShip from "../../Modal/InfoShip";

export default function Ship({ test }: { test: number }) {
  const [newShipModal, setNewShipModal] = useState<boolean>(false);
  const [infoShipModal, setInfoShipModal] = useState<boolean>(false);
  return (
    <S.Wrap>
      <S.Container>
        {/* <S.ShipImg onClick={() => setNewShipModal(true)}>
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.ShipImg> */}
        <S.ShipImg onClick={() => setInfoShipModal(true)}>
          <img src="/assets/img/icons/ship-profile-create.svg" alt="" />
        </S.ShipImg>
        <S.ShipTitle>우주선 이름 {test}</S.ShipTitle>
        <S.ShipMemberCount>1 / 10</S.ShipMemberCount>
      </S.Container>
      {newShipModal ? <ManageShip onClose={() => setNewShipModal(false)} /> : null}
      {infoShipModal ? <InfoShip onClose={() => setInfoShipModal(false)} /> : null}
    </S.Wrap>
  );
}
