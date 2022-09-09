import mongoose from "mongoose";
import { generateGameStats } from "../common/statsFunctions";
import GameOptions from "../models/GameOptions";

export const reCreateGameStatistic = async (gameIdStr: string): Promise<boolean> => {
  if (!mongoose.isValidObjectId(gameIdStr)) return false;
  const gameInDb = await GameOptions.findById(gameIdStr);
  if (gameInDb) {
    gameInDb.gameStatistics = generateGameStats(gameInDb.game, true);
    const gameAfter = await gameInDb.save();
    if (gameAfter) return true;
  }

  return false;
};
