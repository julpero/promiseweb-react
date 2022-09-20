import { IuiAuth, IuiUserData } from "./IuiUser";

export interface IuiJoinOngoingGame extends IuiUserData {
  gameId: string,
  playAsPlayer: string,
}

export interface IuiJoinOngoingGameResponse extends IuiAuth {
  joinOk: boolean,
  playerId: string,
  playerName: string,
}
