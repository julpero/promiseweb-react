import { IuiUserData } from "./IuiUser";

export enum CHAT_TYPE {
  chat,
  promise,
  hit,
  disconnect,
  join,
  requestToJoin,
  allowedToJoin,
  rejectedToJoin,
  cancelledToJoin,
  requestToObserve,
  allowedToObserve,
  leavedObserving,
  cancelledToObserve,
  asAPlayer,
  leave,
  observe,
  promiseError,
  winnerOfPlay,
  roundStart,
  dealer,
  gameOver,
  winnerOfGame,
  overPoints,
}

export interface IuiChatObj extends IuiUserData {
  gameId: string,
  chatLine: string,
}

export interface IuiChatNotification {
  chatLine: string,
  type: CHAT_TYPE,
  focusedPlayer?: string,
}
