import React from "react";
import { IuiOnePlayerReportData } from "../../interfaces/IuiReports";

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
import { colorize } from "../../common/commonFunctions";

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

const OnePlayerStatsPerOpponents = ({gameReportData}: IProps) => {
  const getPlayerColors = () => {
    const colorArr: string[] = [];
    const opponents = getLabels();
    opponents.forEach(opponent => {
      colorArr.push(colorize(opponent));
    });
    return colorArr;
  };

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    if (!gameReportData) return dataSetsData;
    console.log(gameReportData);

    const {gamesData} = gameReportData;
    const opponents = getLabels();
    const inGamesArr: number[] = [];
    opponents.forEach(opponent => {
      const inGames = gamesData.filter(game => game.opponents.some(opponentInGame => opponentInGame === opponent)).length;
      console.log(opponent, inGames);
      inGamesArr.push(inGames);
    });

    const label = "Opponent in games";
    dataSetsData.push({
      type: "bar",
      label: label,
      data: inGamesArr,
      backgroundColor: getPlayerColors(),
      yAxisID: "y",
      // backgroundColor: basicColor,
      borderColor: "darkgrey",
      borderWidth: 2,
      hoverBorderWidth: 3,
    } as ChartDataset<"bar">);

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
        max: gameReportData?.gamesData.length ?? 0,
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
        display: true,
        text: `Player Report - ${gameReportData?.playerName}`
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
    },
  };

  const getLabels = () => {
    const playersArr = gameReportData?.gamesData.flatMap(data => data.opponents) ?? [];
    const distinctPlayersArr = Array.from(new Set( [...playersArr] ));
    return distinctPlayersArr.sort((a: string, b: string) => a.localeCompare(b));
  };

  const chartData: ChartData<"bar"> = {
    labels: getLabels(),
    datasets: getDataSetsData(),
  };

  return (
    <React.Fragment>
      <div style={{height: "25vh"}}>
        <Bar
          data={chartData}
          options={chartOptions}
        />
      </div>

    </React.Fragment>
  );
};

export default OnePlayerStatsPerOpponents;
