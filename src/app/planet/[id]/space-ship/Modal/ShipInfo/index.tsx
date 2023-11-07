import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Line from "@/components/common/Line";
import { Default } from "@/@types/Modal";
import { SpaceShipType, SpaceshipContext, SpaceshipContextType } from "../../page";
import { SpaceshipStatus, SpaceshipStatusName } from "@/@types/Spaceship";
import { getDateInfo } from "@/utils/getDateInfo";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { AxiosError } from "axios";
import { useContext, useEffect, useState } from "react";
import { userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilValue } from "recoil";
import Button from "@/components/common/Button";

interface ShipInfoType extends Default {
  shipId: number;
}

interface SpaceshipInfoType {
  id: number;
  planetId: number;
  name: string;
  description: string;
  maxMembers: number;
  ownerId: number;
  status: SpaceshipStatus;
  startDate: string;
  endDate: string;
  members: {};
}

export default function ShipInfo({ onClose, shipId }: ShipInfoType) {
  const [spaceshipInfo, setSpaceshipInfo] = useState<SpaceshipInfoType>({
    id: 0,
    planetId: 0,
    name: "",
    description: "",
    maxMembers: 0,
    ownerId: 0,
    status: "UPCOMING",
    startDate: "",
    endDate: "",
    members: {},
  });
  const { dateString: startDate } = getDateInfo(new Date(spaceshipInfo?.startDate));
  const { dateString: endDate } = getDateInfo(new Date(spaceshipInfo?.endDate));
  const user = useRecoilValue(userAtom);
  const { planetId } = useContext<SpaceshipContextType>(SpaceshipContext);
  const thisPlanet = user?.memberships.planets.find(planet => planet?.planetId === parseInt(planetId));
  const thisSpaceship = user?.memberships.spaceships.find(spaceship => spaceship?.spaceshipId === spaceshipInfo.id);
  const imSpaceshipOwner = thisSpaceship?.role === "OWNER";
  const imSpaceshipMember = thisSpaceship?.role === "MEMBER";
  const imPlanetOwner = thisPlanet?.role === "OWNER";

  async function fetchSpaceshipData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<SpaceShipType>>("get", `/spaceship/${shipId}`, {});
      console.log(response);
      setSpaceshipInfo(response.data);
    } catch (error) {
      console.error("우주선 조회 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  useEffect(() => {
    fetchSpaceshipData();
  }, []);

  return (
    <BoxModal onClose={onClose} title="우주선 정보">
      <S.Content>
        <S.Title>
          <h2>{spaceshipInfo.name}</h2>
          <span>{SpaceshipStatusName[spaceshipInfo.status]}</span>
        </S.Title>
        <Line color="gray" size="horizontal" />
        <S.Detail>
          <div>
            <img src="/assets/img/icons/alert.svg" height={16} />
            <span>{spaceshipInfo.description}</span>
          </div>
          <div>
            <img src="/assets/img/icons/calendar.svg" height={16} />
            <span>
              {startDate} ~ {endDate}
            </span>
          </div>
        </S.Detail>
        <Line color="gray" size="horizontal" />
        {/* 우주선 주인, 행성 주인만 가능 */}
        {imSpaceshipOwner && imPlanetOwner && <S.DeleteBtn>우주선 삭제 💥</S.DeleteBtn>}
        <S.CenterGroup>
          {(imSpaceshipOwner || imSpaceshipMember) && (
            <Button variant="reverse" shape="medium" size="big" onClick={() => {}}>
              <S.CenterGroup>
                <img src="/assets/img/icons/exit.svg" />
                <span>우주선 탈출</span>
              </S.CenterGroup>
            </Button>
          )}
          {!imSpaceshipMember && (
            <Button variant="confirm" shape="medium" size="big" onClick={() => {}}>
              <S.CenterGroup>
                <img src="/assets/img/icons/space-ship/rocket.svg" />
                <span>우주선 {imSpaceshipOwner ? "관리하기" : "탑승하기"}</span>
              </S.CenterGroup>
            </Button>
          )}
        </S.CenterGroup>
      </S.Content>
    </BoxModal>
  );
}
