import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "../../frontend/src/interfaces/IuiLeaveOngoingGame";

export const leaveOngoingGame = async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest): Promise<IuiLeaveOngoingGameResponse> => {
  const leaveOngoingGameResponse: IuiLeaveOngoingGameResponse = {
    gameId: "",
    myId: "",
    leaveStatus: LEAVE_ONGOING_GAME_RESULT.notOk,
  };

  return leaveOngoingGameResponse;
};
