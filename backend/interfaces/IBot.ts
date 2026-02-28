import { ICard, IGameOptions } from "../interfaces/IGameOptions";
import { IuiMakePromiseRequest, IuiPlayCardRequest } from "../../frontend/src/interfaces/IuiPlayingGame";

export interface IBotTask {
  task: "promise" | "play",
  botPromise?: IBotPromise,
  botCardPlay?: IBotCardPlay
}

export interface IBotPromise {
  gameId: string,
  roundInd: number,
  game?: IGameOptions,
  isBotPromiseTurn: boolean,
  botName?: string,
}

export interface IBotPromiseResponse {
  promise: number,
  promiseLogic: string,
  promiseChatMessage: string,
  success?: boolean,
}

export interface IBotMakePromiseRequest extends IuiMakePromiseRequest {
  promiseLogic: string,
  promiseChatMessage: string,
  success: boolean,
}

export interface IBotCardPlay {
  gameId: string,
  roundInd: number,
  game?: IGameOptions,
  isBotCardPlayTurn: boolean,
  botName?: string,
}

export interface IBotCardPlayResponse {
  card: ICard,
  cardLogic: string,
  cardChatMessage: string,
  success?: boolean,
}

export interface IBotPlayCardRequest extends IuiPlayCardRequest {
  cardPlayLogic: string,
  cardPlayChatMessage: string,
  success: boolean,
}
