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

const KeepsInGame = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "Big rounds",
      data: gameReportData?.keepsBig ?? [],
      borderWidth: 1,
      backgroundColor: "rgba(255,153,0,0.6)",
    });
    dataSetsData.push({
      label: "Small rounds",
      data: gameReportData?.keepsSmall ?? [],
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
        stacked: true,
        max: (gameReportData?.rounds.length ?? 19) -1,
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Keeps in game by nickname"
      },
      tooltip: {
        callbacks: {
          footer: (tooltipItem) => {
            const chart = chartRef.current;
            let total = 0;
            if (chart) {
              for (let i = 0; i < chart.data.datasets.length; i++) {
                total += chart.data.datasets[i].data[tooltipItem[0].dataIndex] as number;
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

export default KeepsInGame;
