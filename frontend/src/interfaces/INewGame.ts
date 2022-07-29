export interface NewGame {
  newGameHumanPlayersCount: string;
  newGameStartRound: string;
  newGameTurnRound: string;
  newGameEndRound: string;
  newGameMyName: string;
  password1: string;
  password2: string;
  noEvenPromises: boolean;
  hidePromiseRound: boolean;
  onlyTotalPromise: boolean;
  mustTrump: boolean;
  hiddenTrump: boolean;
  speedPromise: boolean;
  privateSpeedGame: boolean;
  hiddenCardsMode: string;
  opponentPromiseCardValue: boolean;
  opponentGameCardValue: boolean;
  thisIsDemoGame: boolean;
}

export const initialNewGameValues: NewGame = {
  newGameHumanPlayersCount: "3",
  newGameStartRound: "10",
  newGameTurnRound: "1",
  newGameEndRound: "10",
  newGameMyName: "",
  password1: "",
  password2: "",
  noEvenPromises: false,
  hidePromiseRound: false,
  onlyTotalPromise: false,
  mustTrump: false,
  hiddenTrump: false,
  speedPromise: false,
  privateSpeedGame: false,
  hiddenCardsMode: "1",
  opponentPromiseCardValue: false,
  opponentGameCardValue: false,
  thisIsDemoGame: false,
}

export interface GameOptions {
  humanPlayersCount: number,
  botPlayersCount: number,
  startRound: number,
  turnRound: number,
  endRound: number,
  adminName: string,
  userPassword1: string,
  userPassword2: string,
  password: string,
  gameStatus: number,
  humanPlayers: HumanPlayer[],
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
  hiddenCardsMode: number,
}

export interface HumanPlayer {
  name: string,
  playerId: string,
  active: boolean,
}
