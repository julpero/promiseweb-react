import { IuiPlayedGamesReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IuiGetOneGameReportRequest, IuiOneGameReport, IuiOnePlayerReportData } from "../../frontend/src/interfaces/IuiReports";
import { oneGameReportData, onePlayerReportData, reportData } from "../dbActions/reportData";

export const getReportData = async (): Promise<IuiPlayedGamesReport> => {
  return await reportData();
};

export const getOneGameReportData = async (reportRequest: IuiGetOneGameReportRequest): Promise<IuiOneGameReport | null> => {
  const { gameId } = reportRequest;
  const gameReportData = await oneGameReportData(gameId);
  if (gameReportData) {
    return { ...gameReportData, gameId: gameId };
  } else {
    return null;
  }
};

export const getOnePlayerReport = async (playerName: string): Promise<IuiOnePlayerReportData> => {
  const gamesData = await onePlayerReportData(playerName);
  const reportData: IuiOnePlayerReportData = {
    playerName: playerName,
    gamesData: gamesData,
  };

  return reportData;
};
