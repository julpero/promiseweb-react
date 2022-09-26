import { IuiAuth, IuiUserData } from "./IuiUser";

export interface IuiNewGameForm {
  newGameHumanPlayersCount: string;
  newGameStartRound: string;
  newGameTurnRound: string;
  newGameEndRound: string;
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

export interface IuiCreateGameRequest extends IuiNewGameForm, IuiUserData {
}

export enum CREATE_GAME_STATUS {
  ok,
  notOk,
  onGoingGame,
}

export interface IuiCreateGameResponse extends IuiAuth {
  responseStatus: CREATE_GAME_STATUS,
  newGameId: string,
}
