export interface IuiCheckIfOngoingGameRequest {
  myId: string,
}

export enum CHECK_GAME_STATUS {
  noGame,
  joinedGame,
  onGoingGame,
  observedGame,
}

export interface IuiCheckIfOngoingGameResponse {
  gameId: string | null,
  checkStatus: CHECK_GAME_STATUS,
  asAPlayer: string | null,
  currentRound: number | null,
}