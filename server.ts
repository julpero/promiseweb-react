import express from "express";
import { Application, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import connectDB from "./backend/config/db";
import { ClientToServerEvents, ServerToClientEvents } from "./frontend/src/socket/ISocket";
import * as csm from "./backend/socket/clientSocketMapper";

import { createGame } from "./backend/actions/createGame";
import { getOpenGamesList } from "./backend/actions/getGameList";
import { joinGame } from "./backend/actions/joinGame";
import { leaveGame } from "./backend/actions/leaveGame";
import { checkIfObservableGame, checkIfOngoingGame } from "./backend/actions/checkIfOngoingGame";
import { CREATE_GAME_STATUS, IuiCreateGameRequest, IuiCreateGameResponse } from "./frontend/src/interfaces/IuiNewGame";
import { IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "./frontend/src/interfaces/IuiGameList";
import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "./frontend/src/interfaces/IuiCheckIfOngoingGame";
import { CHAT_TYPE, IuiChatNotification, IuiChatObj } from "./frontend/src/interfaces/IuiChat";
import { IuiCardPlayedNotification, IuiEndGameRequest, IuiGameBeginsNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiMakePromiseRequest, IuiMakePromiseResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification, PLAY_CARD_RESPONSE, PROMISE_RESPONSE } from "./frontend/src/interfaces/IuiPlayingGame";
import { getGameInfo, getRound, makePromise, playCard } from "./backend/actions/playingGame";
import { GAME_STATUS, ROUND_STATUS } from "./frontend/src/interfaces/IuiGameOptions";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "./frontend/src/interfaces/IuiLeaveOngoingGame";
import { leaveOngoingGame, joinOngoingGame, getHumanPlayer } from "./backend/actions/joinLeaveOngoingGame";
import { IuiAllowPlayerToJoinRequest, IuiAllowPlayerToJoinResponse, IuiJoinOngoingGame, IuiJoinOngoingGameResponse, IuiObserveGameRequest, IuiObserveGameResponse, IuiPlayerJoinedOnGoingGameNotification, IuiPlayerWantsToJoinNotification, JOIN_GAME_STATUS, OBSERVE_RESPONSE, IuiAllowPlayerToObserveRequest, IuiAllowPlayerToObserveResponse } from "./frontend/src/interfaces/IuiJoinOngoingGame";
import { IuiPlayedGamesReport } from "./frontend/src/interfaces/IuiGameReports";
import { getOneGameReportData, getOnePlayerReport, getReportData } from "./backend/actions/reports";
import { IuiGetOneGameReportRequest, IuiOneGameReport, IuiOnePlayerReportRequest, IuiOnePlayerReportResponse } from "./frontend/src/interfaces/IuiReports";
import { IuiAuth, IuiLoginRequest, IuiLoginResponse, IuiRefreshLoginResponse, IuiUserData, LOGIN_RESPONSE } from "./frontend/src/interfaces/IuiUser";
import { handleLoginRequest } from "./backend/actions/login";
import { IuiGetGamesResponse, IuiReCreateGameStatisticsRequest, IuiReNameNickRequest, IuiReNameNickResponse, RENAME_STATUS } from "./frontend/src/interfaces/IuiAdminOperations";
import { convertOldData, getGamesForAdmin, reCreateAllGameStats, reCreateGameStats, reNameNick, updateRulesFromOldData } from "./backend/actions/adminActions";
import { getValidToken, isUserAuthenticated, isValidAdminUser, isValidUser, signUserToken } from "./backend/common/userValidation";
import { deletePing, doPing } from "./backend/actions/pingHandler";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

app.use(cors());
app.use(express.json());

// app.use("/", express.static(path.join(__dirname, "/build")));
// app.use(express.static(path.join(__dirname, "../build")));
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
} else {
  app.use(express.static(path.join(__dirname, "./build")));
}

// // Default
app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html");
});


