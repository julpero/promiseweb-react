import mongoose from "mongoose";
import { GAME_STATUS, HIDDEN_CARDS_MODE, RULE } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiGamesByPlayer, IuiPlayedGame, IuiPlayedGamesReport, IuiPlayersInGameReport } from "../../frontend/src/interfaces/IuiGameReports";
import { IuiGameReport, IuiOneGameData } from "../../frontend/src/interfaces/IuiReports";
import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";

export const reportData = async (): Promise<IuiPlayedGamesReport> => {
  // console.time("reportData");
  // console.time("reportData count");
  const gamesPlayed = await GameOptions.countDocuments({
    gameStatus: { $eq: GAME_STATUS.played },
    thisIsDemoGame: {$in: [null, false]},
  });
  // console.timeEnd("reportData count");

  // console.time("reportData rounds and cards");
  interface roundsAndCardsAgg {_id: string, roundsPlayed: number, totalCardsHit: number, playerCount: number}
  const roundsAndCards = await GameOptions.aggregate<roundsAndCardsAgg>([
    {$match: {
      gameStatus: {$eq: GAME_STATUS.played},
      thisIsDemoGame: {$in: [null, false]},
    }},
    {$group: {
      _id: null,
      roundsPlayed: {$sum: "$gameStatistics.roundsPlayed"},
      totalCardsHit: {$sum: "$gameStatistics.cardsHit"},
      playerCount: {$sum: "$humanPlayersCount"},
    }}
  ]);
  // console.timeEnd("reportData rounds and cards");

  const playerReport = new Map<string, IuiGamesByPlayer>();

  // console.time("reportData player report");
  // players and played games count, total points, win count
  interface playersAgg {_id: string, count: number, totalPoints: number, wins: number, avgScorePoints: number, avgPercentagePoints: number}
  const players = await GameOptions.aggregate<playersAgg>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played},
      "thisIsDemoGame": {$in: [null, false]},
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
  // console.timeEnd("reportData player report");

  // console.time("reportData player avg");
  // average points per player
  interface playersAvgPoints {_id: string, avgPoints: number}
  const avgPoints = await GameOptions.aggregate<playersAvgPoints>([
    {$match: {
      "gameStatus": { $eq: GAME_STATUS.played},
      "gameStatistics.roundsPlayed": {$eq: 19},
      "thisIsDemoGame": {$in: [null, false]},
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
  // console.timeEnd("reportData player avg");

  // console.time("reportData player avg keeps");
  // average keep percentage per player
  interface playersAvgKeepPer {_id: string, avgKeepPercentage: number}
  const avgKeeps = await GameOptions.aggregate<playersAvgKeepPer>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played},
      "gameStatistics.roundsPlayed": {$gte: 0},
      "gameStatistics.playersStatistics.totalKeeps": {$gte: 0},
      "thisIsDemoGame": {$in: [null, false]},
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
  // console.timeEnd("reportData player avg keeps");

  // console.time("reportData player count");
  // player count in games
  const playersTotalArr: IuiPlayersInGameReport[] = [];
  interface playersTotalAgg {_id: number, playersTotal: number}
  const playersTotal = await GameOptions.aggregate<playersTotalAgg>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played},
      "thisIsDemoGame": {$in: [null, false]},
    }},
    {$group: {
      _id: "$humanPlayersCount",
      playersTotal: {$sum: 1}
    }},
  ]);
  playersTotal.forEach(total => {
    playersTotalArr.push({
      playersInGame: total._id,
      count: total.playersTotal,
    } as IuiPlayersInGameReport);
  });
  // console.timeEnd("reportData player count");

  // console.time("reportData used rules");
  // used rules in games
  interface usedRulesCountAgg {
    _id: string,
    evenPromisesDisallowedCount: number,
    hiddenPromiseRoundCount: number,
    onlyTotalPromiseCount: number,
    mustTrumpCount: number,
    hiddenTrumpCount: number,
    speedPromiseCount: number,
    privateSpeedGameCount: number,
    opponentPromiseCardValueCount: number,
    opponentGameCardValueCount: number,
    showOnlyCardInChargeCount: number,
    showCardInChargeAndWinningCardCount: number,
  }
  const usedRulesCount = new Map<RULE, number>();
  const hiddenCardsModeCount = new Map<HIDDEN_CARDS_MODE, number>();
  const usedRulesCountResult = await GameOptions.aggregate<usedRulesCountAgg>([
    {$match: {
      "gameStatus": {$eq: GAME_STATUS.played},
      "thisIsDemoGame": {$in: [null, false]},
    }}, {$project: {
      item: 1,
      evenPromisesDisallowed: {$cond: [{ $eq: ["$evenPromisesAllowed", false]}, 1, 0]},
      hiddenPromiseRound: {$cond: [{ $eq: ["$visiblePromiseRound", false]}, 1, 0]},
      onlyTotalPromise: {$cond: [{ $eq: ["$onlyTotalPromise", true]}, 1, 0]},
      mustTrump: {$cond: [{ $eq: ["$freeTrump", false]}, 1, 0]},
      hiddenTrump: {$cond: [{ $eq: ["$hiddenTrump", true]}, 1, 0]},
      speedPromise: {$cond: [{ $eq: ["$speedPromise", true]}, 1, 0]},
      privateSpeedGame: {$cond: [{ $eq: ["$privateSpeedGame", true]}, 1, 0]},
      opponentPromiseCardValue: {$cond: [{ $eq: ["$opponentPromiseCardValue", true]}, 1, 0]},
      opponentGameCardValue: {$cond: [{ $eq: ["$opponentGameCardValue", true]}, 1, 0]},
      showOnlyCardInCharge: {$cond: [{ $eq: ["$hiddenCardsMode", 1]}, 1, 0]},
      showCardInChargeAndWinningCard: {$cond: [{ $eq: ["$hiddenCardsMode", 2]}, 1, 0]},
    }},
    {$group: {
      _id: "$item",
      evenPromisesDisallowedCount: {$sum: "$evenPromisesDisallowed"},
      hiddenPromiseRoundCount: {$sum: "$hiddenPromiseRound"},
      onlyTotalPromiseCount: {$sum: "$onlyTotalPromise"},
      mustTrumpCount: {$sum: "$mustTrump"},
      hiddenTrumpCount: {$sum: "$hiddenTrump"},
      speedPromiseCount: {$sum: "$speedPromise"},
      privateSpeedGameCount: {$sum: "$privateSpeedGame"},
      opponentPromiseCardValueCount: {$sum: "$opponentPromiseCardValue"},
      opponentGameCardValueCount: {$sum: "$opponentGameCardValue"},
      showOnlyCardInChargeCount: {$sum: "$showOnlyCardInCharge"},
      showCardInChargeAndWinningCardCount: {$sum: "$showCardInChargeAndWinningCard"},
    }},
  ]);
  if (usedRulesCountResult && usedRulesCountResult.length === 1) {
    console.log(usedRulesCountResult);
    const values = usedRulesCountResult.at(0);
    if (values) {
      usedRulesCount.set(RULE.noEvenPromisesAllowed, values.evenPromisesDisallowedCount);
      usedRulesCount.set(RULE.hiddenPromiseRound, values.hiddenPromiseRoundCount);
      usedRulesCount.set(RULE.onlyTotalPromise, values.onlyTotalPromiseCount);
      usedRulesCount.set(RULE.mustPlayTrump, values.mustTrumpCount);
      usedRulesCount.set(RULE.hiddenTrump, values.hiddenTrumpCount);
      usedRulesCount.set(RULE.speedPromise, values.speedPromiseCount);
      usedRulesCount.set(RULE.privateSpeedGame, values.privateSpeedGameCount);
      usedRulesCount.set(RULE.opponentPromiseCardValue, values.opponentPromiseCardValueCount);
      usedRulesCount.set(RULE.opponentGameCardValue, values.opponentGameCardValueCount);
      hiddenCardsModeCount.set(HIDDEN_CARDS_MODE.onlyCardInCharge, values.showOnlyCardInChargeCount);
      hiddenCardsModeCount.set(HIDDEN_CARDS_MODE.cardInChargeAndWinning, values.showCardInChargeAndWinningCardCount);
    }
  }
  // console.timeEnd("reportData used rules");

  // console.time("reportData vanilla games count");
  // count vanilla games (no rules)
  const vanillaGameCount = await GameOptions.count({
    "gameStatus": {$eq: GAME_STATUS.played},
    "thisIsDemoGame": {$in: [null, false]},
    "evenPromisesAllowed": {$in: [null, true]},
    "visiblePromiseRound": {$in: [null, true]},
    "onlyTotalPromise": {$in: [null, false]},
    "freeTrump": {$in: [null, true]},
    "hiddenTrump": {$in: [null, false]},
    "speedPromise": {$in: [null, false]},
    "privateSpeedGame": {$in: [null, false]},
    "opponentPromiseCardValue": {$in: [null, false]},
    "opponentGameCardValue": {$in: [null, false]},
    "hiddenCardsMode": {$in: [null, 0]},
  });
  // console.timeEnd("reportData vanilla games count");

  // console.time("reportData last games");
  const lastGames = await GameOptions.find({
    "gameStatus": {$eq: GAME_STATUS.played},
    "thisIsDemoGame": {$in: [null, false]},
  }).select({
    _id: 1,
    createDateTime: 1,
    gameStatistics: 1,
  }).sort({
    createDateTime: -1,
  }).limit(5).lean();
  // console.timeEnd("reportData last games");

  const reportDataObj: IuiPlayedGamesReport = {
    gamesPlayed: gamesPlayed,
    playersTotal: playersTotalArr,
    totalCardsHit: roundsAndCards[0]?.totalCardsHit ?? 0,
    roundsPlayed: roundsAndCards[0]?.roundsPlayed ?? 0,
    playerCount: roundsAndCards[0]?.playerCount ?? 0,
    usedRulesCount: JSON.stringify(Array.from(usedRulesCount)),
    hiddenCardsModeCount: JSON.stringify(Array.from(hiddenCardsModeCount)),
    vanillaGamesCount: vanillaGameCount,
    gamesByPlayer: Array.from(playerReport.values()),
    lastGames: lastGames.map(game => {
      return {
        gameId: game._id.toString(),
        played: game.createDateTime,
        humanPlayers: game.gameStatistics?.playersStatistics.flatMap(player => player.playerName) ?? [],
      } as IuiPlayedGame;
    }),
  };
  // console.timeEnd("reportData");
  return reportDataObj;
};

