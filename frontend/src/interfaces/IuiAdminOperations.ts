import { IuiAuth } from "./IuiUser";

export interface IuiAdminRequest {
  uuid: string,
  userName: string,
}

export interface IuiAdminGame {
  gameId: string,
  played: Date,
  players: string[],
  statsGenerated: number,
}

export interface IuiGetGamesResponse extends IuiAuth {
  gameList: IuiAdminGame[],
}

export interface IuiReCreateGameStatisticsRequest extends IuiAdminRequest {
  gameId: string,
}
