import { IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
import { leaveTheGame } from "../dbActions/joinAndLeaveGame";

export const leaveGame = async (leaveGameRequest: IuiJoinLeaveGameRequest): Promise<IuiJoinLeaveGameResponse> => {
  console.log("leaveGameRequest", leaveGameRequest);
  const response: IuiJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.notOk,
    loginStatus: LOGIN_RESPONSE.ok,
  };

  response.joinLeaveResult = await leaveTheGame(leaveGameRequest);

  return response;
};
