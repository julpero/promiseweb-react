import { IuiAuth, IuiUserData } from "./IuiUser";

export interface IuiJoinOngoingGame extends IuiUserData {
  gameId: string,
  playAsPlayer: string,
}

export interface IuiJoinOngoingGameResponse extends IuiAuth {
  joinOk: boolean,
  playerName: string,
  playedBy?: string,
}

export interface IuiPlayerJoinedOnGoingGameNotification {
  joinerName: string,
  replacedPlayer: string,
  gameId: string,
}
