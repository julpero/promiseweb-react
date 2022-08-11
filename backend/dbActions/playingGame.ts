import { IGameOptions } from "../interfaces/IGameOptions";
import GameOptions from "../models/GameOptions";

export const getGame = async (gameIdStr: string): Promise<IGameOptions | null> => {
  const gameInDb = await GameOptions.findById(gameIdStr);
  return gameInDb;
};

export const getGameWithPlayer = async (gameIdStr: string, playerId: string): Promise<IGameOptions | null> => {
  const gameInDb = await GameOptions.findById(gameIdStr);
  if (gameInDb && gameInDb.humanPlayers.find(player => player.playerId === playerId)) {
    return gameInDb;
  } else {
    return null;
  }
};
