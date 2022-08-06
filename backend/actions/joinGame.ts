import { IJoinLeaveGameRequest, IJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "../../frontend/src/interfaces/IGameList";

export const joinGame = async (joinGameRequest: IJoinLeaveGameRequest): Promise<IJoinLeaveGameResponse> => {
  const response: IJoinLeaveGameResponse = {
    joinLeaveResult: JOIN_LEAVE_RESULT.ok
  }
  return response;
}
