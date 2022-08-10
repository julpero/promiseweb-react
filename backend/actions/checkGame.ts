import { CHECK_GAME_STATUS, ICheckGameRequest, ICheckGameResponse } from "../../frontend/src/interfaces/ICheckGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { getLastGameByStatus } from "../dbActions/promiseweb";

export const checkGame = async (checkRequest: ICheckGameRequest): Promise<ICheckGameResponse> => {
  console.log("checkRequest", checkRequest);
  const playerId = checkRequest.myId;

  const response: ICheckGameResponse = {
    checkStatus: CHECK_GAME_STATUS.noGame,
  };

  const ongoingGameId = await getLastGameByStatus(playerId, GAME_STATUS.OnGoing);
  if (ongoingGameId) {
    response.checkStatus = CHECK_GAME_STATUS.onGoingGame;
    response.gameId = ongoingGameId;
    return response;
  }
  const joinedGameId = await getLastGameByStatus(playerId, GAME_STATUS.Created);
  if (ongoingGameId) {
    response.checkStatus = CHECK_GAME_STATUS.joinedGame;
    response.gameId = joinedGameId;
    return response;
  }

  // TODO: observed game

  return response;
};
