import BoxModal from "@/components/common/BoxModal";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Line from "@/components/common/Line";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import { Default } from "@/@types/Modal";
import Textarea from "@/components/common/Textarea";
import Button from "@/components/common/Button";

export default function ShipManage({ onClose }: Default) {
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
          </S.Group>
        </S.Center>
        <S.Center>
          <S.BtnInput>
            <Label id="">여행 시작일</Label>
            {/* <S.BtnIcon>
              <img src="/assets/img/icons/calendar.svg" height={12} />
            </S.BtnIcon> */}
          </S.BtnInput>
          <S.BtnInput>
            <Label id="">여행 종료일</Label>
            {/* <S.BtnIcon>
              <img src="/assets/img/icons/calendar.svg" height={12} />
            </S.BtnIcon> */}
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
