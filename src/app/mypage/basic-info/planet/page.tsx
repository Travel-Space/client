"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Planet } from "@/@types/Planet";

import * as S from "./page.styled";
import Link from "next/link";
import Image from "next/image";

import Nothing from "@/app/mypage/Nothing";
import MyPlanet from "@/app/mypage/MyPlanet";
import TravelingPlanet from "./TravelingPlanet";

export default function Planet() {
  //행성 불러오기(임시-api완성되면 수정예정)
  const fetchPlanets = async () => {
    return axios.get("/planet").then(response => response.data);
  };

  const { isLoading, data, isError, error } = useQuery<Planet[], Error, Planet[]>({
    queryKey: ["get-myplanets"],
    queryFn: fetchPlanets,
  });
  console.log("fetchPlanets", data);
  if (isLoading) return <>Loading...</>;
  if (isError) return <>{error.message}</>;

  let myPlanet = new Array(5).fill(null);
  data?.map((el, idx) => (myPlanet[idx] = el));

  return (
    <S.Container>
      {/* 데이터가 없을 경우 */}
      {!data && (
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-TravelingPlanets"
          width={148}
          height={148}
          comment="여행 중인 행성이 없습니다."
        />
      )}

      <S.MyPlanetInfo>
        <S.Title>내가 생성한 행성</S.Title>
        <S.NewPlanet>
          <S.MyPlanetNumber>
            <span>{data && 5 - data.length}</span>개의 행성을 더 운영할 수 있습니다.
          </S.MyPlanetNumber>
          <Link href="/create-planet">
            <S.MakePlanetBtn>새 행성 만들기</S.MakePlanetBtn>
          </Link>
        </S.NewPlanet>
      </S.MyPlanetInfo>
      <S.MyPlanetWrap>
        {myPlanet.map((planet, idx) =>
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
          {/* 여행중인행성데이터가 추가되면 수정예정 */}총 <span>{data?.length}</span>개의 행성
        </S.TravelNumber>
      </S.TravelingPlanetInfo>
      <S.TravelingPlanetWrap>
        {data && data.map((planet, idx) => <TravelingPlanet key={idx} data={planet} />)}
      </S.TravelingPlanetWrap>
    </S.Container>
  );
}
