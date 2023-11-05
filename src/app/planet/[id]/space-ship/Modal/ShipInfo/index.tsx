import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Line from "@/components/common/Line";
import { Default } from "@/@types/Modal";
import { SpaceShipType } from "../../page";
import { SpaceshipStatusName } from "@/@types/Spaceship";
import { getDateInfo } from "@/utils/getDateInfo";

interface ShipInfoType extends Default {
  spaceShip?: SpaceShipType;
}

export default function ShipInfo({ onClose, spaceShip }: ShipInfoType) {
  const { startDate, endDate, name, status, description } = spaceShip!;
  const { dateString: start } = getDateInfo(new Date(startDate));
  const { dateString: end } = getDateInfo(new Date(endDate));

  return (
    <BoxModal onClose={onClose} title="우주선 정보">
      <S.Content>
        <S.Title>
          <h2>{name}</h2>
          <span>{SpaceshipStatusName[status]}</span>
        </S.Title>
        <Line color="gray" size="horizontal" />
        <S.Detail>
          <div>
            <img src="/assets/img/icons/alert.svg" height={16} />
            <span>{description}</span>
          </div>
          <div>
            <img src="/assets/img/icons/calendar.svg" height={16} />
            <span>
              {start} ~ {end}
            </span>
          </div>
        </S.Detail>
        <Line color="gray" size="horizontal" />
        <S.DeleteBtn>우주선 삭제 💥</S.DeleteBtn>
        {/* <ButtonGroup>
          <S.OutlineButton>
            <img src="/assets/img/icons/exit.svg" />
            퇴장하기
          </S.OutlineButton>
          <S.FillButton>
            <img src="/assets/img/icons/mini-ship.svg" />
            우주선 관리하기
          </S.FillButton>
        </ButtonGroup> */}
      </S.Content>
    </BoxModal>
  );
}
