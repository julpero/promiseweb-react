import React, { useEffect, useState } from "react";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { useSocket } from "../socket";

import "react-tabulator/lib/styles.css"; // required styles
import "react-tabulator/lib/css/tabulator.min.css"; // theme
import { ReactTabulator, ColumnDefinition } from "react-tabulator";

const PlayedGamesReport = () => {
  const [reportData, setReportData] = useState<IuiPlayedGamesReport>();
  const {socket } = useSocket();
  const colorArr = [
    "#FF0000",
    "#FF1100",
    "#FF2200",
    "#FF3300",
    "#FF4400",
    "#FF5500",
    "#FF6600",
    "#FF7700",
    "#FF8800",
    "#FF9900",
    "#FFAA00",
    "#FFBB00",
    "#FFCC00",
    "#FFDD00",
    "#FFEE00",
    "#FFFF00",
    "#EEFF00",
    "#DDFF00",
    "#CCFF00",
    "#BBFF00",
    "#AAFF00",
    "#99FF00",
    "#88FF00",
    "#77FF00",
    "#66FF00",
    "#55FF00",
    "#44FF00",
    "#33FF00",
    "#22FF00",
    "#11FF00",
    "#00FF00"
  ];

  const columns: ColumnDefinition[] = [
    {
      title: "(Nick)Name",
      field: "playerName",
      sorter: "string",
    },
    {
      title: "Games",
      headerTooltip: "Total played games",
      field: "count",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.count) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Keeps-%",
      headerTooltip: "Average keep-% of promises from all games",
      field: "avgKeepPercentage",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: 100,
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "AvgPoints",
      headerTooltip: "Average points of games with 10-1-10 rounds",
      field: "avgPoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.avgPoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.avgPoints) ?? [])),
        color: colorArr,
        legend: (val) => parseFloat(val).toFixed(1),
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "TotalPoints",
      headerTooltip: "Total points of all played games",
      field: "totalPoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.totalPoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.totalPoints) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "ScorePoints",
      headerTooltip: "Average score points, score point = ((players in the game - position) / players in the game)",
      field: "avgScorePoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.avgScorePoints) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.avgScorePoints) ?? [])),
        color: colorArr,
        legend: (val) => parseFloat(val).toFixed(3),
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Wins",
      headerTooltip: "Count of all games player has won",
      field: "wins",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.wins) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.wins) ?? [])),
        color: colorArr,
        legend: (val) => val,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "Win-%",
      headerTooltip: "Winning percentage of all games player has played",
      field: "winPercentage",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: Math.min(...(reportData?.gamesByPlayer.map(o => o.winPercentage) ?? [])),
        max: Math.max(...(reportData?.gamesByPlayer.map(o => o.winPercentage) ?? [])),
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
    {
      title: "% of win points",
      headerTooltip: "Average of game winning points of all games",
      field: "avgPercentagePoints",
      sorter: "number",
      formatter: "progress",
      formatterParams: {
        min: 0,
        max: 100,
        color: colorArr,
        legend: (val) => `${parseFloat(val).toFixed(1)}%`,
        legendAlign: "left",
        legendColor:"#000000",
      },
    },
  ];

  useEffect(() => {
    socket.emit("get report data", null, (reportData: IuiPlayedGamesReport) => {
      console.log("report data", reportData);
      setReportData(reportData);
    });
  }, [socket]);

  return (
    <div>
      <ReactTabulator
        columns={columns}
        data={reportData?.gamesByPlayer ?? []}
        options={{
          initialSort: [{
            column: "count"
          }],
          layout: "fitColumns",
        }}
      />
    </div>
  );
};

export default PlayedGamesReport;
