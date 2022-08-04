import { getPlayerAvgPoints } from "../dbActions/promiseweb";
import { IGameOptions, IPlayerStats } from "../interfaces/IGameOptions";

export const getPlayerStats = async (gameInDb: IGameOptions, playerName: string): Promise<IPlayerStats> => {
  const statsGamesObj = {
      playerAvgPointsInRounds: await getPlayerAvgPoints(playerName, (gameInDb.startRound-gameInDb.turnRound+1)+(gameInDb.endRound-gameInDb.turnRound))
  }
  return statsGamesObj;
}
