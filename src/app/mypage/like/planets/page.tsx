"use client";
import axiosRequest from "@/api";
import { ResData, PlanetBookmark, PlanetsType, LikedPlanets, SearchItem } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { myPlanetsState } from "@/recoil/atoms/planets.atom";
import usePagination from "@/hooks/usePagination";

import * as S from "./page.styled";

import Image from "next/image";
import MyPlanetItem from "@/components/common/User/MyPlanetItem";
import SearchForm from "@/app/mypage/SearchForm";
import FavoritePlanet from "./FavoritePlanet";
import Nothing from "@/components/common/Nothing";
import Pagination from "@/components/common/Pagination";

import MESSAGE from "@/constants/message";

export default function Planets() {
  const dropDownProps = {
    selectedMenu: "행성 이름",
    placeholder: "행성 이름으로 검색해 보세요.",
  };

  const [searchItem, setSearchItem] = useState<SearchItem>();

  const [myPlanets, setMyPlanets] = useRecoilState(myPlanetsState);
  let myPlanetsWithNull = new Array(5).fill(null);
  myPlanets.map((el, idx) => (myPlanetsWithNull[idx] = el));

  const [likedPlanets, setLikedPlanets] = useState<PlanetBookmark[]>([]);

  const handleSearch = (item: SearchItem) => {
    setSearchItem(item);
    // console.log("searchItem", item);
  };

  //소유한 행성 불러오기
  const getMyPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>(
        "get",
        "/planet/my-owned-planets?page=1&limit=5",
      );

      const planets = response.data.data;
      setMyPlanets(planets);
      // console.log("planets", response.data.data);
    } catch (error) {
      console.error("행성 목록을 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //좋아요한 행성 불러오기
  const getLikedPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<LikedPlanets>>(
        "get",
        !searchItem?.content
          ? `/planet/my/bookmarks?page=${page}&limit=10`
          : `/planet/my/bookmarks?page=${page}&limit=10&name=${searchItem?.content}`,
      );
      const planets = response.data.data;
      const totalCount = response.data.totalCount;
      const totalPage = Math.ceil(totalCount / 10);

      saveData(totalCount, totalPage, planets);
      // console.log("getLikedPlanets", response.data);
    } catch (error) {
      console.error("좋아요한 행성 목록을 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getLikedPlanets, setLikedPlanets);

  useEffect(() => {
    if (myPlanets.length === 0) getMyPlanets();
    getLikedPlanets();
  }, []);

  useEffect(() => {
    setPage(1);
    getLikedPlanets();
  }, [searchItem]);

  return (
    <S.Container>
      <S.Row>
        <S.Title>내 행성 좋아요 수</S.Title>
        <SearchForm select={dropDownProps} onSearch={handleSearch} />
      </S.Row>

      <S.MyPlanets>
        {myPlanets.length === 0 ? (
          <S.NoMyPlanets>생성한 행성이 없습니다.</S.NoMyPlanets>
        ) : (
          <S.MyPlanetWrap>
            {myPlanetsWithNull.map((planet, idx) =>
              planet === null ? (
                <Image src="/assets/img/icons/empty-space.svg" alt="empty-space" width={152} height={186} />
              ) : (
                <MyPlanetItem key={`liked-myPlanet${idx}`} data={planet} />
              ),
            )}
          </S.MyPlanetWrap>
        )}
      </S.MyPlanets>

      <S.FavoritePlanetsInfo>
        <S.Title>내가 좋아요한 행성</S.Title>
        <S.PlanetsNumber>
          총 <span>{totalCount}</span>개의 행성
        </S.PlanetsNumber>
      </S.FavoritePlanetsInfo>
      {totalCount === 0 ? (
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
            {likedPlanets?.map((el, idx) => (
              <FavoritePlanet key={`liked-planet${idx}`} data={el} page={page} saveData={saveData} setPage={setPage} />
            ))}
          </S.FavoritePlanets>
          <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} />
        </>
      )}
    </S.Container>
  );
}
