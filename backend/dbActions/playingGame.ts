import { IGameOptions } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";

export const getGame = async (gameIdStr: string): Promise<IGameOptions | null> => {
  const gameInDb = await GameOptions.findById(gameIdStr);
  return gameInDb;
};
