import axiosRequest from "@/api";
import { ResData, WeeklyViewCount } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedWeekState } from "@/recoil/atoms/chart.atom";

import * as S from "./index.styled";

import Chart from "../Chart";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

const DailyViewChart = () => {
  const [page, setPage] = useState(1);
  // const [isClicked, setIsClicked] = useState("");

  const today = new Date();
  const thisEndDate = new Date(today);
  thisEndDate.setDate(thisEndDate.getDate() - 7);

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

  // //페이지 이동
  // const goPrevPage = () => {
  //   setPage(prev => prev + 1);
  //   setIsClicked("prev");
  // };
  // const goNextPage = () => {
  //   setPage(prev => prev - 1);
  //   setIsClicked("next");
  // };
  // useEffect(() => {
  //   const date = new Date(startDate);
  //   isClicked === "prev" && date.setDate(startDate.getDate() - dayLimit);
  //   isClicked === "next" && date.setDate(startDate.getDate() + dayLimit);
  //   setStartDate(date);
  //   // console.log("page", page);
  // }, [page]);

  useEffect(() => {
    getViewData(6);

    const start = getDateFormatWithDay(today);
    const end = getDateFormatWithDay(thisEndDate);
    setSelectedWeek(formatPeriod(start, end));
  }, []);

  // useEffect(() => {
  //   calDate(startDate);
  //   setSelectedDate(getDateFormatWithDay(startDate));
  // }, [startDate]);

  // useEffect(() => {
  //   getViewData(6);
  // }, [Dates]);

  useEffect(() => {
    const startDates = viewData.map(el => getDateFormatWithDay(el.start));
    const endDates = viewData.map(el => getDateFormatWithDay(el.end));
    const count = viewData.map(el => el.count);

    setstartDates(startDates);
    setEndDates(endDates);
    setViewCount(count);

    // console.log("startDates", startDates);
    // console.log("endDates", endDates);
    // console.log("count", count);
  }, [viewData]);

  //방문수 조회
  async function getViewData(planetId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<WeeklyViewCount[]>>(
        "get",
        `/planet/${planetId}/weekly-views?page=${page}`,
      );
      setViewData(response.data);
      console.log("viewcount", response.data);
    } catch (error) {
      alert("행성 방문수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet visitation data: ", error);
    }
  }

  return (
    <S.Container>
      {/* <S.PrevPageBtn onClick={goPrevPage} /> */}
      <Chart series={series} period={startDates} handleBarClick={handleBarClick} />
      {/* <S.NextPageBtn onClick={goNextPage} disabled={page === 1} /> */}
    </S.Container>
  );
};
export default DailyViewChart;
