"use client";

import * as S from "./page.styled";

import Nothing from "@/app/my-page/Nothing";
import MyPlanet from "@/app/my-page/MyPlanet";
import TravelingPlanet from "./TravelingPlanet";

export default function Planet() {
  return (
    <S.Container>
      <Nothing
        src="/assets/img/icons/no-planets.svg"
        alt="no-TravelingPlanets"
        width={148}
        height={148}
        comment="여행 중인 행성이 없습니다."
      />

      <S.MyPlanetInfo>
        <S.Title>내가 생성한 행성</S.Title>
        <S.NewPlanet>
          <S.MyPlanetNumber>
            <span>1</span>개의 행성을 더 운영할 수 있습니다.
          </S.MyPlanetNumber>
          <S.MakePlanetBtn>새 행성 만들기</S.MakePlanetBtn>
        </S.NewPlanet>
      </S.MyPlanetInfo>
      <S.MyPlanetWrap>
        <MyPlanet />
        <MyPlanet />
        <MyPlanet />
        <MyPlanet />
        <MyPlanet />
      </S.MyPlanetWrap>
      <S.TravelingPlanetInfo>
        <S.Title>여행 중인 행성</S.Title>
        <S.TravelNumber>
          총 <span>30</span>개의 행성
        </S.TravelNumber>
      </S.TravelingPlanetInfo>
      <S.TravelingPlanetWrap>
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
        <TravelingPlanet />
      </S.TravelingPlanetWrap>
    </S.Container>
  );
}
