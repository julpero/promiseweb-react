import { CHECK_GAME_STATUS, ICheckGameRequest, ICheckGameResponse } from "../../frontend/src/interfaces/ICheckGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IGameOptions";
import { getLastGameByStatus, ILastGameStatusResponse } from "../dbActions/promiseweb";

export const checkGame = async (checkRequest: ICheckGameRequest): Promise<ICheckGameResponse> => {
  console.log("checkRequest", checkRequest);
  const playerId = checkRequest.myId;

  const response: ICheckGameResponse = {
    checkStatus: CHECK_GAME_STATUS.noGame,
    gameId: null,
    asAPlayer: null,
    currentRound: null,
  };

  const ongoingGameResponse: ILastGameStatusResponse | null = await getLastGameByStatus(playerId, GAME_STATUS.OnGoing);
  if (ongoingGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.onGoingGame;
    response.gameId = ongoingGameResponse.gameId;
    response.asAPlayer = ongoingGameResponse.asAPlayer;
    response.currentRound = ongoingGameResponse.currentRound;
    return response;
  }
  const joinedGameResponse: ILastGameStatusResponse | null= await getLastGameByStatus(playerId, GAME_STATUS.Created);
  if (joinedGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.joinedGame;
    response.gameId = joinedGameResponse.gameId;
    response.asAPlayer = joinedGameResponse.asAPlayer;
    response.currentRound = joinedGameResponse.currentRound;
    return response;
  }

  // TODO observed game

  return response;
};
