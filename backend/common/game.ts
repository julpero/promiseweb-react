import { ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { IGameOptions } from "../interfaces/IGameOptions";

export const startRound = (gameInDb: IGameOptions, roundInd: number) => {
  if (gameInDb.game.rounds[roundInd].roundStatus === ROUND_STATUS.initialized) {
    gameInDb.game.rounds[roundInd].roundStatus = ROUND_STATUS.onGoing;
  }
};
