import axiosRequest from "@/api";
import { ResData, ViewCount } from "@/@types";

import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { selectedDateState } from "@/recoil/atoms/chart.atom";

import Chart from "../Chart";

import { getDateFormatWithDay } from "@/utils/getDateFormat";

const DailyViewChart = () => {
  const today = new Date();
  const dayLimit = 20;

  const [startDate, setStartDate] = useState<Date>(today); //이전 버튼 클릭 시 20일 전으로 변경
  const [Dates, setDates] = useState<string[]>([]); //x축 : 날짜(local) 배열
  const [selectedDate, setSelectedDate] = useRecoilState(selectedDateState); //bar 클릭 시 선택된 날짜

  const [viewCount, setViewCount] = useState<number[]>([]);
  const [viewData, setViewData] = useState<ViewCount[]>([]); //조회된 방문수 데이터

  //Chart props
  const series = {
    name: "일간 방문수",
    data: viewCount,
  };

  const handleBarClick = (event, chartContext, config) => {
    const xaxis = config.dataPointIndex;
    setSelectedDate(Dates[xaxis]);
  };

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
  }, []);

  useEffect(() => {
    calDate(startDate);
  }, [startDate]);

  useEffect(() => {
    const ViewCount = Dates.map(date => {
      const matchingData = viewData.find(data => getDateFormatWithDay(data.date) === date);
      return !!matchingData ? matchingData._sum.count : 0;
    });

    setViewCount(ViewCount);
    // console.log("Dates", Dates);
    // console.log("ViewCount", ViewCount);
  }, [viewData]);

  //방문수 조회
  async function getViewData(planetId: number) {
    try {
      const response = await axiosRequest.requestAxios<ResData<ViewCount[]>>(
        "get",
        `/planet/${planetId}/daily-views?page=1`,
      );
      setViewData(response.data);
      console.log("viewcount", response.data);
    } catch (error) {
      alert("행성 방문수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
      console.error("Error fetching planet visitation data: ", error);
    }
  }
  useEffect(() => {
    getViewData(6);
  }, []);

  return <Chart series={series} period={Dates} handleBarClick={handleBarClick} />;
};
export default DailyViewChart;
