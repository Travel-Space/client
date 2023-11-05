import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import { Default } from "@/@types/Modal";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import SelectBtn, { ListType } from "@/components/common/SelectBtn";
import { useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Spaceship, SpaceshipStatusName } from "@/@types/Spaceship";
import { AxiosError } from "axios";
import CalendarBtn from "@/components/common/CalendarBtn";
import getDateFormat from "@/utils/getDateFormat";

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
  planetId: number;
  planetMaxMember?: number;
}

export default function ShipManage({ onClose, planetId, planetMaxMember }: ShipManageType) {
  const [shipInfo, setShipInfo] = useState<ShipType>({
    name: "",
    description: "",
    maxMembers: planetMaxMember,
    startDate: todayString,
    endDate: todayString,
    planetId: planetId,
    status: "UPCOMING",
    image: "",
  });

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setShipInfo(info => ({
      ...info,
      name: e.target.value,
    }));
  }

  function handleMaxMembers(value: number | undefined) {
    setShipInfo(info => ({
      ...info,
      maxMembers: value,
    }));
  }

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setShipInfo(info => ({
      ...info,
      description: e.target.value,
    }));
  }

  function handleStatus(status: ListType) {
    setShipInfo(info => ({
      ...info,
      status: status.value,
    }));
  }

  async function submitCreateSpaceship() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("post", "/spaceship", shipInfo);
      console.log(response);
      response.status === 201 && alert("새로운 우주선이 생성되었습니다!");
      onClose();
    } catch (error) {
      console.error("새 우주선 생성하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

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
              max={!planetMaxMember ? 0 : planetMaxMember}
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
            onClick={submitCreateSpaceship}
            // onClick={planetInfo.id ? submitModifyPlanet : submitCreatePlanet}
          >
            {/* {planetInfo.id ? "수정" : "완료"} */}
            완료
          </Button>
        </S.Center>
      </S.Content>
    </BoxModal>
  );
}
