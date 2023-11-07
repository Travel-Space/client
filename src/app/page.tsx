"use client";

import axiosRequest from "@/api";
import HomeTitle from "./home/HomeTitle";
import * as H from "./home/page.styled";
import { PlanetList } from "./home/PlanetList";
import SearchPlanet from "./home/SearchPlanet";
import { planetListState } from "@/recoil/atoms/searchPlanet.atom";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import MESSAGE from "@/constants/message";
import { Planet, ResData } from "@/@types";
import { userAtom } from "@/recoil/atoms/user.atom";

export default function Home() {
  const setPlanetList = useSetRecoilState(planetListState);
  const planetList = useRecoilValue(planetListState);
  const currentUser = useRecoilValue(userAtom);

  useEffect(() => {
    //초기 행성 목록 fetch 함수
    const fetchDefaultPlanetList = async () => {
      try {
        const response = await axiosRequest.requestAxios<ResData<Planet>>("get", "/planet?page=1&limit=10", {});
        let planets = response.data.planets;

        if (currentUser?.isAuth) {
          // 로그인한 유저의 행성멤버쉽의 행성리스트 조회
          const userPlanetIds = currentUser.memberships.planets.map(planetMembership => planetMembership?.planetId);
          // 로그인 시 비공개 행성 보여지지 않음 -> 가입된 행성은 볼 수 있음
          planets = planets.filter(planet => planet.published !== false || userPlanetIds?.includes(planet.id));
        }
        // 비로그인 상태일 경우 모든 행성을 가져옴 (아무런 필터링 적용하지 않음)
        setPlanetList(planets);
      } catch (error) {
        console.error("기본 행성 리스트 불러오는 중 오류가 발생했습니다.", error);
        alert(MESSAGE.ERROR.DEFAULT);
      }
    };

    fetchDefaultPlanetList();
  }, [setPlanetList, currentUser]);

  return (
    <>
      <H.Wrapper>
        <HomeTitle />
        <H.Content>
          <SearchPlanet />
          <PlanetList planetList={planetList} />
        </H.Content>
      </H.Wrapper>
    </>
  );
}
