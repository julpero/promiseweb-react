import { IuiGetGamesResponse, IuiReCreateGameStatisticsRequest, IuiReNameNickRequest, IuiReNameNickResponse } from "../interfaces/IuiAdminOperations";
import { IuiChatNotification } from "../interfaces/IuiChat";
import { IuiCheckIfOngoingGameResponse } from "../interfaces/IuiCheckIfOngoingGame";
import { IuiGameListItem, IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse } from "../interfaces/IuiGameList";
import { IuiPlayedGamesReport } from "../interfaces/IuiGameReports";
import { IuiAllowPlayerToJoinRequest, IuiAllowPlayerToJoinResponse, IuiAllowPlayerToObserveRequest, IuiAllowPlayerToObserveResponse, IuiJoinOngoingGame, IuiJoinOngoingGameResponse, IuiObserveGameRequest, IuiObserveGameResponse, IuiPlayerJoinedOnGoingGameNotification, IuiPlayerObservingNotification, IuiPlayerWantsToJoinNotification, IuiPlayersWantsToObserveNotification } from "../interfaces/IuiJoinOngoingGame";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse } from "../interfaces/IuiLeaveOngoingGame";
import { IuiCreateGameRequest, IuiCreateGameResponse } from "../interfaces/IuiNewGame";
import {
  IuiCardPlayedNotification,
  IuiEndGameRequest,
  IuiGameBeginsNotification,
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
import { IuiGetOneGameReportRequest, IuiOneGameReport, IuiOnePlayerReportRequest, IuiOnePlayerReportResponse } from "../interfaces/IuiReports";
import { IuiAuth, IuiLoginRequest, IuiLoginResponse, IuiRefreshLoginResponse, IuiUserData } from "../interfaces/IuiUser";

export interface ServerToClientEvents {
  "new chat line": (chatObj: IuiChatNotification) => void;

  "new game created": (gameList: IuiGameListItem[]) => void;
  "game list updated": (gameList: IuiGameListItem[]) => void;
  "changes in game players": () => void;

  "game begins": (gameBeginsNotification: IuiGameBeginsNotification) => void;
  "promise made": (promiseNotification: IuiPromiseMadeNotification) => void;
  "card played": (cardPlayedNotification: IuiCardPlayedNotification) => void;

  "player wants to join": (playerWantsToJoinNotification: IuiPlayerWantsToJoinNotification) => void;
  "player joined on going game": (playerJoinedNotification: IuiPlayerJoinedOnGoingGameNotification) => void;
  "join request rejected": (gameId: string) => void;

  "players wants to observe": (playersWantsToObserveNotification: IuiPlayersWantsToObserveNotification) => void;
  "player observing game": (playerObservingNotification: IuiPlayerObservingNotification) => void;
  "observe request rejected": (gameId: string) => void;

  "hey": () => void;
}

export interface ClientToServerEvents {
  "user login": (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => void;
  "log out": (logOutRequest: IuiUserData) => void;
  "do refresh login": (loginRequest: IuiUserData, fn: (loginResponse: IuiRefreshLoginResponse) => void) => void;
  "check if ongoing game": (checkGameRequest: IuiUserData, fn: (response: IuiCheckIfOngoingGameResponse) => void) => void;
  "create game": (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => void;

  "leave ongoing game": (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest, fn: (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => void) => void;
  "join ongoing game": (joinOngoingGameRequest: IuiJoinOngoingGame, fn: (joinOngoingGameResponse: IuiJoinOngoingGameResponse) => void) => void;
  "allow to join game": (playerToJoinRequest: IuiAllowPlayerToJoinRequest, fn: (allowPlayerToJoinResponse: IuiAllowPlayerToJoinResponse) => void) => void,
  "cancel my join request": (cancelRequest: IuiUserData, fn: (simpleResponse: IuiAuth) => void) => void,

  "observe game": (observeGameRequest: IuiObserveGameRequest, fn: (observeGameResponse: IuiObserveGameResponse) => void) => void,
  "allow to observe game": (observeGameRequest: IuiAllowPlayerToObserveRequest, fn: (observeGameResponse: IuiAllowPlayerToObserveResponse) => void) => void,
  "cancel my observe request": (cancelRequest: IuiUserData, fn: (simpleResponse: IuiAuth) => void) => void,
  "stop observing": (cancelRequest: IuiUserData, fn: (simpleResponse: IuiAuth) => void) => void,

  "get open games": (gameListRequest: IuiUserData, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "get on going games": (gameListRequest: IuiUserData, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "join game": (joinGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "leave game": (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "check game": (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfo: IuiGetGameInfoResponse) => void) => void;

  "get round": (getRoundRequest: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => void;
  "make promise": (promiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => void;
  "make re-promise": (promiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => void;
  "play card": (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => void;
  "end game": (playCardRequest: IuiEndGameRequest) => void;

  "get report data": (request: IuiUserData, fn: (reportResponse: IuiPlayedGamesReport) => void) => void;
  "get game report": (reportRequest: IuiGetOneGameReportRequest, fn: (reportResponse: IuiOneGameReport) => void) => void;
  "get one player report": (playerReportRequest: IuiOnePlayerReportRequest, fn: (playerReportResponse: IuiOnePlayerReportResponse) => void) => void;

  "admin login": (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => void;
  "get games for admin": (getGamesRequest: IuiUserData, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create game statistics": (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "re-create all game statistics": (updateRequest: IuiUserData, fn: (gamesResponse: IuiGetGamesResponse) => void) => void,
  "convert old data": (updateRequest: IuiUserData, fn: (convertReport: string[]) => void) => void,
  "update logs from old data": (updateRequest: IuiUserData, fn: (convertReport: string[]) => void) => void,
  "rename nick": (reNameNickRequest: IuiReNameNickRequest, fn: (reNameNickResponse: IuiReNameNickResponse) => void) => void,
}
