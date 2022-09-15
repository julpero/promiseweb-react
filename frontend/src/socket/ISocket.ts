import { IuiAdminRequest, IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "../interfaces/IuiAdminOperations";
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
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "../interfaces/IuiReports";
import { IuiLoginRequest, IuiLoginResponse } from "../interfaces/IuiUser";

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
  "get open games": (gameListRequest: IuiGetGameListRequest, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "join game": (joinGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "leave game": (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "check game": (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfo: IuiGetGameInfoResponse) => void) => void;
  "get round": (getRoundRequest: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => void;
  "play card": (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => void;
  "get report data": (request: null, fn: (reportResponse: IuiPlayedGamesReport) => void) => void;
  "get game report": (reportRequest: IuiGetOneGameReportRequest, fn: (reportResponse: IuiOneGameReport) => void) => void;
  "admin login": (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => void;
  "get games for admin": (getGamesRequest: IuiAdminRequest, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create game statistics": (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create all game statistics": (updateRequest: IuiAdminRequest, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "convert old data": (updateRequest: IuiAdminRequest, fn: (convertReport: string[]) => void) => void,
}
