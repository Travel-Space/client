import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import { Default } from "@/@types/Modal";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import SelectBtn, { ListType } from "@/components/common/SelectBtn";
import { useContext, useEffect, useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Spaceship, SpaceshipStatusName } from "@/@types/Spaceship";
import { AxiosError } from "axios";
import CalendarBtn from "@/components/common/CalendarBtn";
import getDateFormat from "@/utils/getDateFormat";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { useRecoilState } from "recoil";
import { SpaceShipType, SpaceshipContext, SpaceshipContextType } from "../..";

const today = new Date();
const todayString = getDateFormat(today);

interface ShipType {
  name: string;
  description: string;
  maxMembers?: number;
  startDate: string;
  endDate: string;
  planetId: number;
  status: string;
  image: string;
}

const shipStatus: ListType[] = [
  { value: "UPCOMING", text: SpaceshipStatusName.UPCOMING },
  { value: "ONGOING", text: SpaceshipStatusName.ONGOING },
  { value: "COMPLETED", text: SpaceshipStatusName.COMPLETED },
  { value: "CANCELED", text: SpaceshipStatusName.CANCELED },
];

interface ShipManageType extends Default {
  ship: number | SpaceShipType;
}

export default function ShipManage({ onClose, ship }: ShipManageType) {
  const isNewShip = typeof ship === "number";
  const isSpaceShip = !isNewShip;
  const [auth, setAuth] = useRecoilState(userAtom);

  const { planetData, planetId, fetchSpaceshipData } = useContext<SpaceshipContextType>(SpaceshipContext);
  const [shipInfo, setShipInfo] = useState<ShipType>({
    name: "",
    description: "",
    maxMembers: planetData.memberLimit,
    startDate: todayString,
    endDate: todayString,
    planetId: parseInt(planetId),
    status: "UPCOMING",
    image: "",
  });

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShipInfo(info => ({
      ...info,
      name: e.target.value,
    }));
  };

  const handleMaxMembers = (value: number | undefined) => {
    setShipInfo(info => ({
      ...info,
      maxMembers: value,
    }));
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setShipInfo(info => ({
      ...info,
      description: e.target.value,
    }));
  };

  const handleStatus = (status: ListType) => {
    setShipInfo(info => ({
      ...info,
      status: status.value,
    }));
  };

  const submitCreateSpaceship = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("post", "/spaceship", shipInfo);
      console.log(response);
      if (response.status === 201) {
        alert("새로운 우주선이 생성되었습니다!");
        const updatedUser = {
          ...auth,
          memberships: {
            planets: auth?.memberships.planets || [],
            spaceships: [...(auth?.memberships.spaceships || []), { spaceshipId: response.data.id, role: "OWNER" }],
          },
        } as UserType;
        setAuth(updatedUser);
        onClose();
        fetchSpaceshipData();
      }
    } catch (error) {
      console.error("새 우주선 생성하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  };

  const submitModifySpaceship = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>(
        "put",
        `/spaceship/${isSpaceShip && ship.id}`,
        { ...shipInfo, spaceshipStatus: shipInfo.status },
      );
      console.log(response);
      if (response.status === 200) {
        alert("우주선 정보가 업데이트 되었습니다!");
        onClose();
        fetchSpaceshipData();
      }
    } catch (error) {
      console.error("우주선 수정하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  };

  useEffect(() => {
    if (isSpaceShip) {
      setShipInfo({
        ...ship,
        startDate: `${getDateFormat(new Date(ship.startDate))}`,
        endDate: `${getDateFormat(new Date(ship.endDate))}`,
      });
    }
  }, []);

  return (
    <BoxModal onClose={onClose} title="새 우주선 만들기">
      <S.Content>
        <S.Group>
          <Label id="spaceship-name">우주선 이름</Label>
          <Input
            id="spaceship-name"
            type="text"
            name="spaceship-name"
            placeholder="우주선 이름"
            onChange={handleName}
            value={shipInfo.name}
          />
        </S.Group>
        <S.Group>
          <Label id="spaceship-description">우주선 설명</Label>
          <Textarea
            disabled={false}
            size="spaceShip"
            placeholder="우주선 설명"
            name="spaceship-description"
            maxLength={100}
            onChange={handleDescription}
            value={shipInfo.description}
          />
        </S.Group>
        <S.Center>
          <S.Group>
            <Label id="spaceship-member-limit">탑승 인원수</Label>
            <AdjustBtnInput
              name="spaceship-member-limit"
              id="spaceship-member-limit"
              value={shipInfo.maxMembers}
              min={1}
              max={planetData.memberLimit}
              onNumber={handleMaxMembers}
            />
          </S.Group>
          <S.Group>
            <Label id="">여행 상태</Label>
            <SelectBtn
              onSelected={handleStatus}
              selected={{
                value: shipInfo.status,
                text: shipStatus.find(status => status.value === shipInfo.status)?.text || "",
              }}
              selectList={shipStatus}
            />
          </S.Group>
        </S.Center>
        <S.Center>
          <S.BtnInput>
            <Label id="">여행 시작일</Label>
            <CalendarBtn
              onSelected={date => setShipInfo(info => ({ ...info, startDate: date }))}
              selected={shipInfo.startDate}
            />
          </S.BtnInput>
          <S.BtnInput>
            <Label id="">여행 종료일</Label>
            <CalendarBtn
              onSelected={date => setShipInfo(info => ({ ...info, endDate: date }))}
              selected={shipInfo.endDate}
            />
          </S.BtnInput>
        </S.Center>
        <Line color="gray" size="horizontal" />
        <S.Center>
          <Button variant="reverse" shape="medium" size="big" onClick={onClose}>
            취소
          </Button>
          <Button
            variant="confirm"
            shape="medium"
            size="big"
            onClick={isSpaceShip ? submitModifySpaceship : submitCreateSpaceship}
          >
            {isSpaceShip ? "수정" : "완료"}
          </Button>
        </S.Center>
      </S.Content>
    </BoxModal>
  );
}
