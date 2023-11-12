"use client";

import React, { useState } from "react";
import * as S from "./index.styled";
import Link from "next/link";
import Button from "@/components/common/Button";
import { useRecoilValue } from "recoil";
import { userAtom } from "@/recoil/atoms/user.atom";
import { Planet, ResData } from "@/@types";
import axiosRequest from "@/api";
import { useSetRecoilState } from "recoil";
import { planetListState } from "@/recoil/atoms/searchPlanet.atom";



interface SearchPlanet {
  handleSearchPlanet: () => void;
  hadleSearchBtn: () => void;
}

export default function SearchPlanet() {
  const user = useRecoilValue(userAtom);

  const setSearchQuery = useSetRecoilState(planetListState);
  const [searchInput, setSearchInput] = useState<string>("");

  const setPlanetList = useSetRecoilState(planetListState);

  //행성 해시 태그 검색
  const handleSearchPlanet = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  //행성 검색 버튼
  const handleSearchBtn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault(); 
    console.log("검색어:", searchInput);
    setSearchQuery(searchInput); 

    await fetchSearchResults(searchInput, 1);
  };

  // 행성 검색 결과를 가져오는 함수
  const fetchSearchResults = async (query: string, page: number) => {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planet>>(
        "get",
        `/planet?page=${page}&limit=10&hashtag=${query}`,
        {},
      );
      // 검색 결과로 planetList 상태 업데이트
      setPlanetList(response.data.planets);
    } catch (error) {
      console.error("검색 중 오류 발생", error);
      alert("검색 중 오류가 발생했습니다.");
    }
  };

  return (
    <>
      <S.Wrapper>
        <S.SearchContainer>
          <S.SearchInput
            type="text"
            placeholder="가고 싶은 행성을 검색해 보세요."
            value={searchInput}
            onChange={handleSearchPlanet}
          />
          <S.SearchBtn onClick={handleSearchBtn}>
            <S.SerachBtnImg src="/assets/img/icons/search.svg" />
          </S.SearchBtn>
        </S.SearchContainer>
        <S.BtnContainer>
          {user?.isAuth && (
            <S.NewCreateBtn>
              <Link href="/create-planet">
                <Button variant="white" shape="large" size="big" fontWeight="bold">
                  새로운 행성 만들기
                </Button>
              </Link>
            </S.NewCreateBtn>
          )}
          <S.RandomPlanetBtn>
            <Link href="/random-planet">
              <Button variant="white" shape="large" size="big" fontWeight="bold">
                랜덤 행성 구경하기
              </Button>
            </Link>
          </S.RandomPlanetBtn>
        </S.BtnContainer>
      </S.Wrapper>
    </>
  );
}
