import { IuiAuth } from "./IuiUser";

export interface IuiJoinOngoingGame {
  gameId: string,
  playerId: string,
}

export interface IuiJoinOngoingGameResponse extends IuiAuth {
  joinOk: boolean,
  playerId: string,
  playerName: string,
}
