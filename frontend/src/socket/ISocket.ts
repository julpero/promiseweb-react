import { IuiCheckIfOngoingGameRequest, IuiCheckIfOngoingGameResponse } from "../interfaces/IuiCheckIfOngoingGame";
import { IuiGetGameListRequest, IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse } from "../interfaces/IuiGameList";
import { IuiCreateGameRequest, IuiCreateGameResponse } from "../interfaces/IuiNewGame";
import { IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiMakePromiseRequest, IuiMakePromiseResponse } from "../interfaces/IuiPlayingGame";

export interface ServerToClientEvents {
  "new game created": (newGameId: string) => void;
  "game list updated": () => void;
  "game begins": (gameIdStr: string) => void;
  "new chat line": (chatLine: string) => void;
}

export interface ClientToServerEvents {
  "check if ongoing game": (checkGameRequest: IuiCheckIfOngoingGameRequest, fn: (response: IuiCheckIfOngoingGameResponse) => void) => void;
  "create game": (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => void;
  "make promise": (promiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => void;
  "get games": (gameListRequest: IuiGetGameListRequest, fn: (gameList: IuiGetGameListResponse) => void) => void;
  "join game": (joinGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "leave game": (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (response: IuiJoinLeaveGameResponse) => void) => void;
  "check game": (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfo: IuiGetGameInfoResponse) => void) => void;
  "get round": (getRoundRequest: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => void;
}
