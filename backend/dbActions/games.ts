import GameOptions from "../models/GameOptions";
import { GAME_STATUS, IGameOptions } from "../interfaces/IGameOptions";

export const getGamesByStatus = async (gameStatus: GAME_STATUS): Promise<(IGameOptions & {id: string})[]> => {
  const games = await GameOptions.find(
    {
      gameStatus: gameStatus,
    }
  ).lean();

  const gameList: (IGameOptions & {id: string})[] = games.map((game) => {
    return({
      ...game,
      id: game._id.toString(),
    });
  });

  console.log("gameList", gameList);
  return gameList;
}
