export enum GAME_STATUS {
  created = 0,
  onGoing = 1,
  played = 2,
  dismissed = 99,
}

export enum ROUND_STATUS {
  Initialized = 0,
  onGoing = 1,
  played = 2,
}

export enum HIDDEN_CARDS_MODE {
  normal = 0,
  onlyCardInCharge = 1,
  cardInChargeAndWinning = 2,
}

export enum RULE {
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

export interface IuiRoundInfo {
  startRound: number,
  turnRound: number,
  endRound: number,
}
