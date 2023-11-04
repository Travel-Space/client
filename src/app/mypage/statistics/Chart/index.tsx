import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

import axiosRequest from "@/api";
import { ResData, ViewCount } from "@/@types";

import { useState, useEffect } from "react";

import { getDateInfo } from "@/utils/getDateInfo";
import getDateFormat from "@/utils/getDateFormat";

// const { dateString } = getDateInfo(date);

const Chart = () => {
  //   const [viewData, setViewData] = useState<ViewCount[]>();
  const today = new Date();

  const [startDate, setStartDate] = useState<Date>(today);

  const [Dates, setDates] = useState<string[]>([]);
  //시작일 ~ 20일 전 날짜 계산
  const calDate = (startDate: Date) => {
    const dayNumber = 20;
    const DatesArray = Array(dayNumber).fill(null);
    const newDates = DatesArray.map((_, idx) => {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() - idx);
      return getDateFormat(date);
    });
    setDates(newDates.reverse());
  };

  useEffect(() => {
    setStartDate(today);
  }, []);

  useEffect(() => {
    calDate(startDate);
  }, [startDate]);

  //   //방문수 조회
  //   async function getViewData(planetId: number) {
  //     try {
  //       const response = await axiosRequest.requestAxios<ResData<ViewCount[]>>(
  //         "get",
  //         `/planet/${planetId}/daily-views?page=1`,
  //       );
  //       setViewData(response.data);
  //       console.log("viewcount", response.data);
  //     } catch (error) {
  //       alert("행성 방문수 정보를 가져오는중 에러가 발생했습니다. 다시 시도해주세요.");
  //       console.error("Error fetching view planet data: ", error);
  //     }
  //   }
  //   useEffect(() => {
  //     getViewData(4);
  //   }, []);

  const options: ApexOptions = {
    series: [
      {
        name: "일간 방문수 ",
        data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2, 4.0, 3.6, 3.2, 2.3, 1.4, 0.8, 0.5, 0.2],
      },
    ],
    chart: {
      height: 350,
      type: "bar",
      zoom: {
        enabled: false, // 확대 및 축소 비활성화
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 8,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: number) {
        return val;
      },
      offsetY: -20,
      style: {
        fontSize: "12px",
        colors: ["#304758"],
      },
    },

    xaxis: {
      categories: [...Dates.map(el => el.split("-")[2])],
      position: "bottom",
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        fill: {
          type: "gradient",
          gradient: {
            colorFrom: "#D8E3F0",
            colorTo: "#BED1E6",
            stops: [0, 100],
            opacityFrom: 0.4,
            opacityTo: 0.5,
          },
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      labels: {
        show: false,
        formatter: function (val: number) {
          return val + "%";
        },
      },
    },
  };

  return <ApexChart options={options} series={options.series} type="bar" />;
};
export default Chart;
