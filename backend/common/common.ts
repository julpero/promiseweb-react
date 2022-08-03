import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { INewGame, IPlayerStats } from "../interfaces/IGameOptions";

export const getPlayerStats = async (gameInDb: INewGame, playerName: string): Promise<IPlayerStats> => {
  const statsGamesObj = {
      playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, (gameInDb.startRound-gameInDb.turnRound+1)+(gameInDb.endRound-gameInDb.turnRound))
  }
  return statsGamesObj;
}
