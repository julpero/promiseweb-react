import { HIDDEN_CARDS_MODE, IuiRoundInfo, RULE } from "./IuiGameOptions";
import { IuiAuth, IuiUserData, LOGIN_RESPONSE } from "./IuiUser";

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
  inActivePlayers?: string[],
  inActivePlayerSockets?: string[],
  playedBy?: string,
  creator: string,
}

export interface IuiGetGameListResponse extends IuiAuth {
  games: IuiGameListItem[],
}

export interface IuiJoinLeaveGameRequest extends IuiUserData {
  gameId: string,
  gamePassword: string,
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
