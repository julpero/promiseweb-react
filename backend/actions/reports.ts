import { IuiPlayedGamesReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IGamesPlayedReportData, reportData } from "../dbActions/reportData";

export const getReportData = async (): Promise<IuiPlayedGamesReport> => {
  const playedGamesData: IGamesPlayedReportData = await reportData();
  return {
    gamesPlayed: playedGamesData.gameCount,
    roundsPlayed: playedGamesData.totalRounds,
    totalCardsHit: playedGamesData.totalHits,
  } as IuiPlayedGamesReport;
};
