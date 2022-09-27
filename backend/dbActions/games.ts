import GameOptions from "../models/GameOptions";
import { IGameOptions } from "../interfaces/IGameOptions";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";

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

  // console.log("gameList", gameList);
  return gameList;
};
