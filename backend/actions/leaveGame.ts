import { IJoinLeaveGameRequest, IJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IGameList";

export const leaveGame = async (leaveGameRequest: IJoinLeaveGameRequest): Promise<IJoinLeaveGameResponse> => {
  console.log("leaveGameRequest", leaveGameRequest);
  const response: IJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.ok
  }
  return response;
}
