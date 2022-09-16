import { IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IuiGameList";
import { LOGIN_RESPONSE } from "../../frontend/src/interfaces/IuiUser";
import { joinOnGame } from "../dbActions/joinAndLeaveGame";

export const joinGame = async (joinGameRequest: IuiJoinLeaveGameRequest): Promise<IuiJoinLeaveGameResponse> => {
  console.log("joinGameRequest", joinGameRequest);
  const response: IuiJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.notOk,
    loginStatus: LOGIN_RESPONSE.ok,
  };

  response.joinLeaveResult = await joinOnGame(joinGameRequest);

  return response;
};
