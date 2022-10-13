import React, { useEffect, useRef } from "react";
import { IuiOnePlayerReportData, PlayerCountColor } from "../../interfaces/IuiReports";

import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  ChartDataset,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  BarController,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { increase_brightness } from "../../common/commonFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  Title,
  Legend,
  Tooltip,
  BarController,
);

interface IProps {
  gameReportData?: IuiOnePlayerReportData,
}

const OnePlayerStatsPerPlayers = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"bar">>(null);
  const legendHoverIndex = useRef(-1);
  const accentColors = useRef<string[]>([]);
  const accentFadedColors = useRef<string[]>([]);
  const playedGamesCount = useRef<number[]>([]);

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.canvas.addEventListener("mousemove", (e: MouseEvent) => {
        if (legendHoverIndex.current !== -1 && chart.legend) {
          if (e.offsetX < chart.legend.left || chart.legend.right < e.offsetX || e.offsetY < chart.legend.top || chart.legend.bottom < e.offsetY) {
            for (let i = 0; i < chart.data.datasets.length; i++) {
              const dataset = chart.data.datasets[i];
              dataset.borderColor = accentColors.current[i];
            }
            chart.update();
            legendHoverIndex.current = -1;
          }
        }
      });
    }
  }, []);

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    if (!gameReportData) return dataSetsData;

    const {gamesData} = gameReportData;
    const threeData = gamesData.filter(data => data.playersInGame === 3);
    const fourData = gamesData.filter(data => data.playersInGame === 4);
    const fiveData = gamesData.filter(data => data.playersInGame === 5);
    const sixData = gamesData.filter(data => data.playersInGame === 6);

    playedGamesCount.current.push(threeData.length);
    playedGamesCount.current.push(fourData.length);
    playedGamesCount.current.push(fiveData.length);
    playedGamesCount.current.push(sixData.length);

    let label = "3 player";
    let basicColor = PlayerCountColor[3];
    dataSetsData.push({
      type: "bar",
      label: label,
      data: [
        100 * threeData.length / gamesData.length,
        threeData.reduce((count, data) => {
          return count + data.keepP;
        }, 0) / threeData.length,
        100 * threeData.reduce((count, data) => {
          return count + data.scorePoints;
        }, 0) / threeData.length,
        threeData.reduce((count, data) => {
          return count + data.pOfWinPoints;
        }, 0) / threeData.length,
      ],
      yAxisID: "y",
      borderColor: basicColor,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
    } as ChartDataset<"bar">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

    label = "4 player";
    basicColor = PlayerCountColor[4];
    dataSetsData.push({
      type: "bar",
      label: label,
      data: [
        100 * fourData.length / gamesData.length,
        fourData.reduce((count, data) => {
          return count + data.keepP;
        }, 0) / fourData.length,
        100 * fourData.reduce((count, data) => {
          return count + data.scorePoints;
        }, 0) / fourData.length,
        fourData.reduce((count, data) => {
          return count + data.pOfWinPoints;
        }, 0) / fourData.length,
      ],
      yAxisID: "y",
      borderColor: basicColor,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
    } as ChartDataset<"bar">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

    label = "5 player";
    basicColor = PlayerCountColor[5];
    dataSetsData.push({
      type: "bar",
      label: label,
      data: [
        100 * fiveData.length / gamesData.length,
        fiveData.reduce((count, data) => {
          return count + data.keepP;
        }, 0) / fiveData.length,
        100 * fiveData.reduce((count, data) => {
          return count + data.scorePoints;
        }, 0) / fiveData.length,
        fiveData.reduce((count, data) => {
          return count + data.pOfWinPoints;
        }, 0) / fiveData.length,
      ],
      yAxisID: "y",
      borderColor: basicColor,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
    } as ChartDataset<"bar">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

    label = "6 player";
    basicColor = PlayerCountColor[6];
    dataSetsData.push({
      type: "bar",
      label: label,
      data: [
        100 * sixData.length / gamesData.length,
        sixData.reduce((count, data) => {
          return count + data.keepP;
        }, 0) / sixData.length,
        100 * sixData.reduce((count, data) => {
          return count + data.scorePoints;
        }, 0) / sixData.length,
        sixData.reduce((count, data) => {
          return count + data.pOfWinPoints;
        }, 0) / sixData.length,
      ],
      yAxisID: "y",
      borderColor: basicColor,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
    } as ChartDataset<"bar">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

    return dataSetsData;
  };

  const chartOptions: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "category",
        ticks: {
          includeBounds: true,
        }
      },
      y: {
        type: "linear",
        display: true,
        min: 0,
        max: 100,
        position: "left",
        reverse: false,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    plugins: {
      title: {
        display: false,
        text: `Player Report - ${gameReportData?.playerName}`
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: ({dataIndex, datasetIndex, formattedValue, dataset, parsed}) => {
            const label = dataset.label || "";
            switch (dataIndex) {
              case 0: {
                const playedGames = playedGamesCount.current[datasetIndex] ?? 0;
                return `${label}: ${(parsed.y ?? 0).toFixed(1)}%, (${playedGames} games)`; // games
              }
              case 1: return `${label}: ${(parsed.y ?? 0).toFixed(1)}%`; // avg keep %
              case 2: return `${label}: ${((parsed.y ?? 0)/100).toFixed(3)}`; // avg score points
              case 3: return `${label}: ${(parsed.y ?? 0).toFixed(1)}%`; // avg % of winning points
            }
            return `${label}: ${formattedValue}`;
          },
        }
      },
      legend: {
        position: "bottom",
        onHover: (e, legendItem) => {
          if (legendHoverIndex.current !== legendItem.datasetIndex) {
            const chart = chartRef.current;
            if (chart) {
              for (let i = 0; i < chart.data.datasets.length; i++) {
                const dataset = chart.data.datasets[i];
                if (i === legendItem.datasetIndex) {
                  dataset.borderColor = accentColors.current[i];
                } else {
                  dataset.borderColor = accentFadedColors.current[i];
                }
              }
              chart.update();
            }
            legendHoverIndex.current = legendItem.datasetIndex !== undefined ? legendItem.datasetIndex : -1;
          }
        },
      },
    },
  };

  const chartData: ChartData<"bar"> = {
    labels: [
      "games distribution",
      "avg keep %",
      "avg score points",
      "avg % of winning points",
    ],
    datasets: getDataSetsData(),
  };

  return (
    <React.Fragment>
      <div style={{height: "25vh"}}>
        <Bar
          ref={chartRef}
          data={chartData}
          options={chartOptions}
        />
      </div>

    </React.Fragment>
  );
};

export default OnePlayerStatsPerPlayers;
