import { HIDDEN_CARDS_MODE, IuiRoundInfo, RULE } from "./IuiGameOptions";
import { IuiAuth, LOGIN_RESPONSE } from "./IuiUser";

export interface IuiRules {
  ruleList: RULE[],
  hiddenCardsMode: HIDDEN_CARDS_MODE,
  roundInfo: IuiRoundInfo,
}

export interface IuiGameListItem {
  created: Date,
  id: string,
  rules: IuiRules,
  humanPlayers: string[],
  imInTheGame: boolean,
  playerCount: number,
  gameHasPassword: boolean,
}

export interface IuiGetGameListRequest {
  myId: string,
}

export interface IuiGetGameListResponse extends IuiAuth {
  games: IuiGameListItem[],
}

export interface IuiJoinLeaveGameRequest {
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

export interface IuiJoinLeaveGameResponse extends IuiAuth {
  joinLeaveResult: JOIN_LEAVE_RESULT,
  loginStatus: LOGIN_RESPONSE,
  startGame?: boolean,
}
