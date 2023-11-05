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

export default function Home() {
  const setPlanetList = useSetRecoilState(planetListState);
  const planetList = useRecoilValue(planetListState);

  useEffect(() => {
    // 홈 화면으로 돌아왔을 때 기본 행성 리스트를 불러오는 로직
    const fetchDefaultPlanetList = async () => {
      try {
        const response = await axiosRequest.requestAxios<ResData<Planet>>("get", "/planet?page=1&limit=10", {});
        setPlanetList(response.data.planets);
      } catch (error) {
        console.error("기본 행성 리스트 불러오는 중 오류가 발생했습니다.", error);
        alert(MESSAGE.ERROR.DEFAULT);
      }
    };

    fetchDefaultPlanetList();
  }, [setPlanetList]);

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
