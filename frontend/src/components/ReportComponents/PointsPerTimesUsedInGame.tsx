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
  Legend,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
);

interface IProps {
  gameReportData?: IuiOneGameReport,
}

const PointsPerTimesUsedInGame = ({gameReportData}: IProps) => {
  console.log(gameReportData);
  const chartRef = useRef<ChartJS<"bar">>(null);

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "Points per Hit Time",
      data: gameReportData?.playTimes?.map((time, ind) => {
        const totalPoints = (gameReportData.pointsBig.at(ind) ?? 0) + (gameReportData.pointsSmall.at(ind) ?? 0);
        return totalPoints / (time/1000);
      }) ?? [],
      borderWidth: 1,
      backgroundColor: "rgba(255,153,0,0.6)",
    });
    dataSetsData.push({
      label: "Points per Promise Time",
      data: gameReportData?.promiseTimes?.map((time, ind) => {
        const totalPoints = (gameReportData.pointsBig.at(ind) ?? 0) + (gameReportData.pointsSmall.at(ind) ?? 0);
        return totalPoints / (time/1000);
      }) ?? [],
      borderWidth: 1,
      backgroundColor: "lightgreen",
    });
    return dataSetsData;
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: "y",
    scales: {
      x: {
        stacked: false,
        // max: Math.max(...reportObject.timesUsed.map(v => parseInt(v.totalPromiseTime, 10) + parseInt(v.totalPlayTime, 10))),
        min: 0,
        display: true,
      },
      y: {
        stacked: false,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Points per used time in game by nickname"
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.parsed.x.toFixed(2)} points per second`;
          },
        }
      },
    }
  };

  const chartData: ChartData<"bar"> = {
    labels: gameReportData?.players,
    datasets: getDataSetsData(),
  };

  if ((gameReportData?.playTimes?.at(0) ?? 0) === 0) return null;

  return (
    <div style={{height: "330px"}}>
      <Bar
        ref={chartRef}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default PointsPerTimesUsedInGame;