const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server listening on *:" + PORT);
  });

  app.get("/ping", async (req: Request, res: Response) => {
    const now = Date.now();
    const q = req.query.ver;
    const ver = q ? process.version : "";
    // console.time("ping");
    const pingPong = await doPing(now);
    if (pingPong.returnId) {
      const deleteOk = await deletePing(pingPong.returnId);
      if (deleteOk) {
        // console.timeEnd("ping");
        res.send({now: now, ver: ver});
        return null;
      }
    }
    // console.timeEnd("ping");
    res.sendStatus(500);
  });

  io.on("connection", (socket: Socket) => {
    console.log("connected!", socket.id);

    socket.on("disconnect", () => {
      console.warn("user disconnected", socket.id);
      let gameIdStr: string | undefined = undefined;
      const userName = csm.getUserNameFromMapBySocket(socket.id) ?? "unknown";
      if (userName !== "unknown") {
        gameIdStr = csm.getUserGameFromMap(userName);
        console.log(`on disconnect - mapped username ${userName} to gameId ${gameIdStr}`);
      }
      if (gameIdStr) {
        const chatLine = "player " + userName + " disconnected";
        // console.log("chat", chatLine);
        const chatObj: IuiChatNotification = {
          chatLine: chatLine,
          focusedPlayer: userName,
          type: CHAT_TYPE.disconnect,
        };
        io.to(gameIdStr).emit("new chat line", chatObj);
      }
      csm.removeUserSocketsAndGames(userName);
      csm.unsetUserAsAdmin(userName);
      csm.clearWaiting(userName);
      // disconnect must leave observing status as it was because we allow refresh login to observers too
    });

    //#region LOGIN SOCKETS
    socket.on("user login", async (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => {
      // console.log("user login", loginRequest);
      const {uuid, userName, password1} = loginRequest;
      if (!isValidUser(userName, password1, uuid)) return null;

      const loginResponse = await handleLoginRequest(loginRequest, false);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
        const timestamp = Date.now();
        const newToken = signUserToken(userName, uuid, timestamp);
        loginResponse.token = newToken;
        loginResponse.isAuthenticated = true;
        csm.addUserToMap(userName, socket.id, timestamp);
      } else {
        loginResponse.isAuthenticated = false;
      }
      fn(loginResponse);
    });

    socket.on("log out", async (logOutRequest: IuiUserData) => {
      const {uuid, userName, token} = logOutRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        csm.removeUserSocketsAndGames(userName);
        csm.unsetUserAsAdmin(userName);
        csm.clearWaiting(userName);
        csm.clearObserving(userName);
      }
    });

    socket.on("do refresh login", async (loginRequest: IuiUserData, fn: (loginResponse: IuiRefreshLoginResponse) => void) => {
      // console.log("do refresh login", loginRequest);
      const {uuid, userName, token} = loginRequest;
      const validToken = getValidToken(token);
      console.log("validToken?.timestamp", validToken?.timestamp);
      console.log("username", validToken?.userName ?? "");
      console.log("timestamp fo username", csm.getLastTimestamp(validToken?.userName ?? ""));
      if (validToken && validToken.uuid === uuid && userName === "dummy" && validToken.timestamp === csm.getLastTimestamp(validToken.userName)) {
        const userNameFromToken = validToken.userName;
        const timestamp = Date.now();
        csm.removeUserSocketsAndGames(userNameFromToken);
        csm.setLastTimestamp(userNameFromToken, socket.id, timestamp);
        const newToken = signUserToken(userNameFromToken, uuid, timestamp);
        const loginResponse: IuiRefreshLoginResponse = {
          isAuthenticated: true,
          myName: userNameFromToken,
          loginStatus: LOGIN_RESPONSE.ok,
          token: newToken,
        };
        fn(loginResponse);
        return null;
      } else {
        fn({
          isAuthenticated: false,
          myName: "",
          loginStatus: LOGIN_RESPONSE.passwordFails,
          token: "",
        } as IuiRefreshLoginResponse);
        return null;
      }
    });
    //#endregion LOGIN SOCKETS

    //#region ADMIN SOCKETS
    socket.on("admin login", async (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => {
      // console.log("admin login", loginRequest);
      const {uuid, userName, password1, token} = loginRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (password1.length < 3) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);

      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);
      if (isAuthenticated) {
        const loginResponse = await handleLoginRequest(loginRequest, true);
        if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
          const timestamp = Date.now();
          csm.setUserAsAdmin(userName, socket.id, uuid, timestamp);
          const newToken = signUserToken(userName, uuid, timestamp);
          loginResponse.isAuthenticated = true;
          loginResponse.token = newToken;
        } else {
          csm.unsetUserAsAdmin(userName);
        }
        fn(loginResponse);
      } else {
        fn({
          loginStatus: LOGIN_RESPONSE.passwordFails,
          isAuthenticated: false,
        } as IuiLoginResponse);
        return null;
      }
    });

    socket.on("get games for admin", async (getGamesRequest: IuiUserData, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      // console.log("get games for admin", getGamesRequest);
      const {uuid, userName, token} = getGamesRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        getGamesResponse.isAuthenticated = true;
        getGamesResponse.token = newToken;
        fn(getGamesResponse);
      } else {
        fn({
          isAuthenticated: false,
          gameList: [],
        } as IuiGetGamesResponse);
      }
    });

    socket.on("re-create game statistics", async (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      // console.log("re-create game statistics", reCreateGameStatisticsRequest);
      const {uuid, userName, token} = reCreateGameStatisticsRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        await reCreateGameStats(reCreateGameStatisticsRequest);
        const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        getGamesResponse.isAuthenticated = true;
        getGamesResponse.token = newToken;
        fn(getGamesResponse);
      } else {
        fn({
          isAuthenticated: false,
          gameList: [],
        } as IuiGetGamesResponse);
        return null;
      }
    });

    socket.on("re-create all game statistics", async (reCreateAllGameStatisticsRequest: IuiUserData, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      // console.log("re-create all game statistics", reCreateAllGameStatisticsRequest);
      const {uuid, userName, token} = reCreateAllGameStatisticsRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        await reCreateAllGameStats(userName);
        const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        getGamesResponse.isAuthenticated = true;
        getGamesResponse.token = newToken;
        fn(getGamesResponse);
      } else {
        fn({
          isAuthenticated: false,
          gameList: [],
        } as IuiGetGamesResponse);
        return null;
      }
    });

    socket.on("convert old data", async (convertRequest: IuiUserData, fn: (response: string[]) => void) => {
      // console.log("convert old data", convertRequest);
      const {uuid, userName, token} = convertRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const response = await convertOldData(userName);
        fn(response);
      } else {
        return null;
      }
    });

    socket.on("update logs from old data", async (convertRequest: IuiUserData, fn: (response: string[]) => void) => {
      // console.log("update logs from old data", convertRequest);
      const {uuid, userName, token} = convertRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const response = await updateRulesFromOldData(userName);
        fn(response);
      } else {
        return null;
      }
    });

    socket.on("rename nick", async (reNameNickRequest: IuiReNameNickRequest, fn: (reNameNickResponse: IuiReNameNickResponse) => void) => {
      // console.log("reNameNickRequest", reNameNickRequest);
      const {uuid, userName, token, currentNick, newNick} = reNameNickRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!newNick || !currentNick || currentNick.trim() === newNick.trim() || currentNick.trim().length < 3) {
          fn({
            isAuthenticated: true,
            token: token,
            renameStatus: RENAME_STATUS.notOk,
          } as IuiReNameNickResponse);
          return null;
        }
        const renameStatus = await reNameNick(reNameNickRequest);
        const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          isAuthenticated: true,
          token: newToken,
          renameStatus: renameStatus,
          gameList: getGamesResponse.gameList,
        } as IuiReNameNickResponse);
        return null;
      } else {
        fn({
          isAuthenticated: false,
        } as IuiReNameNickResponse);
        return null;
      }
    });
    //#endregion ADMIN SOCKETS

    //#region BEFORE GAME SOCKETS
    socket.on("create game", async (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => {
      const {uuid, userName, token} = createGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const createGameResponse: IuiCreateGameResponse = await createGame(createGameRequest);
        const timestamp = Date.now();
        if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
          const gameIdStr = createGameResponse.newGameId;
          socket.join(gameIdStr);
          csm.addUserToMap(userName, socket.id, timestamp, gameIdStr);

          const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(createGameRequest, GAME_STATUS.created);
          io.to("waiting lobby").emit("new game created", getGameListResponse.games);
        }
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        createGameResponse.isAuthenticated = true;
        createGameResponse.token = newToken;
        fn(createGameResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiCreateGameResponse);
        return null;
      }
    });

    socket.on("get open games", async (getGameListRequest: IuiUserData, fn: (getGameListResponse: IuiGetGameListResponse) => void) => {
      const {userName, uuid, token} = getGameListRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(getGameListRequest, GAME_STATUS.created);
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        getGameListResponse.isAuthenticated = true;
        getGameListResponse.token = newToken;
        fn(getGameListResponse);
      } else {
        fn({
          isAuthenticated: false,
          games: [],
        } as IuiGetGameListResponse);
        return null;
      }
    });

    socket.on("get on going games", async (getGameListRequest: IuiUserData, fn: (getGameListResponse: IuiGetGameListResponse) => void) => {
      const {userName, uuid, token} = getGameListRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(getGameListRequest, GAME_STATUS.onGoing);
        for (let i = 0; i < getGameListResponse.games.length; i++) {
          const game = getGameListResponse.games[i];
          const playersInSockets = csm.getPlayersOfTheGame(game.id);
          if (game.playedBy) {
            const playedByMap = new Map<string, string>(JSON.parse(game.playedBy));
            const otherPlayers = Array.from(playedByMap.keys());
            if (otherPlayers.some(player => player === userName)) {
              // some one is playing as me -> do not add this into free sockets, so fake that i'm there too
              playersInSockets.push(userName);
            }
          }
          game.inActivePlayerSockets = game.humanPlayers.filter(player => !playersInSockets.includes(player));
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        getGameListResponse.isAuthenticated = true;
        getGameListResponse.token = newToken;
        // console.log("getGameListResponse", getGameListResponse);
        fn(getGameListResponse);
      } else {
        fn({
          isAuthenticated: false,
          games: [],
        } as IuiGetGameListResponse);
        return null;
      }
    });

    socket.on("join game", async (joinGameRequest: IuiJoinLeaveGameRequest, fn: (joinResponse: IuiJoinLeaveGameResponse) => void) => {
      const {gameId, userName, uuid, token} = joinGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const joinResponse: IuiJoinLeaveGameResponse = await joinGame(joinGameRequest);
        const timestamp = Date.now();

        if (joinResponse.joinLeaveResult === JOIN_LEAVE_RESULT.ok || joinResponse.joinLeaveResult === JOIN_LEAVE_RESULT.lastOk) {
          socket.join(gameId);
          csm.addUserToMap(userName, socket.id, timestamp, gameId);
          csm.clearWaiting(userName);
          // notify other users
          const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(joinGameRequest, GAME_STATUS.created);
          joinResponse.games = getGameListResponse.games;
          io.to("waiting lobby").emit("game list updated", joinResponse.games);
        }

        if (joinResponse.joinLeaveResult === JOIN_LEAVE_RESULT.lastOk) {
          // notify all games players about game start
          io.to(gameId).emit("game begins", { gameId: gameId, asAObserver: false } as IuiGameBeginsNotification);
          io.to(gameId).socketsLeave("waiting lobby");
          io.to("waiting lobby").emit("changes in game players");
        }
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        joinResponse.isAuthenticated = true;
        joinResponse.token = newToken;
        fn(joinResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiJoinLeaveGameResponse);
        return null;
      }
    });

    socket.on("leave game", async (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (leaveResponse: IuiJoinLeaveGameResponse) => void) => {
      const {gameId, userName, uuid, token} = leaveGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const leaveResponse: IuiJoinLeaveGameResponse = await leaveGame(leaveGameRequest);
        const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(leaveGameRequest, GAME_STATUS.created);
        leaveResponse.games = getGameListResponse.games;
        if (leaveResponse.joinLeaveResult === JOIN_LEAVE_RESULT.ok) {
          socket.leave(gameId);
          csm.removeUserFromGame(userName, gameId);
          // notify other users
          io.emit("game list updated", leaveResponse.games);
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        leaveResponse.isAuthenticated = true;
        leaveResponse.token = newToken;
        fn(leaveResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiJoinLeaveGameResponse);
        return null;
      }
    });

    socket.on("check if ongoing game", async (checkIfOngoingGameRequest: IuiUserData, fn: (checkResponse: IuiCheckIfOngoingGameResponse) => void) => {
      // console.log("check if ongoing game", checkIfOngoingGameRequest);
      const {userName, uuid, token} = checkIfOngoingGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const checkResponse: IuiCheckIfOngoingGameResponse = await checkIfOngoingGame(userName);
        const timestamp = Date.now();
        let joinToWaitingLobby = true;
        switch (checkResponse.checkStatus) {
          case CHECK_GAME_STATUS.noGame: {
            // check if i am observer
            if (csm.userIsCurrentlyObserving(userName)) {
              const observingGame = csm.getObservingGame(userName);
              if (observingGame) {
                const {gameId} = observingGame;
                const isObservableGame = await checkIfObservableGame(gameId, userName);
                if (isObservableGame) {
                  socket.join(gameId);
                  csm.setObserving(userName, timestamp, socket.id, gameId, false);
                  const chatLine = `player ${userName} is observing game`;
                  const chatObj: IuiChatNotification = {
                    chatLine: chatLine,
                    focusedPlayer: userName,
                    type: CHAT_TYPE.observe,
                  };
                  io.to(gameId).emit("new chat line", chatObj);
                  checkResponse.gameId = gameId;
                  checkResponse.checkStatus = CHECK_GAME_STATUS.onGoingGame;
                  joinToWaitingLobby = false;
                  break;
                }
              }
              // if we are here there is a false observing in user sockets
              csm.clearObserving(userName);
            }
            break;
          }
          case CHECK_GAME_STATUS.joinedGame:
          case CHECK_GAME_STATUS.onGoingGame: {
            const gameIdStr = checkResponse.gameId ?? "";
            const playAsName = checkResponse.asAPlayer ?? "";
            if (checkResponse.checkStatus === CHECK_GAME_STATUS.onGoingGame) {
              joinToWaitingLobby = false;
            }

            // check if i was not in game players
            const playersInSockets = csm.getPlayersOfTheGame(gameIdStr);
            if (!playersInSockets.some(player => player === userName)) {
              io.to("waiting lobby").emit("changes in game players");
            }

            socket.join(gameIdStr);
            csm.addUserToMap(userName, socket.id, timestamp, gameIdStr);
            csm.clearWaiting(userName);
            const chatLine = `${playAsName} joined game!`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: playAsName,
              type: CHAT_TYPE.join,
            };
            // console.log("sending new chat line", chatLine, gameIdStr);
            io.to(gameIdStr).emit("new chat line", chatObj);

            if (playAsName !== userName) {
              // add also this user name to map
              // csm.addUserToMap(playAsName, socket.id, timestamp, gameIdStr);
              const chatLine2 = `${playAsName} played by ${userName}`;
              const chatObj2: IuiChatNotification = {
                chatLine: chatLine2,
                focusedPlayer: userName,
                type: CHAT_TYPE.asAPlayer,
              };
              io.to(gameIdStr).emit("new chat line", chatObj2);
            }

            break;
          }
        }

        if (joinToWaitingLobby) {
          socket.join("waiting lobby");
        } else {
          socket.leave("waiting lobby");
        }

        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        checkResponse.isAuthenticated = true;
        checkResponse.token = newToken;
        fn(checkResponse);
      } else {
        socket.leave("waiting lobby");
        fn({
          isAuthenticated: false,
        } as IuiCheckIfOngoingGameResponse);
        return null;
      }
    });
    //#endregion BEFORE GAME SOCKETS

    //#region PLAYING GAME SOCKETS
    socket.on("check game", async (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfoResponse: IuiGetGameInfoResponse) => void) => {
      // console.log("check game", getGameInfoRequest);
      const {gameId, uuid, userName, token} = getGameInfoRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (gameId === "") {
          return null;
        }
        const iAmObserving = csm.userIsCurrentlyObserving(userName, gameId);
        const gameInfoResponse: IuiGetGameInfoResponse | null = await getGameInfo(getGameInfoRequest, iAmObserving);
        // console.log("gameInfoResponse", gameInfoResponse);
        if (gameInfoResponse === null) {
          return null;
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        gameInfoResponse.isAuthenticated = true;
        gameInfoResponse.token = newToken;

        fn(gameInfoResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiGetGameInfoResponse);
        return null;
      }
    });

    socket.on("get round", async (getRoundObj: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => {
      // console.log("get round", getRoundObj);
      const {gameId, userName, uuid, token} = getRoundObj;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (gameId === "") {
          return null;
        }
        const iAmObserving = csm.getObservingGame(userName)?.isWaiting === false && !csm.getPlayersOfTheGame(gameId).some(player => player === userName);
        const roundResponse: IuiGetRoundResponse | null = await getRound(getRoundObj, iAmObserving);
        // console.log("roundResponse", roundResponse);
        if (roundResponse === null) {
          return null;
        }

        roundResponse.observers = csm.getGameObserversForUi(gameId);

        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        roundResponse.isAuthenticated = true;
        roundResponse.token = newToken;

        fn(roundResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiGetRoundResponse);
        return null;
      }
    });

    socket.on("make promise", async (makePromiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => {
      // console.log("make promise", makePromiseRequest);
      const { gameId, roundInd, token, uuid, userName, promise } = makePromiseRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!gameId) {
          return null;
        }

        const promiseResponse: IuiMakePromiseResponse = await makePromise(makePromiseRequest);
        if (promiseResponse.promiseResponse === PROMISE_RESPONSE.evenPromiseNotAllowed) {
          const chatLine = "You can't promise " + promise + " because even promises are not allowed!";
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.promiseError,
          };
          socket.emit("new chat line", chatObj);
        } else if (promiseResponse.promiseResponse === PROMISE_RESPONSE.promiseOk) {
          const { promiser, promise, promiseTime } = promiseResponse;
          const promiseNotification: IuiPromiseMadeNotification = {
            playerName: promiser,
            promise: promise,
            currentRoundIndex: roundInd,
          };
          io.to(gameId).emit("promise made", promiseNotification);

          const chatLine = (promiseResponse.promise === -1)
            ? `${promiser} promised in ${(promiseTime/1000).toFixed(1)} seconds`
            : `${promiser} promised ${promise} in ${(promiseTime/1000).toFixed(1)} seconds`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.promise,
          };
          io.to(gameId).emit("new chat line", chatObj);
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        promiseResponse.isAuthenticated = true;
        promiseResponse.token = newToken;
        fn(promiseResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiMakePromiseResponse);
        return null;
      }
    });

    socket.on("play card", async (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => {
      // console.log("play card", playCardRequest);
      const { gameId, roundInd, userName, uuid, token } = playCardRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!gameId) {
          return null;
        }

        // console.time(`playCardResponse ${userName}`);
        const playCardResponse: IuiPlayCardResponse = await playCard(playCardRequest);
        // console.timeEnd(`playCardResponse ${userName}`);
        if (playCardResponse.playResponse === PLAY_CARD_RESPONSE.playOk) {
          const {
            playerName,
            playedFromSlot,
            card,
            newPlayAfterHit,
            gameStatusAfterPlay,
            roundStatusAfterPlay,
            playTime,
            winnerOfPlay,
            winCount,
            newDealer,
            winnerOfGame,
            playWentOver,
          } = playCardResponse;
          const chatLine = `${playerName} hit card in ${(playTime/1000).toFixed(1)} seconds`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: playerName,
            type: CHAT_TYPE.hit,
          };
          io.to(gameId).emit("new chat line", chatObj);

          const cardPlayedNotificationToMySelf: IuiCardPlayedNotification = {
            playerName: playerName,
            playedFromSlot: playCardRequest.card.originalIndex ?? 0,
            playedCard: card,
            currentRoundIndex: roundInd,
            newPlayAfterHit: newPlayAfterHit,
            gameStatusAfterPlay: gameStatusAfterPlay,
            roundStatusAfterPlay: roundStatusAfterPlay,
            winnerOfPlay: winnerOfPlay,
            winCount: winCount,
          };
          const cardPlayedNotification: IuiCardPlayedNotification = {
            playerName: playerName,
            playedFromSlot: playedFromSlot,
            playedCard: card,
            currentRoundIndex: roundInd,
            newPlayAfterHit: newPlayAfterHit,
            gameStatusAfterPlay: gameStatusAfterPlay,
            roundStatusAfterPlay: roundStatusAfterPlay,
            winnerOfPlay: winnerOfPlay,
            winCount: winCount,
          };

          socket.emit("card played", cardPlayedNotificationToMySelf);
          socket.to(gameId).emit("card played", cardPlayedNotification);

          if (newPlayAfterHit) {
            const chatLine = `${winnerOfPlay} won this play`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: winnerOfPlay,
              type: CHAT_TYPE.winnerOfPlay,
            };
            io.to(gameId).emit("new chat line", chatObj);
            if (playWentOver) {
              const chatLine2 = `${winnerOfPlay} played just over promising`;
              const chatObj2: IuiChatNotification = {
                chatLine: chatLine2,
                focusedPlayer: winnerOfPlay,
                type: CHAT_TYPE.overPoints,
              };
              io.to(gameId).emit("new chat line", chatObj2);
            }
          }

          if (roundStatusAfterPlay === ROUND_STATUS.played && gameStatusAfterPlay === GAME_STATUS.onGoing) {
            const chatLine = `Round ${roundInd + 2} starts...`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              type: CHAT_TYPE.roundStart,
            };
            io.to(gameId).emit("new chat line", chatObj);
            const chatLine2 = `... and ${newDealer} is a dealer!`;
            const chatObj2: IuiChatNotification = {
              chatLine: chatLine2,
              focusedPlayer: newDealer,
              type: CHAT_TYPE.dealer,
            };
            io.to(gameId).emit("new chat line", chatObj2);
          }

          if (roundStatusAfterPlay === ROUND_STATUS.played && gameStatusAfterPlay === GAME_STATUS.played) {
            const chatLine = "GAME OVER!";
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              type: CHAT_TYPE.gameOver,
            };
            io.to(gameId).emit("new chat line", chatObj);
            const chatLine2 = `${winnerOfGame} won the Game!`;
            const chatObj2: IuiChatNotification = {
              chatLine: chatLine2,
              focusedPlayer: winnerOfGame,
              type: CHAT_TYPE.winnerOfGame,
            };
            io.to(gameId).emit("new chat line", chatObj2);
            io.to(gameId).socketsJoin("waiting lobby");
            io.to("waiting lobby").emit("changes in game players");
          }
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        playCardResponse.isAuthenticated = true;
        playCardResponse.token = newToken;

        fn(playCardResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiPlayCardResponse);
        return null;
      }
    });

    socket.on("end game", (endGameRequest: IuiEndGameRequest) => {
      const {userName, gameId, uuid, token} = endGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!gameId) {
          return null;
        }
        csm.removeUserFromGame(userName, gameId);
        socket.leave(gameId);
        socket.join("waiting lobby");
      }
    });

    //#endregion PLAYING GAME SOCKETS

    socket.on("write chat", async (chatObj: IuiChatObj ) => {
      const {userName, gameId, uuid, token, chatLine} = chatObj;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const chat = userName + ": " + chatLine;
        const chatObj: IuiChatNotification = {
          chatLine: chat,
          focusedPlayer: userName,
          type: CHAT_TYPE.chat,
        };
          // console.log("sending new chat line", chat, gameId);
        io.to(gameId).emit("new chat line", chatObj);
      } else {
        return null;
      }
    });

    //#region LEAVE AND JOIN GAME SOCKETS
    socket.on("leave ongoing game", async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest, fn: (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => void) => {
      // console.log("leaveOngoingGameRequest", leaveOngoingGameRequest);
      const {gameId, uuid, userName, token} = leaveOngoingGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!gameId) {
          return null;
        }

        const leaveOngoingGameResponse = await leaveOngoingGame(leaveOngoingGameRequest);
        const { leaveStatus, leaverName } = leaveOngoingGameResponse;
        if (leaveStatus !== LEAVE_ONGOING_GAME_RESULT.notOk) {
          if (leaveStatus !== LEAVE_ONGOING_GAME_RESULT.gameDismissed) {
            const chatLine = `${leaverName} has left the game!`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: leaverName,
              type: CHAT_TYPE.leave,
            };
            io.to(gameId).emit("new chat line", chatObj);
          }
          io.to("waiting lobby").emit("changes in game players");

          socket.leave(gameId);
          csm.removeUserFromGame(userName, gameId);
          socket.join("waiting lobby");
        }
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        leaveOngoingGameResponse.isAuthenticated = true;
        leaveOngoingGameResponse.token = newToken;
        fn(leaveOngoingGameResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiLeaveOngoingGameResponse);
        return null;
      }
    });

    socket.on("join ongoing game", async (joinRequest: IuiJoinOngoingGame, fn: (joinResponse: IuiJoinOngoingGameResponse) => void) => {
      // console.log("joinRequest", joinRequest);
      const {gameId, playAsPlayer, userName, uuid, token} = joinRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (gameId === "" || playAsPlayer === "") {
          fn({
            isAuthenticated: true,
            joinStatus: JOIN_GAME_STATUS.failed,
            token: token,
          } as IuiJoinOngoingGameResponse);
          return null;
        }

        const playerToJoin = await getHumanPlayer(gameId, playAsPlayer);
        const timestamp = Date.now();
        if (playerToJoin) {
          // console.log("playerToJoin", playerToJoin);
          const reJoiningMySelf = userName === playAsPlayer;
          const playerIsActive = playerToJoin.active;
          if (!reJoiningMySelf && playerIsActive) {
            // check socket status
            // don't let to join if socket active and it still responses
            if (csm.isUserConnected(playAsPlayer)) {
              // ping sockets
              let pingOk = false;
              const sockets = csm.getUserSocketsFromMap(playAsPlayer);
              if (sockets) {
                // eslint-disable-next-line no-cond-assign
                for (let it = sockets.values(), val = null; val=it.next().value;) {
                  if (val !== undefined) {
                    pingOk = true;
                    const socketId = val;
                    io.to(socketId).emit("hey"); // TODO this is just to notify that someone tried to play
                    // console.log(`join game by id - pinged socket ${socketId}`, gameId, playAsPlayer);
                  }
                }
              }

              if (pingOk) {
                // console.log("join game by id - joining failed because user was still active", gameId, playAsPlayer);
                csm.setLastTimestamp(userName, socket.id, timestamp);
                const newToken = signUserToken(userName, uuid, timestamp);
                fn({
                  isAuthenticated: true,
                  joinStatus: JOIN_GAME_STATUS.failed,
                  token: newToken,
                } as IuiJoinOngoingGameResponse);
                return null;
              }
            }
          }

          // player has left the game or is disconnected -> let join
          const joinResponse = await joinOngoingGame(joinRequest, false);
          // console.log("joinResponse", joinResponse);
          const otherPlayer = joinResponse.playedBy;
          if (joinResponse.joinStatus === JOIN_GAME_STATUS.waiting && otherPlayer) {
            // show want to join notification
            const playerWantsToJoinNotification: IuiPlayerWantsToJoinNotification = {
              replacedPlayer: playAsPlayer,
              joinerName: userName,
            };
            io.to(gameId).emit("player wants to join", playerWantsToJoinNotification);
            csm.setWaiting(userName, timestamp, socket.id, playAsPlayer, gameId);
            const chatLine = `player ${userName} want's to play as ${playAsPlayer}`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: userName,
              type: CHAT_TYPE.requestToJoin,
            };
            io.to(gameId).emit("new chat line", chatObj);
          } else if (joinResponse.joinStatus === JOIN_GAME_STATUS.ok) {
            if (reJoiningMySelf && otherPlayer) {
              // send notification to player who probably plays as me
              const otherPlayerGame = csm.getUserGameFromMap(otherPlayer);
              if (otherPlayerGame === gameId) {
                const playerJoinedNotification: IuiPlayerJoinedOnGoingGameNotification = {
                  gameId: gameId,
                  replacedPlayer: otherPlayer,
                  joinerName: userName,
                };
                const otherPlayerSockets = csm.getUserSocketsFromMap(otherPlayer);
                if (otherPlayerSockets) {
                  // eslint-disable-next-line no-cond-assign
                  for (let it = otherPlayerSockets.values(), val = null; val=it.next().value;) {
                    if (val !== undefined) {
                      const otherPlayerSocketId = val;
                      // console.log("kick off notification", playerJoinedNotification, socketId);
                      io.to(otherPlayerSocketId).emit("player joined on going game", playerJoinedNotification);
                      io.in(otherPlayerSocketId).socketsLeave(gameId);
                      io.in(otherPlayerSocketId).socketsJoin("waiting lobby");
                    }
                  }
                }
              }
            }
            // remove previous player from game
            csm.removeUserFromGame(playAsPlayer, gameId);

            // join in the game
            socket.join(gameId);
            csm.addUserToMap(userName, socket.id, timestamp, gameId);

            socket.leave("waiting lobby");
            io.to("waiting lobby").emit("changes in game players");

            const chatLine = `player ${playAsPlayer} connected again as played by ${userName}`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: userName,
              type: CHAT_TYPE.join,
            };
            io.to(gameId).emit("new chat line", chatObj);

            // straight to game
            socket.emit("game begins", { gameId: gameId, asAObserver: false } as IuiGameBeginsNotification);
            return null;
          }
          csm.setLastTimestamp(userName, socket.id, timestamp);
          const newToken = signUserToken(userName, uuid, timestamp);
          joinResponse.isAuthenticated = true;
          joinResponse.token = newToken;

          fn(joinResponse);
        } else {
          csm.setLastTimestamp(userName, socket.id, timestamp);
          const newToken = signUserToken(userName, uuid, timestamp);
          fn({
            joinStatus: JOIN_GAME_STATUS.failed,
            isAuthenticated: true,
            token: newToken,
          } as IuiJoinOngoingGameResponse);
        }
      } else {
        fn({
          isAuthenticated: false,
        } as IuiJoinOngoingGameResponse);
        return null;
      }
    });

    socket.on("allow to join game", async (playerToJoinRequest: IuiAllowPlayerToJoinRequest, fn: (allowPlayerToJoinResponse: IuiAllowPlayerToJoinResponse) => void) => {
      // console.log("playerToJoinRequest", playerToJoinRequest);
      const {gameId, replacedPlayer, joinerName, allow, userName, uuid, token} = playerToJoinRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!gameId || !replacedPlayer || !joinerName || !csm.isUserConnected(joinerName)) {
          fn({
            isAuthenticated: true,
            joinOk: false,
            token: token,
          } as IuiAllowPlayerToJoinResponse);
          return null;
        }

        const playerToJoin = await getHumanPlayer(gameId, replacedPlayer);
        let joinOk = false;

        if (playerToJoin) {
          // console.log("playerToJoin", playerToJoin);
          // check socket status
          // user that is going to be noticed must be active
          // ping sockets
          let pingOk = false;
          let otherPlayerSocketId = "";
          const sockets = csm.getUserSocketsFromMap(joinerName);
          // console.log("waiter sockets", sockets);
          if (sockets) {
            // eslint-disable-next-line no-cond-assign
            for (let it = sockets.values(), val = null; val=it.next().value;) {
              if (val !== undefined) {
                otherPlayerSocketId = val;
                if (csm.isWaitingGame(joinerName, otherPlayerSocketId, replacedPlayer, gameId)) {
                  pingOk = true;
                  // console.log(`allow to join game - socket ${otherPlayerSocketId} : ${gameId} : ${replacedPlayer} : ${joinerName}`);
                  break;
                }
              }
            }
          }

          if (!pingOk) {
            // console.log(`allow to join game - joining failed because user was not waiting active ${gameId} : ${joinerName}`);
            fn({
              isAuthenticated: true,
              joinOk: false,
              token: token,
            } as IuiAllowPlayerToJoinResponse);
            return null;
          }

          const joinRequest: IuiJoinOngoingGame = {
            gameId: gameId,
            playAsPlayer: replacedPlayer,
            userName: joinerName,
            uuid: "",
          };

          if (allow) {
            const checkResponse: IuiCheckIfOngoingGameResponse = await checkIfOngoingGame(joinerName);
            if (checkResponse.checkStatus === CHECK_GAME_STATUS.noGame) {
              const joinResponse = await joinOngoingGame(joinRequest, true);
              // console.log("joinResponse", joinResponse);
              if (joinResponse.joinStatus === JOIN_GAME_STATUS.ok) {
                // remove previous player from game
                csm.removeUserFromGame(replacedPlayer, gameId);
                csm.clearWaiting(joinerName);
                csm.addUserToGame(joinerName, otherPlayerSocketId, gameId);

                const chatLine = `player ${userName} allowed ${joinerName} to join game and play as ${replacedPlayer}`;
                const chatObj: IuiChatNotification = {
                  chatLine: chatLine,
                  focusedPlayer: userName,
                  type: CHAT_TYPE.allowedToJoin,
                };
                io.to(gameId).emit("new chat line", chatObj);
                io.to(gameId).emit("player wants to join", { joinerName: "", replacedPlayer: "" } as IuiPlayerWantsToJoinNotification);

                io.to(otherPlayerSocketId).socketsJoin(gameId);
                io.to(otherPlayerSocketId).socketsLeave("waiting lobby");
                io.to(otherPlayerSocketId).emit("game begins", { gameId: gameId, asAObserver: false } as IuiGameBeginsNotification);

                joinOk = true;
              }
            }
          }

          // not allowed or join response failed
          if (!joinOk) {
            const chatLine = `player ${userName} rejected ${joinerName} request to join game and play as ${replacedPlayer}`;
            const chatObj: IuiChatNotification = {
              chatLine: chatLine,
              focusedPlayer: userName,
              type: CHAT_TYPE.rejectedToJoin,
            };
            io.to(gameId).emit("new chat line", chatObj);
            io.to(gameId).emit("player wants to join", { joinerName: "", replacedPlayer: "" } as IuiPlayerWantsToJoinNotification);

            io.to(otherPlayerSocketId).emit("join request rejected", gameId);
          }
        }

        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          joinOk: joinOk,
          isAuthenticated: true,
          token: newToken,
        } as IuiAllowPlayerToJoinResponse);
        return null;
      } else {
        fn({
          isAuthenticated: false,
        } as IuiAllowPlayerToJoinResponse);
        return null;
      }
    });

    socket.on("cancel my join request", (cancelRequest: IuiUserData, fn: (cancelResponse: IuiAuth) => void) => {
      // console.log("cancel my join request", cancelRequest);
      const { userName, uuid, token } = cancelRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const timestamp = Date.now();
        const waitingToGame = csm.getWaitingGame(userName);
        csm.clearWaiting(userName);
        if (waitingToGame) {
          io.to(waitingToGame).emit("player wants to join", { joinerName: "", replacedPlayer: "" } as IuiPlayerWantsToJoinNotification);
          const chatLine = `player ${userName} cancelled his/her join request`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.cancelledToJoin,
          };
          io.to(waitingToGame).emit("new chat line", chatObj);
        }

        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          isAuthenticated: true,
          token: newToken,
        } as IuiAuth);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiAuth);
        return null;
      }
    });
    //#endregion LEAVE AND JOIN GAME SOCKETS

    //#region OBSERVE SOCKETS
    socket.on("observe game", async (observeGameRequest: IuiObserveGameRequest, fn: (observeGameResponse: IuiObserveGameResponse) => void) => {
      // console.log("observeGameRequest", observeGameRequest);
      const {gameId, userName, uuid, token} = observeGameRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (gameId === "") {
          fn({
            isAuthenticated: true,
            observeResponse: OBSERVE_RESPONSE.failed,
            token: token,
          } as IuiObserveGameResponse);
          return null;
        }

        const timestamp = Date.now();
        const onGoingResponse: IuiCheckIfOngoingGameResponse = await checkIfOngoingGame(userName);
        if (onGoingResponse.checkStatus === CHECK_GAME_STATUS.noGame && csm.getObservingGame(userName) === null) {
          csm.setObserving(userName, timestamp, socket.id, gameId, true);
          // io.to(gameId).emit("players wants to observe", { observerNames: csm.getWaitingGameObservers(gameId) } as IuiPlayersWantsToObserveNotification);
          const chatLine = `player ${userName} want's to observe this game`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.requestToObserve,
          };
          io.to(gameId).emit("new chat line", chatObj);

          csm.setLastTimestamp(userName, socket.id, timestamp);
          const newToken = signUserToken(userName, uuid, timestamp);
          fn({
            isAuthenticated: true,
            token: newToken,
            observeResponse: OBSERVE_RESPONSE.waiting,
          } as IuiObserveGameResponse);
          return null;
        } else {
          fn({
            isAuthenticated: true,
            observeResponse: OBSERVE_RESPONSE.onGoingGameExists,
            token: token,
          } as IuiObserveGameResponse);
          return null;
        }
      } else {
        fn({
          isAuthenticated: false,
        } as IuiObserveGameResponse);
        return null;
      }
    });

    socket.on("allow to observe game", async (playerToObserveRequest: IuiAllowPlayerToObserveRequest, fn: (observeGameResponse: IuiAllowPlayerToObserveResponse) => void) => {
      // console.log("playerToObserveRequest", playerToObserveRequest);
      const {gameId, observerName, allow, userName, uuid, token} = playerToObserveRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const timestamp = Date.now();
        if (!gameId || !observerName || !csm.isUserConnected(observerName)) {
          fn({
            isAuthenticated: true,
            observeOk: false,
            token: token,
          } as IuiAllowPlayerToObserveResponse);
          return null;
        }
        let observeOk = false;

        const observer = csm.getGameObservers(gameId).get(observerName);
        if (observer) {
          const observerSocketId = observer.socketId;
          if (!allow) {
            csm.clearObserving(observerName);
            io.to(observerSocketId).socketsLeave(gameId);
            io.to(observerSocketId).emit("observe request rejected", gameId);
          } else {
            const checkResponse: IuiCheckIfOngoingGameResponse = await checkIfOngoingGame(observerName);
            if (checkResponse.checkStatus === CHECK_GAME_STATUS.noGame) {
              csm.clearWaiting(observerName);
              // only real players are in game
              // csm.addUserToGame(observerName, observerSocketId, gameId);
              csm.setObserving(observerName, timestamp, observerSocketId, gameId, false);

              const chatLine = `player ${userName} allowed ${observerName} to observe game`;
              const chatObj: IuiChatNotification = {
                chatLine: chatLine,
                focusedPlayer: userName,
                type: CHAT_TYPE.allowedToObserve,
              };
              io.to(gameId).emit("new chat line", chatObj);

              io.to(observerSocketId).socketsJoin(gameId);
              io.to(observerSocketId).socketsLeave("waiting lobby");
              io.to(observerSocketId).emit("game begins", { gameId: gameId, asAObserver: true } as IuiGameBeginsNotification);

              observeOk = true;
            }
          }
        } else {
          // someone else or observer him/herself has rejected request
          // there is no need to do anything
        }

        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          isAuthenticated: true,
          token: newToken,
          observeOk: observeOk,
        } as IuiAllowPlayerToObserveResponse);
        return null;
      } else {
        fn({
          isAuthenticated: false,
        } as IuiAllowPlayerToObserveResponse);
        return null;
      }
    });

    socket.on("stop observing", (cancelRequest: IuiUserData, fn: (simpleResponse: IuiAuth) => void) => {
      //console.log("stop observing", cancelRequest);
      const {userName, uuid, token} = cancelRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const observedGame = csm.getObservingGame(userName);
        csm.clearObserving(userName);
        if (observedGame) {
          socket.leave(observedGame.gameId);
          const chatLine = `player ${userName} leaved observing this game`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.leavedObserving,
          };
          io.to(observedGame.gameId).emit("new chat line", chatObj);
        }

        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          isAuthenticated: true,
          token: newToken,
        } as IuiAuth);
        return null;
      } else {
        fn({
          isAuthenticated: false,
        } as IuiAuth);
        return null;
      }
    });

    socket.on("cancel my observe request", (cancelRequest: IuiUserData, fn: (cancelResponse: IuiAuth) => void) => {
      // console.log("cancel my observe request", cancelRequest);
      const { userName, uuid, token } = cancelRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const timestamp = Date.now();
        const waitingToGame = csm.getObservingGame(userName)?.gameId;
        csm.clearObserving(userName);
        if (waitingToGame) {
          // io.to(waitingToGame).emit("players wants to observe", { observerNames: csm.getGameObservers(waitingToGame) } as IuiPlayersWantsToObserveNotification);
          const chatLine = `player ${userName} cancelled his/her observe request`;
          const chatObj: IuiChatNotification = {
            chatLine: chatLine,
            focusedPlayer: userName,
            type: CHAT_TYPE.cancelledToObserve,
          };
          io.to(waitingToGame).emit("new chat line", chatObj);
        }

        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        fn({
          isAuthenticated: true,
          token: newToken,
        } as IuiAuth);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiAuth);
        return null;
      }
    });
    //#endregion OBSERVE SOCKETS

    //#region REPORT SOCKETS
    socket.on("get report data", async (request: IuiUserData, fn: (reportResponse: IuiPlayedGamesReport) => void) => {
      // console.log("get report data", request);
      const {userName, uuid, token} = request;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const reportData = await getReportData();
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        reportData.isAuthenticated = true;
        reportData.token = newToken;
        fn(reportData);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiPlayedGamesReport);
        return null;
      }
    });

    socket.on("get game report", async (reportRequest: IuiGetOneGameReportRequest, fn: (reportResponse: IuiOneGameReport) => void) => {
      // console.log("get game report", reportRequest);
      const {uuid, userName, token} = reportRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        const reportData = await getOneGameReportData(reportRequest);
        if (!reportData) return null;
        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        reportData.isAuthenticated = true;
        reportData.token = newToken;

        fn(reportData);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiOneGameReport);
        return null;
      }
    });

    socket.on("get one player report", async (playerReportRequest: IuiOnePlayerReportRequest, fn: (playerReportResponse: IuiOnePlayerReportResponse) => void) => {
      // console.log("get one player report", playerReportRequest);
      const {uuid, userName, token, playerName} = playerReportRequest;
      const lastTimestamp = csm.getLastTimestamp(userName);
      const isAuthenticated = isUserAuthenticated(token, userName, uuid, lastTimestamp);

      if (isAuthenticated) {
        if (!playerName) {
          fn({
            isAuthenticated: true,
            token: token,
          } as IuiOnePlayerReportResponse);
          return null;
        }
        const reportData = await getOnePlayerReport(playerName);
        if (!reportData) return null;

        const timestamp = Date.now();
        csm.setLastTimestamp(userName, socket.id, timestamp);
        const newToken = signUserToken(userName, uuid, timestamp);
        const reportResponse: IuiOnePlayerReportResponse = {
          isAuthenticated: true,
          token: newToken,
          onePlayerReport: reportData,
        };

        fn(reportResponse);
      } else {
        fn({
          isAuthenticated: false,
        } as IuiOnePlayerReportResponse);
        return null;
      }
    });
    //#endregion REPORT SOCKETS
  });
}).catch((e: unknown) => {
  console.error("DATABASE ERROR", e);
});
