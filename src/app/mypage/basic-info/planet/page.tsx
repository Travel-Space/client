"use client";
import axiosRequest from "@/api";
import { ResData, Planet, Planets } from "@/@types";

import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { myPlanetsState, joinedPlanetsState, joinedPlanetsCountState } from "@/recoil/atoms/planets.atom";

import * as S from "./page.styled";

import Link from "next/link";
import Image from "next/image";
import Nothing from "@/components/common/Nothing";
import MyPlanet from "@/app/mypage/MyPlanet";
import PlanetItem from "@/components/User/PlanetItem";
import Button from "@/components/common/Button";

export default function Planet() {
  const [myPlanets, setMyPlanets] = useRecoilState(myPlanetsState);

  const [joinedPlanets, setJoinedPlanets] = useRecoilState(joinedPlanetsState);
  const [joinedPlanetsCount, setJoinedPlanetsCount] = useRecoilState(joinedPlanetsCountState);

  const [overLimit, setOverLimit] = useState(false);

  //소유한 행성 불러오기
  async function getMyPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planets>>(
        "get",
        "/planet/my-owned-planets?page=1&limit=5",
      );

      setMyPlanets(response.data.data);
      // console.log("planets", response.data.data);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }
  //가입한 행성 불러오기
  async function getJoinedPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<Planets>>(
        "get",
        `/planet/my-planets?page=${page}&limit=${limit}`,
      );

      setJoinedPlanets(response.data.data);
      setJoinedPlanetsCount(response.data.totalCount);
      // console.log("planets", response.data.data);
    } catch (error) {
      alert("행성 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet data: ", error);
    }
  }
  //여행중인 행성
  let myPlanetsWithNull = new Array(5).fill(null);
  myPlanets.map((el, idx) => (myPlanetsWithNull[idx] = el));

  useEffect(() => {
    getMyPlanets();
    getJoinedPlanets();
    // console.log("id", user.id);

    if (myPlanets.length >= 5) setOverLimit(true);
  }, []);
  return (
    <S.Container>
      {/* 데이터가 없을 경우 */}
      {myPlanets.length === 0 ? (
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-TravelingPlanets"
          width={148}
          height={148}
          comment="여행 중인 행성이 없습니다."
          font="lg"
        />
      ) : (
        <>
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
          <S.MyPlanetWrap>
            {myPlanetsWithNull.map((planet, idx) =>
              planet === null ? (
                <Image src="/assets/img/icons/empty-space.svg" alt="empty-space" width={152} height={186} />
              ) : (
                <MyPlanet key={idx} data={planet} />
              ),
            )}
          </S.MyPlanetWrap>
          <S.TravelingPlanetInfo>
            <S.Title>여행 중인 행성</S.Title>
            <S.TravelNumber>
              총 <span>{joinedPlanetsCount}</span>개의 행성
            </S.TravelNumber>
          </S.TravelingPlanetInfo>
          <S.TravelingPlanetList>
            {joinedPlanets.map((planet, idx) => (
              <PlanetItem key={idx} data={planet} />
            ))}
          </S.TravelingPlanetList>
        </>
      )}
    </S.Container>
  );
}
