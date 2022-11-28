import React from "react";

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
import { HIDDEN_CARDS_MODE, RULE } from "../../interfaces/IuiGameOptions";
import { hiddenCardsModeToStr, ruleToStr } from "../../common/enumFunctions";
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
  usedRulesCount: Map<RULE, number>,
  hiddenCardsModeCount: Map<HIDDEN_CARDS_MODE, number>,
  vanillaGamesCount?: number,
}

const UsedRulesGraph = ({usedRulesCount, hiddenCardsModeCount, vanillaGamesCount}: IProps) => {
  const dataArr = (): number[] => {
    const arr: number[] = [];
    if (usedRulesCount) {
      const rules = Object.values(RULE).filter((v) => !isNaN(Number(v))) as RULE[];
      rules.forEach(rule => {
        const val = usedRulesCount.get(rule);
        if (val !== undefined) arr.push(val);
      });
    }
    if (hiddenCardsModeCount) {
      const hiddenCards = Object.values(HIDDEN_CARDS_MODE).filter((v) => !isNaN(Number(v))) as HIDDEN_CARDS_MODE[];
      hiddenCards.forEach(rule => {
        const val = hiddenCardsModeCount.get(rule);
        if (val !== undefined) arr.push(val);
      });
    }
    return arr;
  };

  const getRulesColors = () => {
    const colorArr: string[] = [];
    const opponents = getLabels();
    opponents.forEach(opponent => {
      colorArr.push(colorize(opponent));
    });
    return colorArr;
  };

  const getDataSetsData = (): ChartDataset<"bar">[] => {
    const dataSetsData: ChartDataset<"bar">[] = [];
    if (!usedRulesCount) return dataSetsData;
    // console.log("usedRulesCount", usedRulesCount);
    // console.log("hiddenCardsModeCount", hiddenCardsModeCount);

    const inGamesArr = dataArr();
    // console.log("inGamesArr", inGamesArr);

    const label = "Rule used in games";
    dataSetsData.push({
      type: "bar",
      label: label,
      data: inGamesArr,
      backgroundColor: getRulesColors(),
      yAxisID: "y",
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
        // max: gameReportData?.gamesData.length ?? 0,
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
        display: vanillaGamesCount !== undefined,
        text: `Vanilla games: ${vanillaGamesCount}`
      },
      tooltip: {
        mode: "index",
        intersect: false,
      },
      legend: {
        display: false,
      },
    },
  };

  const getLabels = () => {
    const rules = [
      ...Array.from(usedRulesCount.keys()).sort((a: RULE, b: RULE) => a - b).map(key => ruleToStr(key)),
      ...Array.from(hiddenCardsModeCount.keys()).sort((a: HIDDEN_CARDS_MODE, b: HIDDEN_CARDS_MODE) => a - b).map(key => hiddenCardsModeToStr(key))
    ];
    return rules;
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

export default UsedRulesGraph;
