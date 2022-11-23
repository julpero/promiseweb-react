import React, { useEffect, useRef, useState } from "react";
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
import { Chart } from "react-chartjs-2";
import { colorize, increase_brightness } from "../../common/commonFunctions";
import { Button, Modal } from "react-bootstrap";
import OneGameReport from "../OneGameReport";

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

const OnePlayerStats = ({gameReportData}: IProps) => {
  const [oneGameReportId, setOneGameReportId] = useState("");
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
      data: gamesData.flatMap(data => data.position),
      yAxisID: "y",
      borderColor: basicColor,
      tension: 0,
      borderWidth: 1,
      hoverBorderWidth: 3,
      pointRadius: 5,
      pointStyle: "rectRot",
    } as ChartDataset<"line">);
    accentColors.current.push(basicColor);
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

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
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

    label = "% of winning points";
    basicColor = colorize(label);
    dataSetsData.push({
      type: "line",
      label: label,
      data: gamesData.flatMap(data => data.pOfWinPoints),
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
    accentFadedColors.current.push(increase_brightness(basicColor, 95));

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
    onClick: () => {
      const chart = chartRef.current;
      if (chart) {
        const dataIndex = chart.tooltip?.dataPoints.at(0)?.dataIndex ?? -1;
        if (dataIndex >= 0) {
          const gameId = gameReportData?.gamesData.at(dataIndex)?.gameId;
          if (gameId) {
            setOneGameReportId(gameId);
          }
        }
      }
    },
    plugins: {
      title: {
        display: false,
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

  return (
    <React.Fragment>
      <div style={{height: "50vh"}}>
        <Chart
          type="bar"
          ref={chartRef}
          data={chartData}
          options={chartOptions}
        />
      </div>

      {oneGameReportId &&
        <Modal
          show={oneGameReportId !== ""}
          fullscreen
          onHide={() => setOneGameReportId("")}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              Game Report
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <OneGameReport gameId={oneGameReportId} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="warning" onClick={() => setOneGameReportId("")}>Close Report</Button>
          </Modal.Footer>
        </Modal>
      }
    </React.Fragment>
  );
};

export default OnePlayerStats;
