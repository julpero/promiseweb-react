import mongoose from "mongoose";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiGamesByPlayer, IuiPlayedGamesReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IuiGameReport } from "../../frontend/src/interfaces/IuiReports";
import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";

export const reportData = async (): Promise<IuiPlayedGamesReport> => {
  const gamesPlayed = await GameOptions.countDocuments({
    gameStatus: { $eq: GAME_STATUS.played },
  });

  const roundsAndCards = await GameOptions.aggregate([
    {$match: {
      gameStatus: {$eq: GAME_STATUS.played},
    }},
    {$group: {
      _id: null,
      roundsPlayed: {$sum: "$gameStatistics.roundsPlayed"},
      totalCardsHit: {$sum: "$gameStatistics.cardsHit"},
    }}
  ]);

  const playerReport = new Map<string, IuiGamesByPlayer>();

  // players and played games count, total points, win count
  interface playersAgg {_id: string, count: number, totalPoints: number, wins: number, avgScorePoints: number, avgPercentagePoints: number}
  const players = await GameOptions.aggregate<playersAgg>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played}
    }},
    {$unwind: {
      path: "$gameStatistics.playersStatistics",
      preserveNullAndEmptyArrays: true,
    }},
    {$addFields: {
      "gameStatistics.playersStatistics.pointPercentages": {$divide: ["$gameStatistics.playersStatistics.totalPoints", "$gameStatistics.winnerPoints"]}
    }},
    {$group: {
      _id: "$gameStatistics.playersStatistics.playerName",
      count: {$sum:1},
      totalPoints: {$sum: "$gameStatistics.playersStatistics.totalPoints"},
      wins: {$sum: {$cond: [{$eq: ["$gameStatistics.playersStatistics.playerName", "$gameStatistics.winnerName"]}, 1, 0]}},
      avgScorePoints: {$avg: "$gameStatistics.playersStatistics.scorePoints"},
      avgPercentagePoints: {$avg: "$gameStatistics.playersStatistics.pointPercentages"},
    }}
  ]);
  players.forEach(player => {
    if (player.count >= 5) {
      playerReport.set(player._id, {
        playerName: player._id,
        count: player.count,
        wins: player.wins,
        winPercentage: (player.wins/player.count)*100,
        avgPoints: 0,
        avgScorePoints: player.avgScorePoints,
        avgKeepPercentage: 0,
        avgPercentagePoints: player.avgPercentagePoints*100,
        totalPoints: player.totalPoints,
      } as IuiGamesByPlayer);
    }
  });

  // average points per player
  interface playersAvgPoints {_id: string, avgPoints: number}
  const avgPoints = await GameOptions.aggregate<playersAvgPoints>([
    {$match: {
      "gameStatus": { $eq: GAME_STATUS.played},
      "gameStatistics.roundsPlayed": {$eq: 19},
    }},
    {$unwind: {
      path: "$gameStatistics.playersStatistics",
      preserveNullAndEmptyArrays: false
    }},
    {$group: {
      _id: "$gameStatistics.playersStatistics.playerName",
      avgPoints: {$avg: "$gameStatistics.playersStatistics.totalPoints"},
    }},
  ]);
  avgPoints.forEach(player => {
    const rep = playerReport.get(player._id);
    if (rep) {
      rep.avgPoints = player.avgPoints;
    }
  });

  // average keep percentage per player
  interface playersAvgKeepPer {_id: string, avgKeepPercentage: number}
  const avgKeeps = await GameOptions.aggregate<playersAvgKeepPer>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played},
      "gameStatistics.roundsPlayed": {$gte: 0},
      "gameStatistics.playersStatistics.totalKeeps": {$gte: 0},
    }},
    {$addFields: {
      "gameStatistics.playersStatistics.roundsPlayed": "$gameStatistics.roundsPlayed"
    }},
    {$unwind: {
      path: "$gameStatistics.playersStatistics",
      preserveNullAndEmptyArrays: false
    }},
    {$group: {
      _id: "$gameStatistics.playersStatistics.playerName",
      playerTotalRounds: {$sum: "$gameStatistics.playersStatistics.roundsPlayed"},
      playerTotalKeeps: {$sum: "$gameStatistics.playersStatistics.totalKeeps"},
    }},
    {$project: {
      _id: 1,
      avgKeepPercentage: {$divide: ["$playerTotalKeeps", "$playerTotalRounds"]}
    }}
  ]);
  avgKeeps.forEach(player => {
    const rep = playerReport.get(player._id);
    if (rep) {
      rep.avgKeepPercentage = player.avgKeepPercentage*100;
    }
  });

  const reportDataObj: IuiPlayedGamesReport = {
    gamesPlayed: gamesPlayed,
    playersTotal: [],
    totalCardsHit: roundsAndCards[0]?.totalCardsHit ?? 0,
    roundsPlayed: roundsAndCards[0]?.roundsPlayed ?? 0,
    gamesByPlayer: Array.from(playerReport.values()),
  };

  return reportDataObj;
};

export const oneGameReportData = async (gameIdStr: string): Promise<IuiGameReport | null> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return null;
  const gameInDb = await GameOptions.findById(gameIdStr);
  if (gameInDb && gameInDb.gameStatus === GAME_STATUS.played) {
    return getGameReport(gameInDb);
  } else {
    return null;
  }
};
