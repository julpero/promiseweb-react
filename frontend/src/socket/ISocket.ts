import { IuiCheckIfOngoingGameRequest, IuiCheckIfOngoingGameResponse } from "../interfaces/IuiCheckIfOngoingGame";
import { IuiGetGameListRequest, IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse } from "../interfaces/IuiGameList";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "../interfaces/IuiJoinOngoingGame";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse } from "../interfaces/IuiLeaveOngoingGame";
import { IuiCreateGameRequest, IuiCreateGameResponse } from "../interfaces/IuiNewGame";
import {
  IuiCardPlayedNotification,
  IuiGetGameInfoRequest,
  IuiGetGameInfoResponse,
  IuiGetRoundRequest,
  IuiGetRoundResponse,
  IuiMakePromiseRequest,
  IuiMakePromiseResponse,
  IuiPlayCardRequest,
  IuiPlayCardResponse,
  IuiPromiseMadeNotification,
} from "../interfaces/IuiPlayingGame";

export interface ServerToClientEvents {
  "new game created": (newGameId: string) => void;
  "game list updated": () => void;
  "game begins": (gameIdStr: string) => void;
  "new chat line": (chatLine: string) => void;
  "promise made": (promiseNotification: IuiPromiseMadeNotification) => void;
  "card played": (cardPlayedNotification: IuiCardPlayedNotification) => void;
  "hey": () => void;
}

export interface ClientToServerEvents {
  "check if ongoing game": (checkGameRequest: IuiCheckIfOngoingGameRequest, fn: (response: IuiCheckIfOngoingGameResponse) => void) => void;
  "create game": (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => void;
  "leave ongoing game": (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest, fn: (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => void) => void;
  "join ongoing game": (joinOngoingGameRequest: IuiJoinOngoingGame, fn: (joinOngoingGameResponse: IuiJoinOngoingGameResponse) => void) => void;
  "make promise": (promiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => void;
  "get games": (gameListRequest: IuiGetGameListRequest, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "join game": (joinGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "leave game": (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "check game": (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfo: IuiGetGameInfoResponse) => void) => void;
  "get round": (getRoundRequest: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => void;
  "play card": (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => void;
  "get report data": (request: null, fn: (reportResponse: IuiPlayedGamesReport) => void) => void;
}
