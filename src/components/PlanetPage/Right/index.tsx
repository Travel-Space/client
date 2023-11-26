import { useContext, useEffect } from "react";
import { isAxiosError } from "axios";

import Image from "next/image";
import { useRouter } from "next/navigation";

import * as S from "./index.styled";
import { ErrorMessage } from "@/styles/common";

import Line from "@/components/common/Line";
import Input, { Label } from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import Button from "@/components/common/Button";
import { PlanetContext, PlanetContextType } from "@/components/PlanetPage";

import axiosRequest from "@/api";

import { ResData } from "@/@types";
import { PLANET_ROLE_NAME, Planet } from "@/@types/Planet";

import { useRecoilState, useRecoilValue } from "recoil";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";

import STATUS_CODE from "@/constants/statusCode";
import VALIDATE from "@/constants/regex";
import MESSAGE from "@/constants/message";

export default function Right() {
  const { planetInfo, nameValid, notAllow, setPlanetInfo, setNameValid, setDescriptionValid } =
    useContext<PlanetContextType>(PlanetContext);
  const user = useRecoilValue(userAtom);
  const [auth, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

  const handleName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlanetInfo({
      ...planetInfo,
      name: e.target.value,
    });
    VALIDATE.PLANET.NAME.test(e.target.value) ? setNameValid(true) : setNameValid(false);
  };

  const handlePublished = (isPublic: boolean) => {
    setPlanetInfo({
      ...planetInfo,
      published: isPublic,
    });
  };

  const handleDescription = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setPlanetInfo({
      ...planetInfo,
      description: e.target.value,
    });
    VALIDATE.PLANET.DESCRIPTION.test(e.target.value) ? setDescriptionValid(true) : setDescriptionValid(false);
  };

  const handleMemberLimit = (number: number) => {
    setPlanetInfo({
      ...planetInfo,
      memberLimit: number,
    });
  };

  const handleSpaceshipLimit = (number: number) => {
    setPlanetInfo({
      ...planetInfo,
      spaceshipLimit: number,
    });
  };

  const submitCreatePlanet = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("post", "/planet", planetInfo);
      console.log(response);
      const data = response.data;
      if (response.status === STATUS_CODE.CREATED) {
        alert("새로운 행성이 생성되었습니다!");
        const updatedUser = {
          ...auth,
          memberships: {
            planets: [...(auth?.memberships.planets || []), { planetId: data.id, role: PLANET_ROLE_NAME.OWNER }],
            spaceships: auth?.memberships.spaceships || [],
          },
        } as UserType;
        setAuth(updatedUser);
        router.push(`/planet/${data.id}/map/`);
      }
    } catch (error) {
      console.error("새 행성 생성하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  const submitModifyPlanet = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("put", `/planet/${planetInfo.id}`, {
        ...planetInfo,
        ownerId: user?.id,
      });
      console.log(response);
      if (response.status === STATUS_CODE.OK) {
        alert("행성이 수정되었습니다!");
        router.push(`/planet/${planetInfo.id}/map/`);
      }
    } catch (error) {
      console.error("행성 수정하기 에러", error);
      if (isAxiosError(error)) {
        alert(error.response?.data.message);
      }
    }
  };

  useEffect(() => {
    VALIDATE.PLANET.NAME.test(planetInfo.name) ? setNameValid(true) : setNameValid(false);
    VALIDATE.PLANET.DESCRIPTION.test(planetInfo.description) ? setDescriptionValid(true) : setDescriptionValid(false);
  }, [planetInfo]);

  return (
    <S.Wrap>
      <div>
        <S.BetweenGroup>
          <S.Header>
            <Image
              width={21}
              height={21}
              src={`/assets/img/icons/create-${planetInfo.id ? "pencil" : "plus"}.svg`}
              alt={`${planetInfo.id ? "행성 관리" : "새 행성 만들기"} 아이콘`}
            />
            <h1>{planetInfo.id ? "행성 관리" : "새 행성 만들기"}</h1>
          </S.Header>
          <S.RadioBox>
            <S.Radio
              type="radio"
              value="public"
              name="planet-type"
              id="public"
              checked={planetInfo.published === true}
              onChange={() => handlePublished(true)}
            />
            <S.Label htmlFor="public">공개</S.Label>
            <S.Radio
              type="radio"
              value="private"
              name="planet-type"
              id="private"
              checked={planetInfo.published === false}
              onChange={() => handlePublished(false)}
            />
            <S.Label htmlFor="private">비공개</S.Label>
          </S.RadioBox>
        </S.BetweenGroup>
        <S.MarginGroup>
          <Line color="gray" size="horizontal" />
        </S.MarginGroup>
        <S.Description>소중한 추억으로 기록될 우리만의 여행 블로그를 시작해 보세요!</S.Description>
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
          warning={!nameValid && planetInfo.name}
          maxLength={VALIDATE.PLANET.NAME_COUNT}
        />
        {!nameValid && planetInfo.name && <ErrorMessage>{MESSAGE.PLANET.SYNTAX_NAME}</ErrorMessage>}
      </S.InputGroup>
      <S.InputGroup>
        <Label id="planet-description">행성 소개</Label>
        <Textarea
          size="planet"
          placeholder="행성 소개"
          name="planet-description"
          maxLength={VALIDATE.PLANET.DESCRIPTION_COUNT}
          onChange={handleDescription}
          value={planetInfo.description}
        />
      </S.InputGroup>
      <S.BetweenGroup $half>
        <S.InputGroup>
          <Label id="planet-member-limit">탑승 인원수</Label>
          <AdjustBtnInput
            name="planet-member-limit"
            id="planet-member-limit"
            value={planetInfo.memberLimit}
            min={1}
            max={VALIDATE.PLANET.MEMBER_LIMIT}
            onNumber={handleMemberLimit}
          />
        </S.InputGroup>
        <S.InputGroup>
          <Label id="planet-ship-limit">우주선 갯수</Label>
          <AdjustBtnInput
            name="planet-ship-limit"
            id="planet-ship-limit"
            value={planetInfo.spaceshipLimit}
            min={1}
            max={VALIDATE.PLANET.SPACESHIP_LIMIT}
            onNumber={handleSpaceshipLimit}
          />
        </S.InputGroup>
      </S.BetweenGroup>

      <Line color="gray" size="horizontal" />

      <S.BetweenGroup>
        <Button variant="reverse" shape="medium" size="big" onClick={() => router.back()}>
          취소
        </Button>
        <Button
          variant="confirm"
          shape="medium"
          size="big"
          disabled={notAllow}
          onClick={planetInfo.id ? submitModifyPlanet : submitCreatePlanet}
        >
          {planetInfo.id ? "수정" : "완료"}
        </Button>
      </S.BetweenGroup>
    </S.Wrap>
  );
}
