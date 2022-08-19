import { IuiRules } from "./IuiGameList";
import { GAME_STATUS, ROUND_STATUS } from "./IuiGameOptions";

// import Card from "deck-of-cards";
// in frontend we have also a dummy card with value of 0
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 0;
export type Suite = "hearts" | "spades" | "diamonds" | "clubs" | "dummy";
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export enum PLAY_CARD_RESPONSE {
  playOk,
  notMyTurn,
  invalidCard,
  notOk,
}

export enum PROMISE_RESPONSE {
  promiseOk,
  evenPromiseNotAllowed,
  notMyTurn,
  noPromisePhase,
  unknownError,
}

export enum ROUND_PHASE {
  initial,
  onPromises,
  onPlay,
  played,
}

export interface IuiGetRoundRequest {
  gameId: string,
  myId: string,
  roundInd: number,
}

export interface IuiGetRoundResponse {
  gameId: string,
  roundInd: number,
  myName: string,
  roundToPlayer: IuiRoundToPlayer,
}

export interface IuiGetGameInfoRequest {
  myId: string,
  gameId: string,
}

export interface IuiPlayerStats {
  playerAvgPointsInRounds: number[],
}

export interface IuiParsedHumanPlayer {
  name: string,
  type: "human",
  playerStats: IuiPlayerStats,
}

export interface IuiGetGameInfoResponse {
  gameId: string,
  humanPlayersCount: number,
  computerPlayersCount: number,
  rules: IuiRules,
  humanPlayers: IuiParsedHumanPlayer[],
  hasPassword: boolean,
  /** index of rounds array */
  currentRound: number | null,
  reloaded: boolean,
  eventInfo: any, // TODO
  thisIsDemoGame: boolean,
}

export interface IuiCard {
  suite: Suite,
  value: CardValue,
  rank: string,
  originalIndex?: number,
}

export interface IuiRoundPlayer {
  thisIsMe: boolean,
  dealer: boolean,
  name: string,
  promise: number | null,
  keeps: number,
  cardPlayed: IuiCard | null,
  speedPromisePoints: number | null,
  speedPromiseTotal: number | null,
}

export interface IuiCardPlayed {
  name: string,
  card: IuiCard,
}

export interface IuiPlayerPromise {
  promise: number | null,
  keep: number,
  points: number,
  speedPromisePoints: number,
  speedPromiseTotal: number,
}

export interface IuiRoundTotalPromise {
  cardsInRound: number,
  totalPromise: number | null,
}

export interface IuiPromiseTable {
  players: string[],
  promisesByPlayers: IuiPlayerPromise[][],
  rounds: IuiRoundTotalPromise[],
}

export interface IuiRoundToPlayer {
  cardsInRound: number,
  /** for the first play of the round */
  dealerPositionIndex: number,
  /** for the first play of the round */
  starterPositionIndex: number,
  myCards: IuiCard[],
  /** this contains indexes for playable cards of myCards array */
  playableCards: number[],
  players: IuiRoundPlayer[],
  trumpCard: IuiCard | null,
  myPlayedCard: IuiCard | null,
  playerInCharge: number,
  promiseTable: IuiPromiseTable,
  cardInCharge: IuiCard | null,
  playerGoingToWinThisPlay: string | null,
  /** only current plays played cards */
  cardsPlayed: IuiCardPlayed[],
  doReloadInit: boolean,
  newRound: boolean,
  gameOver: boolean,
  isMyTurn: boolean,
  isMyPromiseTurn: boolean,
  handValues: null, // TODO getHandValues(thisGame, roundInd),
  obsGame: null, // TODO obsGameToRoundObj
  roundPhase: ROUND_PHASE,
}

export interface IuiMakePromiseRequest {
  gameId: string,
  roundInd: number,
  myId: string,
  promise: number,
  isSpeedPromise: boolean,
}

export interface IuiMakePromiseResponse {
  promiseResponse: PROMISE_RESPONSE,
  promise: number,
  promiser: string,
  promiseTime: number,
}

export interface IuiPromiseMadeNotification {
  playerName: string,
  promise: number,
  currentRoundIndex: number,
}

export interface IuiPlayCardRequest {
  gameId: string,
  roundInd: number,
  myId: string,
  card: IuiCard,
  isSpeedPlay: boolean,
}

export interface IuiPlayCardResponse {
  playResponse: PLAY_CARD_RESPONSE,
  playerName: string,
  playTime: number,
  card: IuiCard,
  cardIndex: number,
  newPlayAfterHit: boolean,
  gameStatusAfterPlay: GAME_STATUS,
  roundStatusAfterPlay: ROUND_STATUS,
}

export interface IuiCardPlayedNotification {
  playerName: string,
  /** this index points to round where card is played, notice that if after that starts new round */
  currentRoundIndex: number,
  newPlayAfterHit: boolean,
  gameStatusAfterPlay: GAME_STATUS,
  roundStatusAfterPlay: ROUND_STATUS,
}