export const oneGameReportData = async (gameIdStr: string): Promise<IuiGameReport | null> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return null;
  // console.time("oneGameReportData");
  const gameInDb = await GameOptions.findById(gameIdStr).lean();
  // console.timeEnd("oneGameReportData");
  if (gameInDb && gameInDb.gameStatus === GAME_STATUS.played) {
    return getGameReport(gameInDb);
  } else {
    return null;
  }
};

export const onePlayerReportData = async (playerName: string): Promise<IuiOneGameData[]> => {
  const gameArr: IuiOneGameData[] = [];
  // console.time("onePlayerReportData");
  const gamesInDb = await GameOptions.find({
    gameStatus: { $eq: GAME_STATUS.played },
    thisIsDemoGame: {$in: [null, false]},
    "humanPlayers.name": {$eq: playerName},
  }).select({
    _id: 1,
    createDateTime: 1,
    gameStatistics: 1,
    humanPlayersCount: 1,
  }).sort({
    createDateTime: 1,
  }).lean();
  // console.timeEnd("onePlayerReportData");
  gamesInDb.forEach(gameInDb => {
    const playerStats = gameInDb.gameStatistics?.playersStatistics.find(player => player.playerName === playerName);
    const gameStats = gameInDb.gameStatistics;
    if (playerStats && gameStats && gameStats.roundsPlayed > 0) {
      gameArr.push({
        gameId: gameInDb._id.toString(),
        started: gameInDb.createDateTime,
        position: playerStats.position,
        points: playerStats.totalPoints,
        roundCount: gameStats.roundsPlayed,
        keepP: Math.round(playerStats.totalKeeps * 1000 / gameStats.roundsPlayed)/10,
        pOfWinPoints: Math.round(playerStats.totalPoints * 1000 / (gameInDb.gameStatistics?.playersStatistics.at(0)?.totalPoints ?? playerStats.totalPoints * 1000)) / 10,
        playersInGame: gameInDb.humanPlayersCount,
        scorePoints: playerStats.scorePoints,
        opponents: gameInDb.gameStatistics?.playersStatistics.filter(stats => stats.playerName !== playerName).flatMap(stats => stats.playerName).sort((a: string, b: string) => a.localeCompare(b)),
      } as IuiOneGameData);
    }
  });
  return gameArr;
};
