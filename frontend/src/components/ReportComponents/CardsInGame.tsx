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

const CardsInGame = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "Trumps",
      data: gameReportData?.trumps ?? [],
      borderWidth: 1,
      backgroundColor: "rgba(255,153,0,0.6)",
    });
    dataSetsData.push({
      label: "Big Cards",
      data: gameReportData?.bigCards ?? [],
      borderWidth: 1,
      backgroundColor: "lightgreen",
    });
    dataSetsData.push({
      label: "Small Cards",
      data: gameReportData?.smallCards ?? [],
      borderWidth: 1,
      backgroundColor: "lightblue",
    });
    dataSetsData.push({
      label: "Other Cards",
      data: gameReportData?.otherCards ?? [],
      borderWidth: 1,
      backgroundColor: "lightyellow",
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
        max: (gameReportData?.bigCards[0] ?? 0)+(gameReportData?.smallCards[0] ?? 0)+(gameReportData?.otherCards[0] ?? 0)+(gameReportData?.trumps[0] ?? 0),
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Cards in game by nickname"
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

export default CardsInGame;
