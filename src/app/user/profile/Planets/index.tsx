import axiosRequest from "@/api/index";
import { ResData, JoinedPlanets, Planet, PlanetsType } from "@/@types";

import { useState, useEffect, useRef } from "react";

import * as S from "./index.styled";

import PlanetItem from "@/components/common/User/PlanetItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Nothing from "@/components/common/Nothing";
import MESSAGE from "@/constants/message";
import MyPlanetItem from "@/components/common/User/MyPlanetItem";

export default function Planets({ id }: { id: number }) {
  const [userPlanets, setUserPlanets] = useState<Planet[]>([]);
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadDate] = useState(false);

  //소유 행성 조회
  const getUserPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<PlanetsType>>(
        "get",
        `/planet/other/${id}/ownerships?page=1&limit=5`,
      );
      const planets = response.data.data;

      setUserPlanets(planets);
    } catch (error) {
      console.error("행성 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };
  //여행중인 행성 조회
  const getPlanets = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<JoinedPlanets>>(
        "get",
        `/planet/other/${id}/memberships?page=${page}&limit=10`,
      );
      const planets = response.data.data;
      const totalCount = response.data.totalMemberships;
      setTotalCount(totalCount);

      if (!planets.length) {
        setDisableLoadDate(true);
        return;
      }

      if (page === 1) setPlanets(planets);
      else setPlanets(prev => [...prev, ...planets]);

      setPage(prev => prev + 1);
    } catch (error) {
      console.error("행성 정보를 가져오는 중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  };

  useEffect(() => {
    getPlanets();
    getUserPlanets();
    // console.log("planets", planets);
  }, []);

  //무한스크롤
  const observerRef = useRef<HTMLDivElement | null>(null);

  const loadData = () => {
    if (disableLoadData) return;
    getPlanets();
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page]);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  return (
    <S.Container>
      <S.UserPlanets>
        <S.Title>소유 행성</S.Title>
        {!!userPlanets.length ? (
          <S.Planets>
            {userPlanets.map((planet, idx) => (
              <MyPlanetItem key={idx} data={planet} />
            ))}
          </S.Planets>
        ) : (
          <S.NoMyPlanets>소유하는 행성이 없습니다.</S.NoMyPlanets>
        )}
      </S.UserPlanets>
      <S.Header>
        <S.Title>여행 중인 행성</S.Title>
        <S.Number>
          총 <span>{totalCount}</span>개의 행성
        </S.Number>
      </S.Header>
      {!!totalCount ? (
        <S.Content>
          {planets.map((planet, idx) => (
            <PlanetItem key={`user-planet${idx}`} data={planet} userId={id} />
          ))}
        </S.Content>
      ) : (
        <S.Content>
          <Nothing
            src="/assets/img/icons/no-planets.svg"
            alt="no-TravelingPlanets"
            width={148}
            height={148}
            comment="여행 중인 행성이 없습니다."
            font="lg"
          />
        </S.Content>
      )}
      <S.InfiniteScrollTarget ref={observerRef} />
    </S.Container>
  );
}
