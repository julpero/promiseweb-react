import React, { MouseEvent as MouseEventReact, useEffect, useRef } from "react";
import { IuiOnePlayerReportData } from "../../interfaces/IuiReports";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { format } from "date-fns";
import "chartjs-adapter-date-fns";

import {
  Chart as ChartJS,
  ChartOptions,
  ChartData,
  ChartDataset,
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart, getDatasetAtEvent } from "react-chartjs-2";
import { colorize, increase_brightness } from "../../common/commonFunctions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  TimeScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Legend,
  Tooltip,
  LineController,
  BarController,
);

interface IProps {
  gameReportData?: IuiOnePlayerReportData,
}

const OnePlayerPOfPoints = ({gameReportData}: IProps) => {
  const chartRef = useRef<ChartJS<"line" | "bar">>(null);
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

  const getDataSetsData = (): ChartDataset<"line" | "bar">[] => {
    const dataSetsData: ChartDataset<"line" | "bar">[] = [];
    if (!gameReportData) return dataSetsData;

    const {gamesData} = gameReportData;

    let label = "Position";
    let basicColor = colorize(label);
    dataSetsData.push({
      type: "line",
      label: label,
      data: gamesData.flatMap(data => {
        return {
          x: new Date(data.started).getTime(),
          y: data.position,
        };
      }),
      yAxisID: "y",
      borderColor: basicColor,
      tension: 0,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
      pointStyle: "rectRot",
    } as ChartDataset<"line">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 75));

    label = "Keep %";
    basicColor = colorize(label);
    dataSetsData.push({
      type: "bar",
      label: label,
      data: gamesData.flatMap(data => data.keepP),
      yAxisID: "y1",
      borderColor: basicColor,
      borderWidth: 1,
      hoverBorderWidth: 3,
      barThickness: 3,
    } as ChartDataset<"bar">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 75));

    label = "% of winning points";
    basicColor = colorize(label);
    dataSetsData.push({
      type: "line",
      label: label,
      data: gamesData.flatMap(data => {
        return {
          x: new Date(data.started).getTime(),
          y: data.pOfWinPoints,
        };
      }),
      yAxisID: "y1",
      borderColor: basicColor,
      tension: 0,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
      pointStyle: "crossRot",
      showLine: false,
    } as ChartDataset<"line">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 75));

    return dataSetsData;
  };

  const chartOptions: ChartOptions<"line" | "bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        type: "time",
        ticks: {
          includeBounds: true,
        }
      },
      y: {
        type: "linear",
        display: true,
        min: 1,
        max: 6,
        position: "left",
        reverse: true,
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        type: "linear",
        display: true,
        min: 0,
        max: 100,
        position: "right",
        grid: {
          drawOnChartArea: false,
        },
      }
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
    },
  };

  const chartData: ChartData<"line" | "bar"> = {
    labels: gameReportData?.gamesData.flatMap(data => data.started),
    datasets: getDataSetsData(),
  };

  const chartClick = (e: MouseEventReact<HTMLCanvasElement>) => {
    if (chartRef.current) {
      const canvasPosition = getDatasetAtEvent(chartRef.current, e);
      console.log(canvasPosition);
    }
  };

  return (
    <div style={{height: "80vh"}}>
      <Chart
        type="bar"
        ref={chartRef}
        data={chartData}
        options={chartOptions}
        onClick={chartClick}
      />
    </div>
  );
};

export default OnePlayerPOfPoints;
