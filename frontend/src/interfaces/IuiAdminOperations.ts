export interface IuiGetGamesRequest {
  userName: string,
}

export interface IuiAdminGame {
  gameId: string,
  played: Date,
  players: string[],
  statsGenerated: number,
}

export interface IuiGetGamesResponse {
  gameList: IuiAdminGame[],
}

export interface IuiReCreateGameStatisticsRequest {
  userName: string,
  gameId: string,
}
