export enum GAMESTATUS {
  Created = 0,
  OnGoing = 1,
  Played = 2,
  Dismissed = 99,
}

export enum ROUNDSTATUS {
  Initialized = 0,
  OnGoing = 1,
  Played = 2,
}

export enum HIDDENCARDSMODE {
  normal = 0,
  only_card_in_charge = 1,
  card_in_charge_and_winning = 2,
}

export type PlayerType = 'human';
export type CardSuit = "spades" | "hearts" | "diamonds" | "clubs";
export type CardRank = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IGameOptions {
  humanPlayersCount: number,
  botPlayersCount: number,
  startRound: number,
  turnRound: number,
  endRound: number,
  adminName: string,
  password: string,
  gameStatus: GAMESTATUS,
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
  thisIsDemoGame: boolean,
  hiddenCardsMode: HIDDENCARDSMODE,
  game: IGame,
  gameStarted: Date,
  gameStatistics: IGameStatistics,
  lastUpdate: Date, // obsolete
}

export interface INewGame extends IGameOptions {
  userPassword1: string,
  userPassword2: string,
}

export interface IHumanPlayer {
  name: string,
  playerId: string,
  active: boolean,
}

export interface IGame {
  playerOrder: IPlayer[],
  rounds: IRound[],
  lastTimeStamp: number,
}

// IPlayerOrderPlayer
export interface IPlayer {
  name: string,
  type: PlayerType,
}

export interface IGameStatistics {
  generated: number,
  playerStatistics: IPlayerStatistic[],
  winnerName: string,
  winnerPoints: number,
  roundsPlayed: number,
  bigRoundsPlayed: number,
  smallRoundsPlayed: number,
  cardsHit: number,
  spurtAndMelt: ISpurtAndMelt
}

export interface IPlayerStatistic {
  playerName: string,
  totalPoints: number,
  totalKeeps: number,
  bigPointsByZero: number,
  bigZeroKeepPromisesCount: number,
  bigZeroFailPromisesCount: number,
  smallPointsNotZero: number,
  smallNotZeroKeepPromisesCount: number,
  smallNotZeroFailPromisesCount: number,
  pointsPerKeeps: number,
  position: number,
  scorePoints: number,
  trumpsInGame: number,
  bigsCardsInGame: number,
  smallCardsInGame: number,
  otherCardsInGame: number,
}

export interface ISpurtAndMelt {
  spurtGap: number,
  spurtFrom: number,
  meltGap: number,
  meltFrom: number,
  melter: string,
}

export interface IRound {
  roundIndex: number,
  cardsInRound: number,
  dealerPositionIndex: number,
  starterPositionIndex: number,
  roundPlayers: IRoundPlayer[],
  trumpCard: ICard,
  totalPromise: number,
  cardsPlayed: ICardPlayed[][],
  roundStatus: ROUNDSTATUS,
}

export interface ICard {
  suit: CardSuit,
  rank: CardRank,
}

export interface IRoundPlayer extends IPlayer {
  cards: ICard[],
  promise: PromiseValue,
  promiseStarted: number,
  promiseMade: number,
  keeps: number,
  points: number,
  cardsToDebug: ICard[],
  speedPromisePoints: number,
  speedPromiseTotal: number,
}

export interface ICardPlayed {
  name: string,
  card: ICard,
  playedTime: number,
  playStarted: number,
}