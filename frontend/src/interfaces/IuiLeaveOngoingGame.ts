export interface IuiLeaveOngoingGameRequest {
  gameId: string,
  myId: string,
}

export enum LEAVE_ONGOING_GAME_RESULT {
  leaveOk,
  notOk,
  gameDismissed,
}

export interface IuiLeaveOngoingGameResponse {
  gameId: string,
  myId: string,
  leaverName: string,
  leaveStatus: LEAVE_ONGOING_GAME_RESULT,
}
