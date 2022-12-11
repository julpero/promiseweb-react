import { IuiRules } from "./IuiGameList";
import { IuiAuth, IuiUserData } from "./IuiUser";

export const PlayerCountColor = {
  3: "#ff990090",
  4: "#90EE9090",
  5: "#ADD8E690",
  6: "#ffffa090",
};

export interface IuiGameReport extends IuiAuth {
  players: string[],
  pointsPerRound: number[][],
  evenBreakingPointsPerRound: number[][],
  cumulativePointsPerRound: number[][],
  rounds: number[],
  cardsInRound: number[],
  pointsBig: number[], // rounds of 6-10 cards
  pointsSmall: number[], // rounds of 1-5 cards
  keepsBig: number[], // rounds of 6-10 cards
  keepsSmall: number[], // rounds of 1-5 cards
  smallStart?: number,
  smallEnd?: number,
  trumps: number[],
  bigCards: number[],
  smallCards: number[],
  otherCards: number[],
  promiseTimes?: number[],
  playTimes?: number[],
  roundType: string,
}

export interface IuiOneGameData {
  gameId: string,
  started: Date,
  position: number,
  points: number,
  roundCount: number,
  keepP: number,
  pOfWinPoints: number,
  playersInGame: number,
  scorePoints: number,
  opponents: string[],
  rules: IuiRules;
}

export interface IuiOnePlayerReportData {
  playerName: string,
  gamesData: IuiOneGameData[],
}

export interface IuiGetOneGameReportRequest extends IuiUserData {
  gameId: string,
}

export interface IuiOneGameReport extends IuiGameReport, IuiAuth {
  gameId: string,
}

export interface IuiOnePlayerReportRequest extends IuiUserData {
  playerName: string,
}

export interface IuiOnePlayerReportResponse extends IuiAuth {
  onePlayerReport: IuiOnePlayerReportData,
}
