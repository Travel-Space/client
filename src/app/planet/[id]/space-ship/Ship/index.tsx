import * as S from "./index.styled";
import { useModal } from "@/hooks/useModal";
import ShipManage from "../Modal/ShipManage";
import { SpaceShipType } from "../page";
import ShipInfo from "../Modal/ShipInfo";

interface ShipType {
  ship: number | SpaceShipType;
}

export default function Ship({ ship }: ShipType) {
  const { openModal, closeModal } = useModal();

  const isNewShip = typeof ship === "number";
  const isSpaceShip = !isNewShip;

  const shipManageModal = {
    title: "우주선 관리",
    content: <ShipManage onClose={closeModal} ship={ship} />,
  };

  const shipInfoModal = {
    title: "우주선 정보",
    content: isSpaceShip ? <ShipInfo onClose={closeModal} shipId={ship.id} /> : <></>,
  };

  return (
    <S.Wrap>
      <S.Container $newShip={isNewShip}>
        <S.Img onClick={() => (isNewShip ? openModal(shipManageModal) : openModal(shipInfoModal))}>
          <img
            src={isNewShip ? "/assets/img/icons/ship-profile-create.svg" : "/assets/img/icons/ship-profile-default.svg"}
            alt=""
          />
        </S.Img>
        <S.Title>{isNewShip ? `우주선 ${ship}` : ship.name}</S.Title>
        <S.MemberCount>{isNewShip ? "" : `${ship.memberCount} / ${ship.maxMembers}`}</S.MemberCount>
      </S.Container>
    </S.Wrap>
  );
}
