import { IuiAuth, IuiUserData } from "./IuiUser";

export enum RENAME_STATUS {
  ok,
  nameExistsInGame,
  notOk,
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

export interface IuiReCreateGameStatisticsRequest extends IuiUserData {
  gameId: string,
}

export interface IuiReNameNickRequest extends IuiUserData {
  gameId: string,
  currentNick: string,
  newNick: string,
}

export interface IuiReNameNickResponse extends IuiAuth {
  renameStatus: RENAME_STATUS,
  gameList: IuiAdminGame[],
}
