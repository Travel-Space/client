import axiosRequest from "@/api/index";
import { ResData, JoinedPlanets, Planet } from "@/@types";

import { useState, useEffect, useRef } from "react";

import * as S from "./index.styled";

import PlanetItem from "@/components/User/PlanetItem";
import useInfiniteScroll from "@/hooks/useInfiniteScroll";
import Nothing from "@/components/common/Nothing";
import MESSAGE from "@/constants/message";

const Planets = ({ id }: { id: number }) => {
  const [planets, setPlanets] = useState<Planet[]>([]);
  const [totalCount, setTotalCount] = useState(0);

  const [page, setPage] = useState(1);
  const [disableLoadData, setDisableLoadDate] = useState(false);

  //여행중인 행성 불러오기
  async function getPlanets() {
    try {
      const response = await axiosRequest.requestAxios<ResData<JoinedPlanets>>(
        "get",
        `/planet/other/${id}/memberships?page=${page}&limit=10`,
      );
      const planets = response.data.data;
      const totalCount = response.data.totalMemberships;

      if (!planets.length) {
        setDisableLoadDate(true);
        return;
      }

      setPlanets(prev => [...prev, ...planets]);
      setPage(prev => prev + 1);
      setTotalCount(totalCount);
    } catch (error) {
      console.error("행성 정보를 가져오는중 에러가 발생했습니다.", error);
      alert(MESSAGE.ERROR.DEFAULT);
    }
  }

  const loadData = () => {
    if (disableLoadData) return;
    getPlanets();
  };

  const { setTargetRef } = useInfiniteScroll(loadData, [page]);

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      setTargetRef(observerRef);
    }
  }, [observerRef, setTargetRef]);

  useEffect(() => {
    getPlanets();
    // console.log("planets", planets);
  }, []);

  return (
    <S.Container>
      {!!totalCount ? (
        <>
          <S.Number>
            총 <span>{totalCount}</span>개의 게시글
          </S.Number>
          <S.Content>
            {planets.map((planet, idx) => (
              <PlanetItem key={`user-planet${idx}`} data={planet} userId={id} />
            ))}
          </S.Content>
        </>
      ) : (
        <Nothing
          src="/assets/img/icons/no-planets.svg"
          alt="no-TravelingPlanets"
          width={148}
          height={148}
          comment="여행 중인 행성이 없습니다."
          font="lg"
        />
      )}
      <S.InfiniteScrollTarget ref={observerRef} />
    </S.Container>
  );
};

export default Planets;
