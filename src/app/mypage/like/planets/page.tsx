"use client";
import axiosRequest from "@/api";
import { ResData, Planet, User, Planets, LikedPlanets } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import planetsState from "@/recoil/atoms/planets.atom";
import { userAtom } from "@/recoil/atoms/user.atom";
import usePagination from "@/hooks/usePagination";

import * as S from "./page.styled";

import MyPlanet from "@/app/mypage/MyPlanet";
import SearchForm from "@/app/mypage/SearchForm";
import FavoritePlanet from "./FavoritePlanet";
import Nothing from "@/components/common/Nothing";
import Pagination from "@/components/common/Pagination";

export default function Planets() {
  const dropDownProps = {
    placeholder: "행성 이름으로 검색해보세요.",
  };

  const user = useRecoilValue(userAtom);
  const [planets, setPlanets] = useRecoilState(planetsState);
  const [likedPlanets, setLikedPlanets] = useState<Planet[]>([]);

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getLikedPlanets, setLikedPlanets);

  //내가 생성한 행성
  const myPlanets = planets.filter(el => user.id === el.ownerId);

  //내 행성 불러오기
  async function getMyPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planets>>("get", "/planet/my-planets");
      setPlanets(response.data.data);
      // console.log("planets", planets);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }

  //좋아요한 행성 불러오기
  async function getLikedPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<LikedPlanets>>(
        "get",
        `/planet/my/bookmarks?page=${page}&limit=10`,
      );
      const planets = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);
      saveData(totalCount, totalPage, planets);
      // console.log("getLikedPlanets", response.data);
    } catch (error) {
      alert("좋아요한 행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }

  useEffect(() => {
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
        {myPlanets.length === 0 ? (
          <S.NoMyPlanets>생성한 행성이 없습니다.</S.NoMyPlanets>
        ) : (
          <>
            {myPlanets.map((planet, idx) => (
              <MyPlanet key={`liked-planet${idx}`} data={planet} />
            ))}
          </>
        )}
      </S.MyPlanets>

      <S.FavoritePlanetsInfo>
        <S.Title>내가 좋아요한 행성</S.Title>
        <S.PlanetsNumber>
          총 <span>{totalCount}</span>개의 행성
        </S.PlanetsNumber>
      </S.FavoritePlanetsInfo>
        {likedPlanets.length === 0 ? (
          <S.NothingContainer>
          <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-favoritePlanets"
          width={148}
          height={148}
          comment="좋아하는 행성이 없습니다."
          font="lg"
          />
          </S.NothingContainer>
        ) : (
          <>
          <S.FavoritePlanets>
          likedPlanets?.map((el, idx) => (
            <FavoritePlanet key={`liked-planet${idx}`} data={el} page={page} saveData={saveData} setPage={setPage} />
          ))
      </S.FavoritePlanets>
      <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} /></>
        )}
    </S.Container>
  );
}
