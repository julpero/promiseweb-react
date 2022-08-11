import { CHECK_GAME_STATUS, ICheckIfOngoingGameRequest, ICheckIfOngoingGameResponse } from "../../frontend/src/interfaces/IuiCheckIfOngoingGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getLastGameByStatus, ILastGameStatusResponse } from "../dbActions/promiseweb";

export const checkIfOngoingGame = async (checkRequest: ICheckIfOngoingGameRequest): Promise<ICheckIfOngoingGameResponse> => {
  console.log("checkRequest", checkRequest);
  const playerId = checkRequest.myId;

  const response: ICheckIfOngoingGameResponse = {
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
