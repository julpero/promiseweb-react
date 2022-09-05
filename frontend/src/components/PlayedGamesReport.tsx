import React, { useEffect, useState } from "react";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { useSocket } from "../socket";

const PlayedGamesReport = () => {
  const [reportData, setReportData] = useState<IuiPlayedGamesReport>();
  const {socket } = useSocket();

  useEffect(() => {
    socket.emit("get report data", null, (reportData: IuiPlayedGamesReport) => {
      console.log("report data", reportData);
      setReportData(reportData);
    });
  }, [socket]);

  return (
    <div>{JSON.stringify(reportData)}</div>
  );
};

export default PlayedGamesReport;
