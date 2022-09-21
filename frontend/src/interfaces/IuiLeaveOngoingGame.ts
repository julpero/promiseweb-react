import { IuiAuth, IuiUserData } from "./IuiUser";

export interface IuiLeaveOngoingGameRequest extends IuiUserData {
  gameId: string,
}

export enum LEAVE_ONGOING_GAME_RESULT {
  leaveOk,
  notOk,
  gameDismissed,
}

export interface IuiLeaveOngoingGameResponse extends IuiAuth {
  gameId: string,
  leaverName: string,
  leaveStatus: LEAVE_ONGOING_GAME_RESULT,
}
