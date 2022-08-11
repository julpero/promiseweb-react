import { IRules } from "./IGameList";

// import Card from "deck-of-cards";
// in frontend we have also a dummy card with value of 0
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 0;
export type Suite = "hearts" | "spades" | "diamonds" | "clubs" | "dummy";
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IGetRoundRequest {
  gameId: string,
  myId: string,
  round: number,
}

export interface IGetRoundResponse {
  gameId: string,
  roundInd: number,
  myName: string,
  roundToPlayer: IRoundToPlayer,
}

export interface IGetGameInfoRequest {
  myId: string,
  gameId: string,
}

export interface IPlayerStats {
  playerAvgPointsInRounds: number[],
}

export interface IParsedHumanPlayer {
  name: string,
  type: "human",
  playerStats: IPlayerStats,
}

export interface IGetGameInfoResponse {
  gameId: string,
  humanPlayersCount: number,
  computerPlayersCount: number,
  rules: IRules,
  humanPlayers: IParsedHumanPlayer[],
  hasPassword: boolean,
  /** index of rounds array */
  currentRound: number | null,
  reloaded: boolean,
  eventInfo: any, // TODO
  thisIsDemoGame: boolean,
}

export interface ICard {
  suite: Suite,
  value: CardValue,
}

export interface IRoundPlayer {
  thisIsMe: boolean,
  dealer: boolean,
  name: string,
  promise: number | null,
  keeps: number,
  cardPlayed: ICard | null,
  speedPromisePoints: number | null,
  speedPromiseTotal: number | null,
}

export interface ICardPlayed {
  name: string,
  card: ICard,
}

export interface IPlayerPromise {
  promise: number | null,
  keep: number,
  points: number,
  speedPromisePoints: number,
  speedPromiseTotal: number,
}

export interface IRoundTotalPromise {
  cardsInRound: number,
  totalPromise: number | null,
}

export interface IPromiseTable {
  players: string[],
  promisesByPlayers: IPlayerPromise[],
  rounds: IRoundTotalPromise[],
}

export interface IRoundToPlayer {
  cardsInRound: number,
  dealerPositionIndex: number,
  starterPositionIndex: number,
  myCards: ICard[],
  players: IRoundPlayer[],
  trumpCard: ICard | null,
  playerInCharge: number,
  promiseTable: IPromiseTable,
  cardInCharge: ICard | null,
  playerGoingToWinThisPlay: string | null,
  cardsPlayed: ICardPlayed[][],
  doReloadInit: boolean,
  newRound: boolean,
  gameOver: boolean,
  handValues: null, // TODO getHandValues(thisGame, roundInd),
  obsGame: null, // TODO obsGameToRoundObj
}
