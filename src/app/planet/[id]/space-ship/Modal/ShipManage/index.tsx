import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import { Default } from "@/@types/Modal";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";
import SelectBtn from "@/components/common/SelectBtn";
import { useState } from "react";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Spaceship } from "@/@types/Spaceship";
import { AxiosError } from "axios";
import CalendarBtn from "@/components/common/CalendarBtn";
import getDateFormat from "@/utils/getDateFormat";

const today = new Date();
const todayString = getDateFormat(today);

export default function ShipManage({ onClose }: Default) {
  const [statusSelect, setStatusSelect] = useState({ value: "UPCOMING", text: "여행 준비" });
  const [startDateSelected, setStartDateSelected] = useState(todayString);
  const [endDateSelected, setEndDateSelected] = useState(todayString);

  async function submitCreateSpaceship() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Spaceship>>("post", "/spaceship", {
        name: "string",
        description: "string",
        maxMembers: 0,
        startDate: new Date("2023-11-02"),
        endDate: new Date("2023-11-02"),
        planetId: 16,
        status: "UPCOMING",
        image: "string",
      });
      console.log(response);
      // response.status === 201 && alert("새로운 우주선이 생성되었습니다!");
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
            // onChange={}
            // value={}
          />
        </S.Group>
        <S.Group>
          <Label id="spaceship-description">우주선 설명</Label>
          <Textarea
            size="spaceShip"
            placeholder="우주선 설명"
            name="spaceship-description"
            maxLength={100}
            onChange={() => {}}
            value={undefined}
          />
        </S.Group>
        <S.Center>
          <S.Group>
            <Label id="spaceship-member-limit">탑승 인원수</Label>
            <AdjustBtnInput
              name="spaceship-member-limit"
              id="spaceship-member-limit"
              value={10}
              min={1}
              max={100}
              onNumber={() => {}}
            />
          </S.Group>
          <S.Group>
            <Label id="">여행 상태</Label>
            <SelectBtn
              onSelected={status => setStatusSelect(status)}
              selected={statusSelect}
              selectList={[
                { value: "UPCOMING", text: "여행 준비" },
                { value: "ONGOING", text: "여행 중" },
                { value: "COMPLETED", text: "여행 완료" },
                { value: "CANCELED", text: "여행 취소" },
              ]}
            />
          </S.Group>
        </S.Center>
        <S.Center>
          <S.BtnInput>
            <Label id="">여행 시작일</Label>
            <CalendarBtn onSelected={date => setStartDateSelected(date)} selected={startDateSelected} />
          </S.BtnInput>
          <S.BtnInput>
            <Label id="">여행 종료일</Label>
            <CalendarBtn onSelected={date => setEndDateSelected(date)} selected={endDateSelected} />
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
