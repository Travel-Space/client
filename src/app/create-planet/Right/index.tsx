import Line from "@/components/common/Line";
import * as S from "./index.styled";
import Input, { Label } from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import Button from "@/components/common/Button";

export default function Right() {
  return (
    <S.Wrap>
      <div>
        <S.BetweenGroup>
          <S.Header>
            <img src="/assets/img/icons/create-plus.svg" alt="" />
            {/* <img src="/assets/img/icons/create-pencil.svg" alt="" /> */}
            <h1>새 행성 만들기</h1>
            {/* <h1>행성 관리</h1> */}
          </S.Header>
          <S.RadioBox>
            <S.Radio type="radio" value="public" name="planet-type" id="public" defaultChecked className="checked" />
            <S.Label htmlFor="public">공개</S.Label>
            <S.Radio type="radio" value="private" name="planet-type" id="private" />
            <S.Label htmlFor="public">비공개</S.Label>
          </S.RadioBox>
        </S.BetweenGroup>
        <S.MarginGroup>
          <Line color="gray" size="horizontal" />
        </S.MarginGroup>
        <S.Description>소중한 추억으로 기록될 우리만의 여행 블로그를 시작해보세요!</S.Description>
      </div>

      <S.InputGroup>
        <Label id="planet-title">행성 이름</Label>
        <Input id="planet-title" type="text" name="planet-title" placeholder="행성 이름" />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="planet-description">행성 소개</Label>
        <Textarea size="planet" placeholder="행성 소개" name="planet-description" maxLength={100} />
      </S.InputGroup>
      <S.BetweenGroup>
        <S.InputGroup>
          <Label id="planet-people-number">탑승 인원수</Label>
          <AdjustBtnInput name="" id="" />
        </S.InputGroup>
        <S.InputGroup>
          <Label id="planet-ship-number">우주선 갯수</Label>
          <AdjustBtnInput name="" id="" />
        </S.InputGroup>
      </S.BetweenGroup>

      <Line color="gray" size="horizontal" />

      <S.BetweenGroup>
        <Button variant="reverse" shape="medium" size="big">
          취소
        </Button>
        <Button variant="confirm" shape="medium" size="big">
          완료
        </Button>
      </S.BetweenGroup>
    </S.Wrap>
  );
}
