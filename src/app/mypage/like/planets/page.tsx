"use client";
import axiosRequest from "@/api";
import { ResData, Planet, User, LikedPlanet } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import planetsState from "@/recoil/atoms/planets.atom";
import { profileState } from "@/recoil/atoms/user.atom";

import * as S from "./page.styled";

import MyPlanet from "@/app/mypage/MyPlanet";
import SearchForm from "@/app/mypage/SearchForm";
import FavoritePlanet from "./FavoritePlanet";
import Nothing from "@/components/common/Nothing";

export default function Planets() {
  const dropDownProps = {
    placeholder: "행성 이름으로 검색해보세요.",
  };

  const [profile, setProfile] = useRecoilState(profileState);
  const [planets, setPlanets] = useRecoilState(planetsState);
  const [likedPlanets, setLikedPlanets] = useState<LikedPlanet[]>([]);

  //프로필 불러오기
  async function getProfile() {
    try {
      const response = await axiosRequest.requestAxios<ResData<User>>("get", "/user/profile");
      setProfile(response.data);
      console.log("profile", profile);
    } catch (error) {
      alert("프로필 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching profile data: ", error);
    }
  }

  //내가 생성한 행성
  const myPlanets = planets.filter(el => profile?.id === el.ownerId);

  //행성 불러오기
  async function getMyPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet[]>>("get", "/planet/my-planets");
      setPlanets(response.data);
      console.log("planets", planets);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }

  //좋아요한 행성 불러오기
  async function getLikedPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<LikedPlanet[]>>("get", `/planet/my/bookmarks`);
      setLikedPlanets(response.data);
      console.log("getLikedPlanets", response.data);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }
  useEffect(() => {
    if (profile === null) getProfile();
    if (myPlanets.length === 0) getMyPlanets();
    getLikedPlanets();
  }, []);
  return (
    <S.Container>
      <S.Row>
        <S.Title>내 행성 좋아요 수</S.Title>
        <SearchForm select={dropDownProps} />
      </S.Row>

      <S.MyPlanets>
        {myPlanets.map((planet, idx) => (
          <MyPlanet key={`liked-planet${idx}`} data={planet} />
        ))}
      </S.MyPlanets>

      <S.FavoritePlanetsInfo>
        <S.Title>내가 좋아요한 행성</S.Title>
        <S.PlanetsNumber>
          총 <span>{likedPlanets.length}</span>개의 행성
        </S.PlanetsNumber>
      </S.FavoritePlanetsInfo>
      <S.FavoritePlanets>
        {likedPlanets.length === 0 && (
          <Nothing
            src="/assets/img/icons/no-planets.svg"
            alt="no-favoritePlanets"
            width={148}
            height={148}
            comment="좋아하는 행성이 없습니다."
            font="lg"
          />
        )}
        {likedPlanets.map((el, idx) => (
          <FavoritePlanet
            key={`liked-planet${idx}`}
            data={el}
            setPlanets={(planets: LikedPlanet[]) => setLikedPlanets(planets)}
          />
        ))}
      </S.FavoritePlanets>
    </S.Container>
  );
}
