import { IuiPlayedGamesReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../../frontend/src/interfaces/IuiReports";
import { IGamesPlayedReportData, oneGameReportData, reportData } from "../dbActions/reportData";

export const getReportData = async (): Promise<IuiPlayedGamesReport> => {
  const playedGamesData: IGamesPlayedReportData = await reportData();
  return {
    gamesPlayed: playedGamesData.gameCount,
    roundsPlayed: playedGamesData.totalRounds,
    totalCardsHit: playedGamesData.totalHits,
  } as IuiPlayedGamesReport;
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
