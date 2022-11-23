import { IuiRules } from "./IuiGameList";
import { GAME_STATUS, ROUND_STATUS } from "./IuiGameOptions";
import { IuiAuth, IuiUserData } from "./IuiUser";

// import Card from "deck-of-cards";
// in frontend we have also a dummy card with value of 0
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 0;
export type Suite = "hearts" | "spades" | "diamonds" | "clubs" | "dummy";
export type PromiseValue = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10;

export interface IuiAnimationTimes {
  collectDelay: number,
  collectDuration: number,
  playDelay: number,
  playDuration: number,
}

export const ANIMATION_TIMES: IuiAnimationTimes = {
  collectDelay: 400,
  collectDuration: 900,
  playDelay: 300,
  playDuration: 800,
};

export const DEBUG_ANIMATION_TIMES: IuiAnimationTimes = {
  collectDelay: 50,
  collectDuration: 100,
  playDelay: 50,
  playDuration: 100,
};

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

export enum CARD_ALIGN_TYPE {
  left,
  right,
}

export interface IuiGameBeginsNotification {
  gameId: string,
  asAObserver: boolean,
}

export interface IuiObserver {
  name: string,
  waiting: boolean,
}

export interface IuiGetRoundRequest extends IuiUserData {
  gameId: string,
  roundInd: number,
}

export interface IuiGetRoundResponse extends IuiAuth {
  gameId: string,
  roundInd: number,
  userName: string,
  roundToPlayer: IuiRoundToPlayer,
  observers?: IuiObserver[],
}

export interface IuiGetGameInfoRequest extends IuiUserData {
  gameId: string,
}

export interface IuiPlayerStats {
  playerAvgPointsInRounds: number[],
}

export interface IuiParsedHumanPlayer {
  name: string,
  type: "human",
  playerStats: IuiPlayerStats,
  playedBy?: string,
}

export interface IuiGetGameInfoResponse extends IuiAuth {
  gameId: string,
  humanPlayersCount: number,
  computerPlayersCount: number,
  rules: IuiRules,
  humanPlayers: IuiParsedHumanPlayer[],
  hasPassword: boolean,
  /** index of rounds array */
  currentRound: number | null,
  reloaded: boolean,
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

export interface IuiHandValues {
  name: string,
  value: number,
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
  playerInCharge: string,
  promiseTable: IuiPromiseTable,
  cardInCharge: IuiCard | null,
  playerGoingToWinThisPlay: string | null,
  /** only current plays played cards */
  cardsPlayed: IuiCardPlayed[],
  gameOver: boolean,
  whoseTurn: string,
  isMyTurn: boolean,
  isMyPromiseTurn: boolean,
  handValues: IuiHandValues[] | null,
  obsGame: null, // TODO obsGameToRoundObj
  roundPhase: ROUND_PHASE,
}

export interface IuiMakePromiseRequest extends IuiUserData {
  gameId: string,
  roundInd: number,
  promise: number,
  isSpeedPromise: boolean,
}

export interface IuiMakePromiseResponse extends IuiAuth {
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

export interface IuiPlayCardRequest extends IuiUserData {
  gameId: string,
  roundInd: number,
  card: IuiCard,
  isSpeedPlay: boolean,
}

export interface IuiPlayCardResponse extends IuiAuth {
  playResponse: PLAY_CARD_RESPONSE,
  playerName: string,
  playedFromSlot: number,
  playTime: number,
  card: IuiCard,
  cardIndex: number,
  newPlayAfterHit: boolean,
  gameStatusAfterPlay: GAME_STATUS,
  roundStatusAfterPlay: ROUND_STATUS,
  winnerOfPlay?: string,
  winCount?: number,
  newDealer?: string,
  winnerOfGame?: string;
  playWentOver?: boolean,
}

export interface IuiCardPlayedNotification {
  playerName: string,
  playedFromSlot: number,
  playedCard: IuiCard | null,
  /** this index points to round where card is played, notice that if after that starts new round */
  currentRoundIndex: number,
  newPlayAfterHit: boolean,
  gameStatusAfterPlay: GAME_STATUS,
  roundStatusAfterPlay: ROUND_STATUS,
  winnerOfPlay?: string,
  winCount?: number,
  newDealer?: string,
}

export interface IuiEndGameRequest extends IuiUserData {
  gameId: string,
}
