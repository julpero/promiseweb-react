import mongoose from "mongoose";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
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

export const reCreateAllGamesStatistic = async (): Promise<boolean> => {
  const gameList = await GameOptions.find({
    gameStatus: GAME_STATUS.played,
  });
  for (let i = 0; i < gameList.length; i++) {
    const gameInDb = gameList[i];
    const gameIdStr = gameInDb._id.toString();
    console.log("starting to generate stats...", gameIdStr);
    gameInDb.gameStatistics = generateGameStats(gameInDb.game, true);
    const gameAfter = await gameInDb.save();
    if (!gameAfter) return false;
    console.log("... stats generated", gameIdStr);
  }

  return true;
};
