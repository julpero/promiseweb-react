export enum GAME_STATUS {
  Created = 0,
  OnGoing = 1,
  Played = 2,
  Dismissed = 99,
}

export enum ROUND_STATUS {
  Initialized = 0,
  OnGoing = 1,
  Played = 2,
}

export enum HIDDEN_CARDS_MODE {
  normal = 0,
  onlyCardInCharge = 1,
  cardInChargeAndWinning = 2,
}

export enum RULES {
  noEvenPromisesAllowed,
  hiddenPromiseRound,
  onlyTotalPromise,
  mustPlayTrump,
  hiddenTrump,
  speedPromise,
  privateSpeedGame,
  opponentPromiseCardValue,
  opponentGameCardValue,
}

export interface IRoundInfo {
  startRound: number,
  turnRound: number,
  endRound: number,
}
