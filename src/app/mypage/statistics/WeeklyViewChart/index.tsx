import axiosRequest from "@/api";
import { ResData, WeeklyViewCount } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedWeekState } from "@/recoil/atoms/chart.atom";

import * as S from "./index.styled";

import Chart from "../Chart";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

const DailyViewChart = ({ planetId }: { planetId: number }) => {
  const [page, setPage] = useState(1);

  const today = new Date();
  const currentDay = today.getDay();
  const thisfirstDate = new Date(today);
  thisfirstDate.setDate(today.getDate() - currentDay);

  const [startDates, setstartDates] = useState<string[]>([]); //주의 시작 날짜 배열
  const [endDates, setEndDates] = useState<string[]>([]); //주의 마지막 날짜 배열
  const [selectedWeek, setSelectedWeek] = useRecoilState(selectedWeekState); //bar 클릭 시 선택된 주

  const [viewCount, setViewCount] = useState<number[]>([]);
  const [viewData, setViewData] = useState<WeeklyViewCount[]>([]); //조회된 방문수 데이터

  const formatPeriod = (start: string, end: string) => {
    return `${start} ~ ${end}`;
  };

  //Chart props
  const series = {
    name: "주간 방문수",
    data: viewCount,
  };

  const handleBarClick = (event: MouseEvent, chartContext: any, config: { dataPointIndex: number }) => {
    const xaxis = config.dataPointIndex;
    const start = startDates[xaxis];
    const end = endDates[xaxis];

    setSelectedWeek(formatPeriod(start, end));
  };

  //페이지 이동
  const goPrevPage = () => {
    setPage(prev => prev + 1);
  };
  const goNextPage = () => {
    setPage(prev => prev - 1);
  };

  useEffect(() => {
    getViewData();

    const start = getDateFormatWithDay(thisfirstDate);
    const end = getDateFormatWithDay(today);
    setSelectedWeek(formatPeriod(start, end));
  }, []);

  useEffect(() => {
    getViewData();
  }, [page]);

  useEffect(() => {
    getViewData();
  }, [planetId]);

  useEffect(() => {
    const startDates = viewData.map(el => getDateFormatWithDay(el.start));
    const endDates = viewData.map(el => getDateFormatWithDay(el.end));
    const count = viewData.map(el => el.count);

    setstartDates(startDates);
    setEndDates(endDates);
    setViewCount(count);

    const start = startDates[startDates.length - 1];
    const end = endDates[endDates.length - 1];
    setSelectedWeek(formatPeriod(start, end));

    // console.log("startDates", startDates);
    // console.log("endDates", endDates);
    // console.log("count", count);
  }, [viewData]);

  //방문수 조회
  async function getViewData() {
    try {
      const response = await axiosRequest.requestAxios<ResData<WeeklyViewCount[]>>(
        "get",
        `/planet/${planetId}/weekly-views?page=${page}`,
      );
      setViewData(response.data);
      // console.log("viewcount", response.data);
    } catch (error) {
      alert("행성 방문수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet visitation data: ", error);
    }
  }

  return (
    <S.Container>
      <S.PrevPageBtn onClick={goPrevPage} />
      <Chart series={series} period={startDates} handleBarClick={handleBarClick} />
      <S.NextPageBtn onClick={goNextPage} disabled={page === 1} />
    </S.Container>
  );
};
export default DailyViewChart;
