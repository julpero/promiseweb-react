import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../interfaces/IuiReports";
import { useSocket } from "../socket";
import { getUserName } from "../store/userSlice";
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
  const userName = useSelector(getUserName);

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    const reportRequest: IuiGetOneGameReportRequest = {
      uuid: getMyId(),
      userName: userName,
      token: getToken(),
      gameId: gameId,
    };
    if (gameId) {
      socket.emit("get game report", reportRequest, (reportResponse: IuiOneGameReport) => {
        setGameReportData(reportResponse);
      });
    }
  }, [gameId, userName, socket]);

  return (
    <div>
      <CumulativePoints gameReportData={gameReportData} />
      <KeepsInGame gameReportData={gameReportData} />
      <PointsInGame gameReportData={gameReportData} />
      <TimesUsedInGame gameReportData={gameReportData} />
      <CardsInGame gameReportData={gameReportData} />
    </div>
  );
};

export default OneGameReport;
