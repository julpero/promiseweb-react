import React, { useEffect, useRef } from "react";
import { IuiOneGameReport } from "../../interfaces/IuiReports";

import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  ChartDataset,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import annotationPlugin, { AnnotationOptions } from "chartjs-plugin-annotation";
import { colorize, increase_brightness } from "../../common/commonFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  Filler,
  annotationPlugin,
);

interface IProps {
  gameReportData?: IuiOneGameReport,
}

const CumulativePoints = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"line">>(null);
  const legendHoverIndex = useRef(-1);
  const accentColors = useRef<string[]>([]);
  const accentFadedColors = useRef<string[]>([]);

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

  const annotationBoxLimit = (ind: number): number | null => {
    if (gameReportData && gameReportData.roundType) {
      const typeArr = gameReportData.roundType.split(";");
      if (typeArr.length === 3 && parseInt(typeArr[ind], 10) > 0) return parseInt(typeArr[ind], 10);
    }
    return null;
  };

  const getDataSetsData = (): ChartDataset<"line">[] => {
    const dataSetsData: ChartDataset<"line">[] = [];
    accentColors.current = [];
    accentFadedColors.current = [];
    gameReportData?.cumulativePointsPerRound.forEach((pointArr, ind) => {
      const playerName = gameReportData.players[ind];
      const basicColor = colorize(playerName);
      dataSetsData.push({
        label: playerName,
        data: pointArr,
        fill: "origin",
        backgroundColor: "rgba(0, 0, 0, 0.06)",
        borderColor: basicColor,
        tension: 0,
        borderWidth: 3,
        hoverBorderWidth: 5,
      } as ChartDataset<"line">);
      accentColors.current.push(basicColor);
      accentFadedColors.current.push(increase_brightness(basicColor, 75));
    });
    return dataSetsData;
  };

  const annotations: AnnotationOptions[] = annotationBoxLimit(1) === null && annotationBoxLimit(2) === null ? [] : [
    {
      type: "box",
      drawTime: "beforeDatasetsDraw",
      display: true,
      xScaleID: "x",
      yScaleID: "y",
      xMin: annotationBoxLimit(1) ?? 0,
      xMax: annotationBoxLimit(2) ?? 0,
      borderColor: "lightgreen",
      borderWidth: 1,
      backgroundColor: "#E5FFE5",
    }
  ];

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          includeBounds: true,
        }
      }
    },
    hover: {
      mode: "nearest",
      intersect: true
    },
    plugins: {
      title: {
        display: true,
        text: "Cumulative points in game per round"
      },
      tooltip: {
        mode: "index",
        intersect: false,
        callbacks: {
          label: (tooltipItem) => {
            const roundInd = tooltipItem.dataIndex;
            const dataInd = tooltipItem.datasetIndex;
            const label = tooltipItem.dataset.label || "";
            const val = tooltipItem.formattedValue;
            const pointsFromRound = gameReportData?.pointsPerRound[dataInd][roundInd] ?? 0;
            if (roundInd === 0) {
              return `${label}: ${val}`;
            } else {
              return `${label}: ${val} (${pointsFromRound})`;
            }
          },
          title: (tooltipItems) => {
            if (tooltipItems.length > 0) {
              const item = tooltipItems[0];
              const label = item.label;
              const ind = item.dataIndex;
              if (ind === 0) {
                return "Start of the Game";
              } else {
                const cardsInRound = gameReportData?.cardsInRound[ind-1] ?? 0;
                return `Round ${label} with ${cardsInRound} cards`;
              }
            } else {
              return "";
            }
          },
        },
      },
      legend: {
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
      annotation: {
        annotations: annotations,
      },
    }
  };

  const chartData: ChartData<"line"> = {
    labels: gameReportData?.rounds,
    datasets: getDataSetsData(),
  };

  return (
    <div style={{height: "430px"}}>
      <Line
        ref={chartRef}
        data={chartData}
        options={chartOptions}
      />
    </div>
  );
};

export default CumulativePoints;
