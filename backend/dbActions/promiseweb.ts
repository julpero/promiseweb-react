import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { IGameReport } from "../../frontend/src/interfaces/IReports";

export interface ILastGameStatusResponse {
  gameId: string,
  asAPlayer: string,
}

export const insertNewGame = async (gameModel: IGameOptions): Promise<string> => {
  const createGameObj = new GameOptions(gameModel);
  const createdGame = await createGameObj.save();
  console.log("createdGame", createdGame);
  return createdGame._id.toString();
};

export const hasOngoingOrCreatedGame = async (playerId: string): Promise<boolean> => {
  const onGoingOrCreatedGameCount = await GameOptions.countDocuments({
    gameStatus: { $lte: GAME_STATUS.OnGoing },
    "humanPlayers.playerId": { $eq: playerId },
  });
  console.log("onGoingOrCreatedGameCount", onGoingOrCreatedGameCount);
  return onGoingOrCreatedGameCount > 0;
};

export const getLastGameByStatus = async (playerId: string, status: GAME_STATUS): Promise<ILastGameStatusResponse | null> => {
  const games = await GameOptions.find({
    gameStatus: { $eq: status },
    "humanPlayers.playerId": { $eq: playerId },
  });
  console.log("games", games);
  if (games) {
    const game = games.pop();
    return {
      gameId: game?._id.toString() ?? "",
      asAPlayer: game?.humanPlayers.find(player => player.playerId === playerId)?.name ?? "",
    } as ILastGameStatusResponse;
  } else {
    return null;
  }
};

export const getPlayerAvgPoints = async (playerName: string, roundsInGame: number): Promise<number[]> => {
  const gameStats: IGameReport[] = [];
  const stats: number[] = [];

  const gamesInDb = await GameOptions.aggregate([
    {
      $match: {
        gameStatus: {
          $eq: GAME_STATUS.Played
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

  gamesInDb.forEach(function(gameInDb) {
    gameStats.push(getGameReport(gameInDb.game, gameInDb.gameStatistics.playersStatistics, playerName));
  });
  for (let i = 0; i < gameStats.length; i++) {
    for (let j = 0; j < gameStats[i].points[0].length; j++) {
      if (i == 0) {
        stats[j] = 0;
      }
      stats[j]+= gameStats[i].points[0][j];
    }
  }
  return stats.map(v => v/gameStats.length);
};
