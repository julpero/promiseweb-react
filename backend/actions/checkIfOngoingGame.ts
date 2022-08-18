import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameRequest, IuiCheckIfOngoingGameResponse } from "../../frontend/src/interfaces/IuiCheckIfOngoingGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getLastGameByStatus, ILastGameStatusResponse } from "../dbActions/promiseweb";

export const checkIfOngoingGame = async (checkRequest: IuiCheckIfOngoingGameRequest): Promise<IuiCheckIfOngoingGameResponse> => {
  // console.log("checkRequest", checkRequest);
  const playerId = checkRequest.myId;

  const response: IuiCheckIfOngoingGameResponse = {
    checkStatus: CHECK_GAME_STATUS.noGame,
    gameId: null,
    asAPlayer: null,
    currentRound: null,
  };

  const ongoingGameResponse: ILastGameStatusResponse | null = await getLastGameByStatus(playerId, GAME_STATUS.onGoing);
  if (ongoingGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.onGoingGame;
    response.gameId = ongoingGameResponse.gameId;
    response.asAPlayer = ongoingGameResponse.asAPlayer;
    response.currentRound = ongoingGameResponse.currentRound;
    return response;
  }
  const joinedGameResponse: ILastGameStatusResponse | null= await getLastGameByStatus(playerId, GAME_STATUS.created);
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
