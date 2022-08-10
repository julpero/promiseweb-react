import { CHECK_GAME_STATUS, ICheckGameRequest, ICheckGameResponse } from "../../frontend/src/interfaces/ICheckGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { getLastGameByStatus } from "../dbActions/promiseweb";

export const checkGame = async (checkRequest: ICheckGameRequest): Promise<ICheckGameResponse> => {
  console.log("checkRequest", checkRequest);
  const playerId = checkRequest.myId;

  const response: ICheckGameResponse = {
    checkStatus: CHECK_GAME_STATUS.noGame,
    gameId: null,
    asAPlayer: null,
  };

  const ongoingGameResponse = await getLastGameByStatus(playerId, GAME_STATUS.OnGoing);
  if (ongoingGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.onGoingGame;
    response.gameId = ongoingGameResponse.gameId;
    response.asAPlayer = ongoingGameResponse.asAPlayer;
    return response;
  }
  const joinedGameResponse = await getLastGameByStatus(playerId, GAME_STATUS.Created);
  if (joinedGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.joinedGame;
    response.gameId = joinedGameResponse.gameId;
    response.asAPlayer = joinedGameResponse.asAPlayer;
    return response;
  }

  // TODO: observed game

  return response;
};
