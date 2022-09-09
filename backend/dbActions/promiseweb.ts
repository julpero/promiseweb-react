import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IuiGameReport } from "../../frontend/src/interfaces/IuiReports";
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

export const hasOngoingOrCreatedGame = async (playerId: string): Promise<boolean> => {
  const onGoingOrCreatedGameCount = await GameOptions.countDocuments({
    gameStatus: { $lte: GAME_STATUS.onGoing },
    "humanPlayers.playerId": { $eq: playerId },
  });
  console.log("onGoingOrCreatedGameCount", onGoingOrCreatedGameCount);
  return onGoingOrCreatedGameCount > 0;
};

export const getLastGameByStatus = async (playerId: string, status: GAME_STATUS): Promise<ILastGameStatusResponse | null> => {
  try {
    const gamesInDb = await GameOptions.find({
      gameStatus: { $eq: status },
      "humanPlayers.playerId": { $eq: playerId },
    });
    if (gamesInDb && gamesInDb.length > 0) {
      const gameInDb = gamesInDb.pop();
      return {
        gameId: gameInDb?._id.toString() ?? "",
        asAPlayer: gameInDb?.humanPlayers.find(player => player.playerId === playerId)?.name ?? "",
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

export const getPlayerAvgPoints = async (playerName: string, roundsInGame: number): Promise<number[]> => {
  const gameStats: IuiGameReport[] = [];
  const stats: number[] = [];

  const gamesInDb = await GameOptions.aggregate([
    {
      $match: {
        gameStatus: {
          $eq: GAME_STATUS.played
        },
        "humanPlayers.name": {$eq: playerName}
      }
    }, {
      $addFields: {
        rounds: {
          $sum: [
            {
              $subtract: [
                "$startRound", "$turnRound"
              ]
            }, {
              $subtract: [
                "$endRound", "$turnRound"
              ]
            }, 1
          ]
        }
      }
    }, {
      $match: {
        rounds: { $eq: roundsInGame}
      }
    }
  ]);
  console.log("gamesInDb", gamesInDb);

  gamesInDb.forEach((gameInDb) => {
    gameStats.push(getGameReport(gameInDb, playerName));
  });
  for (let i = 0; i < gameStats.length; i++) {
    for (let j = 0; j < gameStats[i].pointsPerRound[0].length; j++) {
    // for (let j = 0; j < gameStats[i].points[0].length; j++) {
      if (i == 0) {
        stats[j] = 0;
      }
      stats[j]+= gameStats[i].pointsPerRound[0][j];
      // stats[j]+= gameStats[i].points[0][j];
    }
  }
  return stats.map(v => v/gameStats.length);
};
