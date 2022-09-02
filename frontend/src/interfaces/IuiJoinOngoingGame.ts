export interface IuiJoinOngoingGame {
  gameId: string,
  playerId: string,
}

export interface IuiJoinOngoingGameResponse {
  joinOk: boolean,
  playerId: string,
  playerName: string,
}
