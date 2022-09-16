import { IuiAuth } from "./IuiUser";

export interface IuiLeaveOngoingGameRequest {
  gameId: string,
  myId: string,
}

export enum LEAVE_ONGOING_GAME_RESULT {
  leaveOk,
  notOk,
  gameDismissed,
}

export interface IuiLeaveOngoingGameResponse extends IuiAuth {
  gameId: string,
  myId: string,
  leaverName: string,
  leaveStatus: LEAVE_ONGOING_GAME_RESULT,
}
