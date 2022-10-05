import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "../../frontend/src/interfaces/IuiCheckIfOngoingGame";
import { GAME_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";
import { getGame } from "../dbActions/playingGame";
import { getLastGameByStatus, ILastGameStatusResponse } from "../dbActions/promiseweb";

export const checkIfOngoingGame = async (userName: string): Promise<IuiCheckIfOngoingGameResponse> => {
  // console.log("checkRequest", checkRequest);

  const response: IuiCheckIfOngoingGameResponse = {
    checkStatus: CHECK_GAME_STATUS.noGame,
    gameId: null,
    asAPlayer: null,
    currentRound: null,
  };

  const ongoingGameResponse: ILastGameStatusResponse | null = await getLastGameByStatus(userName, GAME_STATUS.onGoing);
  if (ongoingGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.onGoingGame;
    response.gameId = ongoingGameResponse.gameId;
    response.asAPlayer = ongoingGameResponse.asAPlayer;
    response.currentRound = ongoingGameResponse.currentRound;
    return response;
  }
  const joinedGameResponse: ILastGameStatusResponse | null= await getLastGameByStatus(userName, GAME_STATUS.created);
  if (joinedGameResponse) {
    response.checkStatus = CHECK_GAME_STATUS.joinedGame;
    response.gameId = joinedGameResponse.gameId;
    response.asAPlayer = joinedGameResponse.asAPlayer;
    response.currentRound = joinedGameResponse.currentRound;
    return response;
  }

  return response;
};

export const checkIfObservableGame = async (gameId: string, observerName: string): Promise<boolean> => {
  const gameInDb = await getGame(gameId);
  if (gameInDb) {
    if (gameInDb.gameStatus !== GAME_STATUS.onGoing) return false;
    if (gameInDb.humanPlayers.some(player => player.name === observerName || player.playedBy === observerName)) return false;
    return true;
  }
  return false;
};
