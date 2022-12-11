import React, { useRef } from "react";
import { IuiOneGameReport } from "../../interfaces/IuiReports";

import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  ChartDataset,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
);

interface IProps {
  gameReportData?: IuiOneGameReport,
}

const PointsInGame = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const evenBreakingPointsPerPlayer = () => {
    const pointsArr: number[] = [];
    gameReportData?.evenBreakingPointsPerRound.forEach(arr => {
      pointsArr.push(arr.reduce((count, val) => {return count + val;}, 0));
    });
    return pointsArr;
  };

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "Big rounds",
      data: gameReportData?.pointsBig ?? [],
      borderWidth: 1,
      backgroundColor: "rgba(255,153,0,0.6)",
      stack: "stack 0",
    });
    dataSetsData.push({
      label: "Small rounds",
      data: gameReportData?.pointsSmall ?? [],
      borderWidth: 1,
      backgroundColor: "lightgreen",
      stack: "stack 0",
    });
    dataSetsData.push({
      label: "Bonus points",
      data: evenBreakingPointsPerPlayer(),
      borderWidth: 1,
      backgroundColor: "lightblue",
      stack: "stack 1",
    });
    return dataSetsData;
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        stacked: true,
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Points in game by nickname"
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItem) => {
            const chart = chartRef.current;
            let total = 0;
            if (chart) {
              for (let i = 0; i < chart.data.datasets.length; i++) {
                if (chart.data.datasets[i].stack === "stack 0") {
                  total += chart.data.datasets[i].data[tooltipItem[0].dataIndex] as number;
                }
              }
            }
            return "TOTAL: "+total;
          }
        }
      },
    }
  };

  const chartData: ChartData<"bar"> = {
    labels: gameReportData?.players,
    datasets: getDataSetsData(),
  };

  return (
    <div style={{height: "230px"}}>
      <Bar
        ref={chartRef}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default PointsInGame;
