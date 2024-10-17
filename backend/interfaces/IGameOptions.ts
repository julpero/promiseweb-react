import { Rank, Suite } from "card-games-typescript";
import { GAME_STATUS, HIDDEN_CARDS_MODE, ROUND_STATUS } from "../../frontend/src/interfaces/IuiGameOptions";

export type PlayerType = "human";
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IGameOptions {
  humanPlayersCount: number,
  botPlayersCount: number,
  startRound: number,
  turnRound: number,
  endRound: number,
  adminName: string,
  password: string,
  gameStatus: GAME_STATUS,
  humanPlayers: IHumanPlayer[],
  createDateTime: Date,
  evenPromisesAllowed: boolean,
  visiblePromiseRound: boolean,
  onlyTotalPromise: boolean,
  freeTrump: boolean,
  hiddenTrump: boolean,
  speedPromise: boolean,
  privateSpeedGame: boolean,
  opponentPromiseCardValue: boolean,
  opponentGameCardValue: boolean,
  bonusNonEvenPromise: boolean,
  thisIsDemoGame: boolean,
  rePromise: boolean,
  hiddenRePromise: boolean,
  hiddenCardsMode: HIDDEN_CARDS_MODE,
  game: IGame,
  gameStarted: Date,
  gameStatistics?: IGameStatistics,
  oldId?: string,
}

export interface IHumanPlayer {
  name: string,
  active: boolean,
  playerStats?: IPlayerStats,
  playedBy?: string,
}

export interface IPlayerStats {
  playerAvgPointsInRounds: number[],
}

export interface IGame {
  playerOrder: IPlayer[],
  rounds: IRound[],
  lastTimeStamp: number,
}

// IPlayerOrderPlayer
export interface IPlayer {
  name: string,
  type?: PlayerType,
}

export interface IGameStatistics {
  generated: number,
  playersStatistics: IPlayerStatistic[],
  winnerName: string,
  winnerPoints: number,
  roundsPlayed: number,
  bigRoundsPlayed: number,
  smallRoundsPlayed: number,
  cardsHit: number,
  spurtAndMelt: ISpurtAndMelt
}

export interface IGameInfoForStats {
  totalKeeps: number,
  bigPointsByZero: number,
  bigZeroKeepPromisesCount: number,
  bigZeroFailPromisesCount: number,
  smallPointsNotZero: number,
  smallNotZeroKeepPromisesCount: number,
  smallNotZeroFailPromisesCount: number,
  totalPointsBig: number,
  totalPointsSmall: number,
  totalKeepsBig: number,
  totalKeepsSmall: number,
}

export interface IGameHandCardsForStats {
  trumpsInGame: number,
  bigsCardsInGame: number,
  smallCardsInGame: number,
  otherCardsInGame: number,
}

export interface IPlayerStatistic extends IGameInfoForStats, IGameHandCardsForStats {
  playerName: string,
  totalPoints: number,
  pointsPerKeeps: number,
  position: number,
  scorePoints: number,
  playTime: number,
  promiseTime: number,
  pointsPerRound: number[],
  cumulativePointsPerRound: number[],
  evenBreakingPointsPerRound: number[],
}

export interface ISpurtAndMelt {
  spurtGap: number | null,
  spurtFrom: number | null,
  meltGap: number | null,
  meltFrom: number | null,
  melter: string | null,
}

export interface IRound {
  roundIndex: number,
  cardsInRound: number,
  dealerPositionIndex: number,
  starterPositionIndex: number,
  roundPlayers: IRoundPlayer[],
  trumpCard: ICard,
  totalPromise: number | null,
  cardsPlayed: ICardPlayed[][],
  roundStatus: ROUND_STATUS,
}

export interface ICard {
  suite: Suite,
  value: CardValue,
  rank: Rank,
}

export interface IRoundPlayer extends IPlayer {
  cards: ICard[],
  promise: PromiseValue | null,
  promiseStarted: number | null,
  promiseMade: number | null,
  keeps: number,
  points: number | null,
  cardsToDebug: ICard[],
  speedPromisePoints: number | null,
  speedPromiseTotal: number | null,
  evenBreakingBonus: number | null,
}

export interface ICardPlayed {
  name: string,
  card: ICard,
  playedTime: number,
  playStarted: number,
}

export interface IPlayerInTurn extends IPlayer {
  index: number,
}

export interface IPromiser extends IPlayer {
  index: number,
}
