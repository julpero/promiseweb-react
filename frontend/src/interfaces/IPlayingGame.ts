// import Card from "deck-of-cards";
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14;
export type Suite = "hearts" | "spades" | "diamonds" | "clubs";
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IGetRoundRequest {
  gameId: string,
  myId: string,
  round: number,
}

export interface IGetRoundResponse {
  gameId: string,
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
  speedPromisePoints: number,
  speedPromiseTotal: number,
  playerStats: null, // TODO implement playerStats
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
  roundInd: number,
  cardsInRound: number,
  dealerPositionIndex: number,
  starterPositionIndex: number,
  myName: string,
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
