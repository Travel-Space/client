import * as S from "./index.styled";
import { useModal } from "@/hooks/useModal";
import ShipManage from "../Modal/ShipManage";
import { SpaceShipType } from "../page";
import ShipInfo from "../Modal/ShipInfo";

interface ShipType {
  planetId: number;
  planetMaxMember?: number;
  spaceShip?: number | SpaceShipType;
}

export default function Ship({ planetId, planetMaxMember, spaceShip }: ShipType) {
  const { openModal, closeModal } = useModal();

  const shipManageModal = {
    title: "우주선 관리",
    content: (
      <ShipManage onClose={closeModal} planetId={planetId} planetMaxMember={planetMaxMember} spaceShip={spaceShip} />
    ),
  };

  const shipInfoModal = {
    title: "우주선 정보",
    content: <ShipInfo onClose={closeModal} spaceShip={typeof spaceShip === "object" ? spaceShip : undefined} />,
  };

  return (
    <S.Wrap>
      <S.Container>
        {/* <S.Img onClick={() => openModal(shipManageModal)}> */}
        <S.Img onClick={() => (typeof spaceShip === "number" ? openModal(shipManageModal) : openModal(shipInfoModal))}>
          <img
            // src={typeof spaceShip === "number" ? "/assets/img/icons/ship-profile-create.svg" : spaceShip?.image}
            src={
              typeof spaceShip === "number"
                ? "/assets/img/icons/ship-profile-create.svg"
                : "/assets/img/icons/ship-profile-default.svg"
            }
            alt=""
          />
        </S.Img>
        <S.Title>{typeof spaceShip === "number" ? `우주선 ${spaceShip}` : spaceShip?.name}</S.Title>
        <S.MemberCount>{typeof spaceShip === "number" ? "" : `0 / ${spaceShip?.maxMembers}`}</S.MemberCount>
      </S.Container>
    </S.Wrap>
  );
}
