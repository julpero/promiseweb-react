import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse } from "../../frontend/src/interfaces/IuiLeaveOngoingGame";
import { leaveTheOngoingGame } from "../dbActions/joinAndLeaveGame";

export const leaveOngoingGame = async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest): Promise<IuiLeaveOngoingGameResponse> => {
  const leaveOngoingGameResponse: IuiLeaveOngoingGameResponse = await leaveTheOngoingGame(leaveOngoingGameRequest);

  return leaveOngoingGameResponse;
};
