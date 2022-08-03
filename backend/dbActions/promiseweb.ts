import { getGameReport } from "../common/reportFunctions";
import GameOptions from "../models/GameOptions";
import { GAME_STATUS, IGameOptions } from "../interfaces/IGameOptions";

export const insertNewGame = async (gameModel: IGameOptions): Promise<string> => {
  const createGameObj = new GameOptions(gameModel);
  const createdGame = await createGameObj.save();
  console.log("createdGame", createdGame);
  return createdGame._id.toString();
}

export const hasOngoingCreatedGame = async (playerId: string): Promise<boolean> => {
  let onGoingGames = 0;
  onGoingGames = await GameOptions.countDocuments({
    gameStatus: { $lte: GAME_STATUS.OnGoing },
    'humanPlayers.playerId': { $eq: playerId },
  });
  console.log("onGoingGames", onGoingGames);
  return onGoingGames > 0;
}

export const getPlayerAvgPoints = async (playerName: string, roundsInGame: number): Promise<number[]> => {
  const gameStats: any[] = [];
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
                  '$startRound', '$turnRound'
                ]
              }, {
                $subtract: [
                  '$endRound', '$turnRound'
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
}
