import { IuiAuth, IuiUserData } from "./IuiUser";

export enum JOIN_GAME_STATUS {
  ok,
  failed,
  waiting,
}

export interface IuiJoinOngoingGame extends IuiUserData {
  gameId: string,
  playAsPlayer: string,
}

export interface IuiJoinOngoingGameResponse extends IuiAuth {
  joinStatus: JOIN_GAME_STATUS,
  playerName: string,
  playedBy?: string,
}

export interface IuiPlayerJoinedOnGoingGameNotification {
  joinerName: string,
  replacedPlayer: string,
  gameId: string,
}

export interface IuiPlayerWantsToJoinNotification {
  joinerName: string,
  replacedPlayer: string,
}

export interface IuiAllowPlayerToJoinRequest extends IuiUserData {
  joinerName: string,
  replacedPlayer: string,
  gameId: string,
  allow: boolean,
}

export interface IuiAllowPlayerToJoinResponse extends IuiAuth {
  joinOk: boolean,
  joinerName: string,
  replacedPlayer: string,
}
