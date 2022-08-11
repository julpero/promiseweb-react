import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { IGameOptions, IHumanPlayer, IPlayer, IPlayerStats } from "../interfaces/IGameOptions";

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

export const getPlayerNameById = (players: IHumanPlayer[], playerId: string): string => {
  return players.find(player => player.playerId == playerId)?.name ?? "";
};
