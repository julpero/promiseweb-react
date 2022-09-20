import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "../../frontend/src/interfaces/IuiJoinOngoingGame";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse } from "../../frontend/src/interfaces/IuiLeaveOngoingGame";
import { joinTheOngoingGame, leaveTheOngoingGame } from "../dbActions/joinAndLeaveGame";
import { getGame } from "../dbActions/playingGame";
import { IHumanPlayer } from "../interfaces/IGameOptions";

export const leaveOngoingGame = async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest): Promise<IuiLeaveOngoingGameResponse> => {
  const leaveOngoingGameResponse: IuiLeaveOngoingGameResponse = await leaveTheOngoingGame(leaveOngoingGameRequest);

  return leaveOngoingGameResponse;
};

export const joinOngoingGame = async (joinRequest: IuiJoinOngoingGame): Promise<IuiJoinOngoingGameResponse> => {
  const joinOngoingGameResponse: IuiJoinOngoingGameResponse = await joinTheOngoingGame(joinRequest);

  return joinOngoingGameResponse;
};

export const getHumanPlayer = async (gameId: string, playerName: string): Promise<IHumanPlayer | null> => {
  const gameInDb = await getGame(gameId);
  if (gameInDb) {
    return gameInDb.humanPlayers.find(player => player.name === playerName) ?? null;
  }
  return null;
};
