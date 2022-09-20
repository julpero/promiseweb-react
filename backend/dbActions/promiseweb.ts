import GameOptions from "../models/GameOptions";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getCurrentRoundInd } from "../common/common";

export interface ILastGameStatusResponse {
  gameId: string,
  asAPlayer: string,
  currentRound: number,
}

export const insertNewGame = async (gameModel: IGameOptions): Promise<string> => {
  const createGameObj = new GameOptions(gameModel);
  const createdGame = await createGameObj.save();
  console.log("createdGame", createdGame);
  return createdGame._id.toString();
};

export const hasOngoingOrCreatedGame = async (playerName: string): Promise<boolean> => {
  const onGoingOrCreatedGameCount = await GameOptions.countDocuments({
    gameStatus: { $lte: GAME_STATUS.onGoing },
    "humanPlayers.name": { $eq: playerName },
  });
  console.log("onGoingOrCreatedGameCount", onGoingOrCreatedGameCount);
  return onGoingOrCreatedGameCount > 0;
};

export const getLastGameByStatus = async (playerName: string, status: GAME_STATUS): Promise<ILastGameStatusResponse | null> => {
  try {
    const gamesInDb = await GameOptions.find({
      gameStatus: { $eq: status },
      "humanPlayers.name": { $eq: playerName },
    });
    if (gamesInDb && gamesInDb.length > 0) {
      const gameInDb = gamesInDb.pop();
      return {
        gameId: gameInDb?._id.toString() ?? "",
        asAPlayer: gameInDb?.humanPlayers.find(player => player.name === playerName)?.name ?? "",
        currentRound: gameInDb && gameInDb.game ? getCurrentRoundInd(gameInDb.game) : -1,
      } as ILastGameStatusResponse;
    } else {
      return null;
    }
  } catch (error: unknown) {
    console.log(error);
    return null;
  }
};

export const getPlayerAvgPoints = async (playerName: string, startRound: number, turnRound: number, endRound: number): Promise<number[]> => {
  const stats: number[] = [];

  const gamesInDb: IGameOptions[] = await GameOptions.aggregate([
    {
      $match: {
        gameStatus: {
          $eq: GAME_STATUS.played
        },
        "humanPlayers.name": {$eq: playerName},
        startRound: { $eq: startRound },
        turnRound: { $eq: turnRound },
        endRound: { $eq: endRound },
      }
    }
  ]);
  console.log("getPlayerAvgPoints gamesInDb", gamesInDb);

  gamesInDb.forEach((gameInDb) => {
    const playerStats = gameInDb.gameStatistics.playersStatistics.find(playerStatistics => playerStatistics.playerName === playerName);
    if (playerStats) {
      const cumulativePoints = playerStats.cumulativePointsPerRound;
      for (let i = 0; i < cumulativePoints.length; i++) {
        if (!stats[i]) {
          stats[i] = cumulativePoints[i];
        } else {
          stats[i]+= cumulativePoints[i];
        }
      }
    }
  });
  if (gamesInDb.length > 0) return stats.map(v => v/gamesInDb.length);
  return stats;
};
