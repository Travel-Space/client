"use client";

import * as S from "./page.styled";

import MyPlanet from "@/app/mypage/MyPlanet";
import SearchForm from "../../SearchForm";
import FavoritePlanet from "./FavoritePlanet";
import Nothing from "../../Nothing";

export default function Planets() {
  return (
    <S.Container>
      <S.Row>
        <S.Title>내 행성 좋아요 수</S.Title>
        <SearchForm />
      </S.Row>

      <S.MyPlanets>
        <MyPlanet hasLikes={true} />
        <MyPlanet hasLikes={true} />
        <MyPlanet hasLikes={true} />
        <MyPlanet hasLikes={true} />
        <MyPlanet hasLikes={true} />
      </S.MyPlanets>

      <S.FavoritePlanetsInfo>
        <S.Title>내가 좋아요한 행성</S.Title>
        <S.PlanetsNumber>
          총 <span>30</span>개의 행성
        </S.PlanetsNumber>
      </S.FavoritePlanetsInfo>
      <S.FavoritePlanets>
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-favoritePlanets"
          width={148}
          height={148}
          comment="좋아하는 행성이 없습니다."
        />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
        <FavoritePlanet />
      </S.FavoritePlanets>
    </S.Container>
  );
}
