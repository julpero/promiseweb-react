import React from "react";

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
import { IuiPlayersInGameReport } from "../../interfaces/IuiGameReports";
import { PlayerCountColor } from "../../interfaces/IuiReports";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
);

interface IProps {
  gameReportData?: IuiPlayersInGameReport[],
  max: number,
}

const PlayedGamesByPlayerCount = ({gameReportData, max}: IProps) => {
  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "three player games",
      data: [gameReportData?.find(data => data.playersInGame === 3)?.count ?? 0],
      borderWidth: 1,
      backgroundColor: PlayerCountColor[3],
    });
    dataSetsData.push({
      label: "four player games",
      data: [gameReportData?.find(data => data.playersInGame === 4)?.count ?? 0],
      borderWidth: 1,
      backgroundColor: PlayerCountColor[4],
    });
    dataSetsData.push({
      label: "five player games",
      data: [gameReportData?.find(data => data.playersInGame === 5)?.count ?? 0],
      borderWidth: 1,
      backgroundColor: PlayerCountColor[5],
    });
    dataSetsData.push({
      label: "six player games",
      data: [gameReportData?.find(data => data.playersInGame === 6)?.count ?? 0],
      borderWidth: 1,
      backgroundColor: PlayerCountColor[6],
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
        max: max,
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: false,
      },
    }
  };

  const chartData: ChartData<"bar"> = {
    labels: [""],
    datasets: getDataSetsData(),
  };

  return (
    <div style={{height: "100px", marginTop: "10px"}}>
      <Bar
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default PlayedGamesByPlayerCount;
