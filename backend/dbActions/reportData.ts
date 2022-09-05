import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import GameOptions from "../models/GameOptions";

export interface IGamesPlayedReportData {
  gameCount?: number,
  totalRounds?: number,
  totalHits?: number,
}

export const reportData = async (): Promise<IGamesPlayedReportData> => {
  const reportDataObj: IGamesPlayedReportData = {};

  const gameCount = await GameOptions.countDocuments({
    gameStatus: { $eq: GAME_STATUS.played },
  });
  reportDataObj.gameCount = gameCount ?? 0;

  const roundsAndCards = await GameOptions.aggregate([
    {
      $match: {
        gameStatus: {
          $eq: GAME_STATUS.played
        },
      }
    }, {
      $group: {
        _id: null,
        totalRounds: {
          $sum: "$gameStatistics.roundsPlayed",
        },
        totalHits: {
          $sum: "$gameStatistics.cardsHit",
        },
      },
    }
  ]);

  reportDataObj.totalRounds = roundsAndCards[0]?.totalRounds ?? 0;
  reportDataObj.totalHits = roundsAndCards[0]?.totalHits ?? 0;

  return reportDataObj;
};
