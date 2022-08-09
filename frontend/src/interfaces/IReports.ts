export interface IGameReport {
  players: string[],
  points: number[][],
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
}
