import { ICard, IGameOptions } from "../interfaces/IGameOptions";

export interface IBotTask {
  task: "promise" | "play",
  botPromise?: IBotPromise,
  botCardPlay?: IBotCardPlay
}

export interface IBotPromise {
  gameId: string,
  game?: IGameOptions,
  isBotPromiseTurn: boolean,
  botName?: string,
}

export interface IBotPromiseResponse {
  promise: number,
  promiseLogic: string,
  promiseChatMessage: string,
}

export interface IBotCardPlay {
  gameId: string,
  game?: IGameOptions,
  isBotCardPlayTurn: boolean,
  botName?: string,
}

export interface IBotCardPlayResponse {
  card: ICard,
  cardLogic: string,
  cardChatMessage: string,
}
