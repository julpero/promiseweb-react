import mongoose from "mongoose";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiGamesByPlayer, IuiPlayedGamesReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IuiGameReport } from "../../frontend/src/interfaces/IuiReports";
import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";

// export interface IGamesPlayedReportData {
//   gameCount?: number,
//   totalRounds?: number,
//   totalHits?: number,
// }

export const reportData = async (): Promise<IuiPlayedGamesReport> => {
  const gamesPlayed = await GameOptions.countDocuments({
    gameStatus: { $eq: GAME_STATUS.played },
  });

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
        roundsPlayed: {
          $sum: "$gameStatistics.roundsPlayed",
        },
        totalCardsHit: {
          $sum: "$gameStatistics.cardsHit",
        },
      },
    }
  ]);

  interface playersAgg {_id: string, count: number}
  const playerReport: IuiGamesByPlayer[] = [];
  const players = await GameOptions.aggregate<playersAgg>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played}
    }},
    {$unwind: {
      path: "$humanPlayers",
      preserveNullAndEmptyArrays: true,
    }},
    {$group: {
      _id: "$humanPlayers.name",
      count: {$sum:1},
    }}
  ]);
  players.forEach(player => {
    if (player.count >= 5) {
      playerReport.push({
        playerName: player._id,
        count: player.count,
        wins: 0,
        winPercentage: 0,
        avgPoints: 0,
        avgScorePoints: 0,
        avgKeepPercentage: 0,
        avgPercentagePoints: 0,
      } as IuiGamesByPlayer);
    }
  });

  const reportDataObj: IuiPlayedGamesReport = {
    gamesPlayed: gamesPlayed,
    playersTotal: [],
    totalCardsHit: roundsAndCards[0]?.totalCardsHit ?? 0,
    roundsPlayed: roundsAndCards[0]?.roundsPlayed ?? 0,
    gamesByPlayer: playerReport,
  };

  return reportDataObj;
};

export const oneGameReportData = async (gameIdStr: string): Promise<IuiGameReport | null> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return null;
  const gameInDb = await GameOptions.findById(gameIdStr);
  if (gameInDb) {
    return getGameReport(gameInDb);
  } else {
    return null;
  }
};
