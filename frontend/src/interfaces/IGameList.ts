import { HIDDEN_CARDS_MODE, IRoundInfo, RULES } from "./IGameOptions";
import { LOGIN_RESPONSE } from "./IUser";

export interface IRules {
  ruleList: RULES[],
  hiddenCardsMode: HIDDEN_CARDS_MODE,
  roundInfo: IRoundInfo,
}

export interface IGameListItem {
  created: Date,
  id: string,
  rules: IRules,
  humanPlayers: string[],
  imInTheGame: boolean,
  playerCount: number,
  gameHasPassword: boolean,
}

export interface IGetGameListRequest {
  myId: string,
}

export interface IGetGameListResponse {
  games: IGameListItem[],
}

export interface IJoinLeaveGameRequest {
  myId: string,
  gameId: string,
  myName: string,
  password1: string,
  password2: string,
  gamePassword: string,
  method: "join" | "leave",
}

export enum JOIN_LEAVE_RESULT {
  ok,
  notOk,
  lastOk,
}

export interface IJoinLeaveGameResponse {
  joinLeaveResult: JOIN_LEAVE_RESULT,
  loginStatus: LOGIN_RESPONSE,
  startGame?: boolean,
}
