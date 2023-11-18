import axiosRequest from "@/api";
import { ResData, DailyViewCount } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "@/recoil/atoms/chart.atom";
import { todayViewCountState } from "@/recoil/atoms/planets.atom";

import * as S from "./index.styled";

import Chart from "../Chart";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

const DailyViewChart = ({ planetId }: { planetId: number }) => {
  const [page, setPage] = useState(1);
  const [isClicked, setIsClicked] = useState("");

  const today = new Date();
  const dayLimit = 20;

  const [startDate, setStartDate] = useState<Date>(today); //이전 버튼 클릭 시 20일 전으로 변경
  const [Dates, setDates] = useState<string[]>([]); //x축 : 날짜(local) 배열
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState); //bar 클릭 시 선택된 날짜

  const [todayViewCount, setTodayViewCount] = useRecoilState(todayViewCountState);
  const [viewCount, setViewCount] = useState<number[]>([]);
  const [viewData, setViewData] = useState<DailyViewCount[]>([]); //조회된 방문 수 데이터

  //Chart props
  const series = {
    name: "일간 방문 수",
    data: viewCount,
  };

  const handleBarClick = (event: MouseEvent, chartContext: any, config: { dataPointIndex: number }) => {
    const xaxis = config.dataPointIndex;
    setSelectedDate(Dates[xaxis]);
  };

  //페이지 이동
  const goPrevPage = () => {
    setPage(prev => prev + 1);
    setIsClicked("prev");
  };
  const goNextPage = () => {
    setPage(prev => prev - 1);
    setIsClicked("next");
  };
  useEffect(() => {
    const date = new Date(startDate);
    isClicked === "prev" && date.setDate(startDate.getDate() - dayLimit);
    isClicked === "next" && date.setDate(startDate.getDate() + dayLimit);
    setStartDate(date);
    // console.log("page", page);
  }, [page]);

  //시작일 ~ 20일 전 날짜 계산
  const calDate = (startDate: Date) => {
    const Dates = Array(dayLimit).fill(null);
    const newDates = Dates.map((_, idx) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - idx);
      return getDateFormatWithDay(date);
    });
    setDates(newDates.reverse());
  };

  useEffect(() => {
    setStartDate(today);
    setSelectedDate(getDateFormatWithDay(startDate));
    getViewData();
  }, []);

  useEffect(() => {
    calDate(startDate);
    setSelectedDate(getDateFormatWithDay(startDate));
  }, [startDate]);

  useEffect(() => {
    getViewData();
  }, [Dates]);

  useEffect(() => {
    const DailyViewCount = Dates.map(date => {
      const matchingData = viewData.find(data => getDateFormatWithDay(data.date) === date);
      return !!matchingData ? matchingData.count : 0;
    });

    setViewCount(DailyViewCount);
    page === 1 && setTodayViewCount(DailyViewCount[DailyViewCount.length - 1]);
    // console.log("Dates", Dates);
    // console.log("DailyViewCount", DailyViewCount);
  }, [viewData]);

  useEffect(() => {
    getViewData();
  }, [planetId]);

  //방문 수 조회
  const getViewData = async () => {
    try {
      const response = await axiosRequest.requestAxios<ResData<DailyViewCount[]>>(
        "get",
        `/planet/${planetId}/daily-views?page=${page}`,
      );
      setViewData(response.data);
      // console.log("viewcount", response.data);
    } catch (error) {
      alert("행성 방문 수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet visitation data: ", error);
    }
  };

  return (
    <S.Container>
      <S.PrevPageBtn onClick={goPrevPage} />
      <Chart series={series} period={Dates} handleBarClick={handleBarClick} />
      <S.NextPageBtn onClick={goNextPage} disabled={page === 1} />
    </S.Container>
  );
};

export default DailyViewChart;
