import ApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

interface ChartProps {
  series: { name: string; data: number[] };
  period: string[];
  handleBarClick: (event, chartContext, config) => void;
}

const Chart = ({ series, period, handleBarClick }: ChartProps) => {
  const options: ApexOptions = {
    series: [
      {
        name: series.name,
        data: series.data,
      },
    ],
    chart: {
      height: "auto",
      type: "bar",
      zoom: {
        enabled: false, // 확대 및 축소 비활성화
      },
      events: {
        dataPointSelection: handleBarClick,
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
        dataLabels: {
          position: "top", // top, center, bottom
        },
      },
    },
    dataLabels: {
      enabled: false,
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
      categories: [...period.map(date => date.slice(8, 10))],
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
          return val;
        },
      },
    },
  };

  return <ApexChart options={options} series={options.series} type="bar" width="100%" height="310" />;
};
export default Chart;
