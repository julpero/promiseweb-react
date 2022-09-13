import React, { useEffect, useState } from "react";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../interfaces/IuiReports";
import { useSocket } from "../socket";
import CardsInGame from "./ReportComponents/CardsInGame";

import CumulativePoints from "./ReportComponents/CumulativePoints";
import KeepsInGame from "./ReportComponents/KeepsInGame";
import PointsInGame from "./ReportComponents/PointsInGame";
import TimesUsedInGame from "./ReportComponents/TimesUsedInGame";

interface IProps {
  gameId: string,
}

const OneGameReport = ({gameId}: IProps) => {
  const [gameReportData, setGameReportData] = useState<IuiOneGameReport>();

  const { socket } = useSocket();

  useEffect(() => {
    const reportRequest: IuiGetOneGameReportRequest = {
      gameId: gameId,
    };
    if (gameId) {
      socket.emit("get game report", reportRequest, (reportResponse: IuiOneGameReport) => {
        setGameReportData(reportResponse);
      });
    }
  }, [gameId, socket]);

  return (
    <div>
      <CumulativePoints gameReportData={gameReportData} />
      <KeepsInGame gameReportData={gameReportData} />
      <PointsInGame gameReportData={gameReportData} />
      <TimesUsedInGame gameReportData={gameReportData} />
      <CardsInGame gameReportData={gameReportData} />
      {JSON.stringify(gameReportData)}
    </div>
  );
};

export default OneGameReport;
