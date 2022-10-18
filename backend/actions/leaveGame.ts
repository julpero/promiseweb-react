import { IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { leaveTheGame } from "../dbActions/joinAndLeaveGame";

export const leaveGame = async (leaveGameRequest: IuiJoinLeaveGameRequest): Promise<IuiJoinLeaveGameResponse> => {
  // console.log("leaveGameRequest", leaveGameRequest);
  const response: IuiJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.notOk,
  };

  response.joinLeaveResult = await leaveTheGame(leaveGameRequest);

  return response;
};
