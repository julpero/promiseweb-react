export enum GAMESTATUS {
  Created = 0,
  OnGoing = 1,
  Played = 2,
  Dismissed = 99,
}

export enum HIDDENCARDSMODE {
  normal = 0,
  only_card_in_charge = 1,
  card_in_charge_and_winning = 2,
}

export type PlayerType = 'human';

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
  playerOrder: IPlayerOrderPlayer[],
  rounds: any[],
  lastTimeStamp: number,
}

export interface IPlayerOrderPlayer {
  name: string,
  type: PlayerType,
}

export interface IGameStatistics {
  generated: number,
  playerStatistics: [],
  winnerName: string,
  winnerPoints: number,
  roundsPlayed: number,
  bigRoundsPlayed: number,
  smallRoundsPlayed: number,
  cardsHit: number,
  spurtAndMelt: ISpurtAndMelt
}

export interface ISpurtAndMelt {
  spurtGap: number,
  spurtFrom: number,
  meltGap: number,
  meltFrom: number,
  melter: string,
}
