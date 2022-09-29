import { IuiAuth, IuiUserData } from "./IuiUser";

export enum JOIN_GAME_STATUS {
  ok,
  failed,
  waiting,
}

export enum OBSERVE_RESPONSE {
  waiting,
  failed,
  onGoingGameExists,
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

export interface IuiObserveGameRequest extends IuiUserData {
  gameId: string,
}

export interface IuiObserveGameResponse extends IuiAuth {
  observeResponse: OBSERVE_RESPONSE,
}

export interface IuiAllowPlayerToObserveRequest extends IuiUserData {
  observerName: string,
  gameId: string,
  allow: boolean,
}

export interface IuiAllowPlayerToObserveResponse extends IuiAuth {
  observerName: string,
  observeOk: boolean,
}

export interface IuiPlayersWantsToObserveNotification {
  observerNames: string[],
}

export interface IuiPlayerObservingNotification {
  observerName: string,
}
