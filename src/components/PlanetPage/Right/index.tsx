import { useContext } from "react";
import Image from "next/image";

import * as S from "./index.styled";

import Line from "@/components/common/Line";
import Input, { Label } from "@/components/common/Input";
import Textarea from "@/components/common/Textarea";
import AdjustBtnInput from "@/components/common/AdjustBtnInput";
import Button from "@/components/common/Button";
import { PlanetContext, PlanetContextType } from "..";
import axiosRequest from "@/api";
import { ResData } from "@/@types";
import { Planet } from "@/@types/Planet";
import { AxiosError } from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserType, userAtom } from "@/recoil/atoms/user.atom";
import { useRouter } from "next/navigation";

export default function Right() {
  const planetContext = useContext<PlanetContextType | undefined>(PlanetContext);
  const user = useRecoilValue(userAtom);
  const [auth, setAuth] = useRecoilState(userAtom);
  const router = useRouter();

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

  function handlePublished(isPublic: boolean) {
    setPlanetInfo({
      ...planetInfo,
      published: isPublic,
    });
  }

  function handleDescription(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setPlanetInfo({
      ...planetInfo,
      description: e.target.value,
    });
  }

  function handleMemberLimit(number: number | undefined) {
    setPlanetInfo({
      ...planetInfo,
      memberLimit: number,
    });
  }

  function handleSpaceshipLimit(number: number | undefined) {
    setPlanetInfo({
      ...planetInfo,
      spaceshipLimit: number,
    });
  }

  async function submitCreatePlanet() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("post", "/planet", planetInfo);
      console.log(response);
      const data = response.data;
      if (response.status === 201) {
        alert("새로운 행성이 생성되었습니다!");
        const updatedUser = {
          memberships: {
            planets: [...(auth?.memberships.planets || []), { planetId: data.id, role: "OWNER" }],
            spaceships: auth?.memberships.spaceships || [],
          },
          isAuth: auth?.isAuth,
          id: auth?.id,
          role: auth?.role,
        } as UserType;
        setAuth(updatedUser);
        router.push(`/planet/${data.id}/map/`);
      }
    } catch (error) {
      console.error("새 행성 생성하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

  async function submitModifyPlanet() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>("put", `/planet/${planetInfo.id}`, {
        ...planetInfo,
        ownerId: user?.id,
      });
      console.log(response);
      if (response.status === 200) {
        alert("행성이 수정되었습니다!");
        router.push(`/planet/${planetInfo.id}/map/`);
      }
    } catch (error) {
      console.error("행성 수정하기 에러", error);
      const errorResponse = (error as AxiosError<{ message: string }>).response;
      alert(errorResponse?.data.message);
    }
  }

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
            max={100}
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
            max={100}
            onNumber={handleSpaceshipLimit}
          />
        </S.InputGroup>
      </S.BetweenGroup>

      <Line color="gray" size="horizontal" />

      <S.BetweenGroup>
        <Button variant="reverse" shape="medium" size="big">
          취소
        </Button>
        <Button
          variant="confirm"
          shape="medium"
          size="big"
          onClick={planetInfo.id ? submitModifyPlanet : submitCreatePlanet}
        >
          {planetInfo.id ? "수정" : "완료"}
        </Button>
      </S.BetweenGroup>
    </S.Wrap>
  );
}
