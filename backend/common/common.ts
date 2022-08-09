import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { IGameOptions, IPlayer, IPlayerStats } from "../interfaces/IGameOptions";

export const getPlayerStats = async (roundCount: number, playerName: string): Promise<IPlayerStats> => {
  const statsGamesObj = {
    playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, roundCount)
  };
  return statsGamesObj;
};

export const getGameRoundCount = (game: IGameOptions): number => {
  return (game.startRound-game.turnRound+1)+(game.endRound-game.turnRound);
};

export const getPlayerNameInPlayerOrder = (player: IPlayer | string): string => {
  if (typeof player === "string") {
    return player;
  } else {
    return player.name;
  }
};
