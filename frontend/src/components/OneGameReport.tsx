import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "../common/userFunctions";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../interfaces/IuiReports";
import { useSocket } from "../socket";
import { getUser } from "../store/userSlice";
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
  const user = useSelector(getUser);
  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  useEffect(() => {
    if (gameId && user.isUserLoggedIn) {
      const reportRequest: IuiGetOneGameReportRequest = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
        gameId: gameId,
      };
      socket.emit("get game report", reportRequest, (reportResponse: IuiOneGameReport) => {
        if (reportResponse.isAuthenticated) {
          handleAuthenticatedRequest(reportResponse.token);
          setGameReportData(reportResponse);
        } else {
          handleUnauthenticatedRequest(dispatch);
        }
      });
    }
  }, [gameId, user, dispatch, socket]);

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
