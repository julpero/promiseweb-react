import { IuiMakePromiseRequest, IuiMakePromiseResponse, PROMISE_RESPONSE } from "../../frontend/src/interfaces/IuiPlayingGame";
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

export const makePromiseToPlayer = async (makePromiseRequest: IuiMakePromiseRequest): Promise<IuiMakePromiseResponse> => {
  const { gameId, myId } = makePromiseRequest;
  const promiseResponse: IuiMakePromiseResponse = {
    promiseResponse: PROMISE_RESPONSE.unknownError,
  }
  const gameIndDb = await getGameWithPlayer(gameId, myId);
  if (gameIndDb) {
    if (gameIndDb.game.rounds.)
  }
  return promiseResponse;
};
