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

const TimesUsedInGame = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);

  const msToHMS = (ms: number): string => {
    // 1- Convert to seconds:
    let seconds = Math.floor(ms / 1000);
    // 2- Extract hours:
    const hours = Math.floor(seconds/3600); // 3,600 seconds in 1 hour
    seconds = seconds % 3600; // seconds remaining after extracting hours
    // 3- Extract minutes:
    const minutes = Math.floor(seconds/60); // 60 seconds in 1 minute
    // 4- Keep only seconds not extracted to minutes:
    seconds = seconds % 60;
    const minStr = ("00"+minutes).slice(-2);
    const secStr = ("00"+seconds).slice(-2);

    return hours > 0 ? `${hours}:${minStr}:${secStr}` : `${minStr}:${secStr}`;
  };

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    dataSetsData.push({
      label: "Hit Time",
      data: gameReportData?.playTimes ?? [],
      borderWidth: 1,
      backgroundColor: "rgba(255,153,0,0.6)",
    });
    dataSetsData.push({
      label: "Promise Time",
      data: gameReportData?.promiseTimes ?? [],
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
        // max: Math.max(...reportObject.timesUsed.map(v => parseInt(v.totalPromiseTime, 10) + parseInt(v.totalPlayTime, 10))),
        min: 0,
      },
      y: {
        stacked: true,
      },
    },
    plugins: {
      title: {
        display: true,
        text: "Used time in game by nickname"
      },
      tooltip: {
        callbacks: {
          footer: function(tooltipItem) {
            const chart = chartRef.current;
            let total = 0;
            if (chart) {
              for (let i = 0; i < chart.data.datasets.length; i++) {
                total += chart.data.datasets[i].data[tooltipItem[0].dataIndex];
              }
            }
            return "TOTAL: "+msToHMS(total);
          },
          label: function(context) {
            return " "+context.dataset.label+": "+msToHMS(parseInt((context.raw) as string, 10));
          },
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

export default TimesUsedInGame;
