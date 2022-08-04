import { LOGIN_RESPONSE } from "./IUser";

export interface INewGameForm {
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

export const initialNewGameValues: INewGameForm = {
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
}

export interface ICreateGameRequest extends INewGameForm {
  playerId: string,
}

export enum CREATE_GAME_STATUS {
  ok,
  notOk,
  notValidPlayerId,
}

export interface ICreateGameResponse {
  responseStatus: CREATE_GAME_STATUS,
  loginStatus: LOGIN_RESPONSE,
  newGameId: string,
}
