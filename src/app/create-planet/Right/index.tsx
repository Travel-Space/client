import { useContext } from "react";
import Image from "next/image";

import * as S from "./index.styled";

import Line from "@/components/common/Line";
import Input, { Label } from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import Button from "@/components/common/Button";
import { PlanetContext, PlanetContextType } from "../page";

export default function Right() {
  const planetContext = useContext<PlanetContextType | undefined>(PlanetContext);

  if (!planetContext) {
    return;
  }

  const { planetInfo, setPlanetInfo } = planetContext;

  function handleName(e: React.ChangeEvent<HTMLInputElement>) {
    setPlanetInfo({
      ...planetInfo,
      name: e.target.value,
    });
  }

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlanetInfo({
      ...planetInfo,
      description: e.target.value,
    });
  }

  return (
    <S.Wrap>
      <div>
        <S.BetweenGroup>
          <S.Header>
            <Image width={21} height={21} src="/assets/img/icons/create-plus.svg" alt="새 행성 만들기 아이콘" />
            {/* <Image width={21} height={21} src="/assets/img/icons/create-pencil.svg" alt="행성 관리 아이콘" /> */}
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
        <Input
          id="planet-title"
          type="text"
          name="planet-title"
          placeholder="행성 이름"
          onChange={handleName}
          value={planetInfo.name}
        />
      </S.InputGroup>
      <S.InputGroup>
        <Label id="planet-description">행성 소개</Label>
        <Textarea
          size="planet"
          placeholder="행성 소개"
          name="planet-description"
          maxLength={100}
          onChange={handleDescription}
          // value={planetInfo.description}
        />
      </S.InputGroup>
      <S.BetweenGroup $half>
        <S.InputGroup>
          <Label id="planet-people-number">탑승 인원수</Label>
          <AdjustBtnInput
            name="planet-people-number"
            id="planet-people-number"
            value="10"
            min={2}
            max={100}
            onNumber={number => console.log(number)}
          />
        </S.InputGroup>
        <S.InputGroup>
          <Label id="planet-ship-number">우주선 갯수</Label>
          <AdjustBtnInput
            name="planet-ship-number"
            id="planet-ship-number"
            value="10"
            min={1}
            max={10}
            onNumber={number => console.log(number)}
          />
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
