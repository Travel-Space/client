"use client";
import axiosRequest from "@/api";
import { ResData, Planet, PlanetsType, JoinedPlanets } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { myPlanetsState, joinedPlanetsState } from "@/recoil/atoms/planets.atom";
import { userAtom } from "@/recoil/atoms/user.atom";
import usePagination from "@/hooks/usePagination";

import * as S from "./page.styled";

import Link from "next/link";
import Image from "next/image";
import Nothing from "@/components/common/Nothing";
import MyPlanetItem from "@/components/common/User/MyPlanetItem";
import PlanetItem from "@/components/common/User/PlanetItem";
import Button from "@/components/common/Button";
import Pagination from "@/components/common/Pagination";

import MESSAGE from "@/constants/message";

export default function PlanetPage() {
  const userId = useRecoilState(userAtom)[0]?.id;

  const [myPlanets, setMyPlanets] = useRecoilState(myPlanetsState);
  const [overLimit, setOverLimit] = useState(false);

  let myPlanetsWithNull = new Array(5).fill(null);
  myPlanets.map((el, idx) => (myPlanetsWithNull[idx] = el));

  const [joinedPlanets, setJoinedPlanets] = useRecoilState(joinedPlanetsState);

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
      console.error("행성 정보를 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //가입한 행성 불러오기
  const getJoinedPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<JoinedPlanets>>(
        "get",
        `/planet/my-planets?page=${page}&limit=10`,
      );
      const planets = response.data.data;
      const totalCount = response.data.totalMemberships;
      const totalPage = Math.ceil(totalCount / 10);

      saveData(totalCount, totalPage, planets);
      // console.log("planets", response.data.data);
    } catch (error) {
      console.error("행성 정보를 불러오는 중 오류가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  //pagination
  const { saveData, totalCount, totalPage, page, setPage } = usePagination(getJoinedPlanets, setJoinedPlanets);

  useEffect(() => {
    getMyPlanets();
    getJoinedPlanets();

    if (myPlanets.length >= 5) setOverLimit(true);
  }, []);

  return (
    <S.Container>
      <S.MyPlanetInfo>
        <S.Title>내가 생성한 행성</S.Title>
        <S.NewPlanet>
          <S.MyPlanetNumber>
            <span>{5 - myPlanets.length}</span>개의 행성을 더 운영할 수 있습니다.
          </S.MyPlanetNumber>
          <Link href="/create-planet">
            <Button variant="reverse" shape="medium" size="smallWithSmFont" disabled={overLimit}>
              새 행성 만들기
            </Button>
          </Link>
        </S.NewPlanet>
      </S.MyPlanetInfo>
      {!myPlanets.length ? (
        <S.NoMyPlanets>생성한 행성이 없습니다.</S.NoMyPlanets>
      ) : (
        <S.MyPlanetWrap>
          {myPlanetsWithNull.map((planet, idx) =>
            planet === null ? (
              <Image src="/assets/img/icons/empty-space.svg" alt="empty-space" width={152} height={186} />
            ) : (
              <MyPlanetItem key={idx} data={planet} />
            ),
          )}
        </S.MyPlanetWrap>
      )}
      <S.JoinedPlanetInfo>
        <S.Title>여행 중인 행성</S.Title>
        <S.TravelNumber>
          총 <span>{totalCount}</span>개의 행성
        </S.TravelNumber>
      </S.JoinedPlanetInfo>
      {!totalCount ? (
        <S.NothingWrap>
          <Nothing
            src="/assets/img/icons/no-planets.svg"
            alt="no-TravelingPlanets"
            width={148}
            height={148}
            comment="여행 중인 행성이 없습니다."
            font="lg"
          />
        </S.NothingWrap>
      ) : (
        <>
          <S.JoinedPlanetList>
            {joinedPlanets.map((planet, idx) => (
              <PlanetItem key={idx} data={planet} userId={userId} />
            ))}
          </S.JoinedPlanetList>
          <Pagination totalPage={totalPage} limit={5} page={page} setPage={setPage} />
        </>
      )}
    </S.Container>
  );
}
