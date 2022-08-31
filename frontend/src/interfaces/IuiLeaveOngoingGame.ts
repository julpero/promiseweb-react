export interface IuiLeaveOngoingGameRequest {
  gameId: string,
  myId: string,
}

export enum LEAVE_ONGOING_GAME_RESULT {
  leaveOk,
  notOk,
}

export interface IuiLeaveOngoingGameResponse {
  gameId: string,
  myId: string,
  leaveStatus: LEAVE_ONGOING_GAME_RESULT,
}
