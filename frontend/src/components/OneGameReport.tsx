import React, { useEffect, useState } from "react";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../interfaces/IuiReports";
import { useSocket } from "../socket";

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
    socket.emit("get game report", reportRequest, (reportResponse: IuiOneGameReport) => {
      setGameReportData(reportResponse);
    });
  }, [gameId, socket]);

  return (
    <div>
      {JSON.stringify(gameReportData)}
    </div>
  );
};

export default OneGameReport;
