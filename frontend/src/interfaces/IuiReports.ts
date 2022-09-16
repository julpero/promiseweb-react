import { IuiAuth, IuiUserData } from "./IuiUser";

export interface IuiGameReport extends IuiAuth {
  players: string[],
  pointsPerRound: number[][],
  cumulativePointsPerRound: number[][],
  rounds: number[],
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

export interface IuiGetOneGameReportRequest extends IuiUserData {
  gameId: string,
}

export interface IuiOneGameReport extends IuiGameReport, IuiAuth {
  gameId: string,
}
