import { IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "../interfaces/IuiAdminOperations";
import { IuiCheckIfOngoingGameResponse } from "../interfaces/IuiCheckIfOngoingGame";
import { IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse } from "../interfaces/IuiGameList";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { IuiAllowPlayerToJoinRequest, IuiAllowPlayerToJoinResponse, IuiJoinOngoingGame, IuiJoinOngoingGameResponse, IuiObserveGameRequest, IuiObserveGameResponse, IuiPlayerJoinedOnGoingGameNotification, IuiPlayerWantsToJoinNotification, IuiPlayerWantsToObserveNotification } from "../interfaces/IuiJoinOngoingGame";
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
import { IuiAuth, IuiLoginRequest, IuiLoginResponse, IuiRefreshLoginResponse, IuiUserData } from "../interfaces/IuiUser";

export interface ServerToClientEvents {
  "new game created": () => void;
  "game list updated": () => void;
  "changes in game players": () => void;
  "game begins": (gameIdStr: string) => void;
  "new chat line": (chatLine: string) => void;
  "promise made": (promiseNotification: IuiPromiseMadeNotification) => void;
  "card played": (cardPlayedNotification: IuiCardPlayedNotification) => void;
  "player wants to join": (playerWantsToJoinNotification: IuiPlayerWantsToJoinNotification) => void;
  "player wants to observe": (playerWantsToObserveNotification: IuiPlayerWantsToObserveNotification) => void;
  "player joined on going game": (playerJoinedNotification: IuiPlayerJoinedOnGoingGameNotification) => void;
  "join request rejected": (gameId: string) => void;
  "hey": () => void;
}

export interface ClientToServerEvents {
  "user login": (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => void;
  "do refresh login": (loginRequest: IuiUserData, fn: (loginResponse: IuiRefreshLoginResponse) => void) => void;
  "check if ongoing game": (checkGameRequest: IuiUserData, fn: (response: IuiCheckIfOngoingGameResponse) => void) => void;
  "create game": (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => void;

  "leave ongoing game": (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest, fn: (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => void) => void;
  "join ongoing game": (joinOngoingGameRequest: IuiJoinOngoingGame, fn: (joinOngoingGameResponse: IuiJoinOngoingGameResponse) => void) => void;
  "allow to join game": (playerToJoinRequest: IuiAllowPlayerToJoinRequest, fn: (allowPlayerToJoinResponse: IuiAllowPlayerToJoinResponse) => void) => void,
  "cancel my join request": (cancelRequest: IuiUserData, fn: (simpleResponse: IuiAuth) => void) => void,

  "observe game": (observeGameRequest: IuiObserveGameRequest, fn: (observeGameResponse: IuiObserveGameResponse) => void) => void,
  "allow to observe game": (observeGameRequest: IuiObserveGameRequest, fn: (observeGameResponse: IuiObserveGameResponse) => void) => void,

  "get open games": (gameListRequest: IuiUserData, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "get on going games": (gameListRequest: IuiUserData, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "join game": (joinGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "leave game": (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "check game": (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfo: IuiGetGameInfoResponse) => void) => void;

  "get round": (getRoundRequest: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => void;
  "make promise": (promiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => void;
  "play card": (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => void;
  "get report data": (request: IuiUserData, fn: (reportResponse: IuiPlayedGamesReport) => void) => void;
  "get game report": (reportRequest: IuiGetOneGameReportRequest, fn: (reportResponse: IuiOneGameReport) => void) => void;

  "admin login": (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => void;
  "get games for admin": (getGamesRequest: IuiUserData, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create game statistics": (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create all game statistics": (updateRequest: IuiUserData, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "convert old data": (updateRequest: IuiUserData, fn: (convertReport: string[]) => void) => void,
}
