import { LOGIN_RESPONSE } from "./IuiUser";

export interface IuiNewGameForm {
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
  newGamePassword: string;
}

export const initialNewGameValues: IuiNewGameForm = {
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
  hiddenCardsMode: "0",
  opponentPromiseCardValue: false,
  opponentGameCardValue: false,
  thisIsDemoGame: false,
  newGamePassword: "",
};

export interface IuiCreateGameRequest extends IuiNewGameForm {
  playerId: string,
}

export enum CREATE_GAME_STATUS {
  ok,
  notOk,
  notValidPlayerId,
}

export interface IuiCreateGameResponse {
  responseStatus: CREATE_GAME_STATUS,
  loginStatus: LOGIN_RESPONSE,
  newGameId: string,
}
