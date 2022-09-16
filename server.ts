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
import { checkIfOngoingGame } from "./backend/actions/checkIfOngoingGame";
import { CREATE_GAME_STATUS, IuiCreateGameRequest, IuiCreateGameResponse } from "./frontend/src/interfaces/IuiNewGame";
import { IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "./frontend/src/interfaces/IuiGameList";
import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "./frontend/src/interfaces/IuiCheckIfOngoingGame";
import { IuiChatObj } from "./frontend/src/interfaces/IuiChat";
import { IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiMakePromiseRequest, IuiMakePromiseResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification, PLAY_CARD_RESPONSE, PROMISE_RESPONSE } from "./frontend/src/interfaces/IuiPlayingGame";
import { getGameInfo, getRound, makePromise, playCard } from "./backend/actions/playingGame";
import { GAME_STATUS, ROUND_STATUS } from "./frontend/src/interfaces/IuiGameOptions";
import { IuiLeaveOngoingGameRequest, IuiLeaveOngoingGameResponse, LEAVE_ONGOING_GAME_RESULT } from "./frontend/src/interfaces/IuiLeaveOngoingGame";
import { leaveOngoingGame, joinOngoingGame, getHumanPlayer } from "./backend/actions/joinLeaveOngoingGame";
import { IuiJoinOngoingGame, IuiJoinOngoingGameResponse } from "./frontend/src/interfaces/IuiJoinOngoingGame";
import { IuiPlayedGamesReport } from "./frontend/src/interfaces/IuiGameReports";
import { getOneGameReportData, getReportData } from "./backend/actions/reports";
import { IuiGetOneGameReportRequest, IuiOneGameReport } from "./frontend/src/interfaces/IuiReports";
import { IuiLoginRequest, IuiLoginResponse, IuiUserData, LOGIN_RESPONSE } from "./frontend/src/interfaces/IuiUser";
import { handleLoginRequest } from "./backend/actions/login";
import { IuiGetGamesResponse, IuiReCreateGameStatisticsRequest } from "./frontend/src/interfaces/IuiAdminOperations";
import { convertOldData, getGamesForAdmin, reCreateAllGameStats, reCreateGameStats } from "./backend/actions/adminActions";
import { isUserAuthenticated, isValidAdminUser, isValidUser, signUserToken } from "./backend/common/userValidation";

dotenv.config();

const app: Application = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

// io.use((socket: Socket, next: () => void) => {
//   const token = (socket.handshake.query.token as string) ?? "";
//   console.log("check token", token);
//   if (token && token !== null && token !== undefined && token.split(".").length === 3) {
//     console.log("is token", token);
//     // const token = socket.handshake.query.token as string;
//     const juupaJuu = verify(token, process.env.AUTH_SECRET ?? "MUST_SET_THIS");
//     console.log(juupaJuu);
//     // next();
//   } else {
//     console.log("no token");
//     // next();
//   }
//   next();
// });

app.use(cors());
app.use(express.json());

// app.use("/", express.static(path.join(__dirname, "/build")));
// app.use(express.static(path.join(__dirname, "../build")));
if (process.env.NODE_ENV === "development") {
  app.use(express.static(path.join(__dirname, "./frontend/build")));
} else {
  app.use(express.static(path.join(__dirname, "./build")));
}

// Default
app.get("/", (req: Request, res: Response) => {
  res.sendFile("index.html");
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log("server listening on *:" + PORT);
  });

  io.on("connection", (socket: Socket) => {
    console.log("connected!", socket.id);

    socket.on("disconnect", () => {
      console.warn("user disconnected", socket.id);
      let gameIdStr: string | null = null;
      const userName = csm.getUserNameFromMapBySocket(socket.id) ?? "unknown";
      if (userName !== "unknown") {
        gameIdStr = csm.getUserGamesFromMap(userName)?.values().next().value as string;
        console.log("mapped gameIdStr", gameIdStr);
      }
      const chatLine = "player " + userName + " disconnected";
      console.log("chat", chatLine);
      if (gameIdStr !== null) {
        io.to(gameIdStr).emit("new chat line", chatLine);
      }
      csm.removeUserFromMap(userName, socket.id, gameIdStr ?? "");
    });

    socket.on("user login", async (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => {
      console.log("user login", loginRequest);
      const {uuid, userName, password1} = loginRequest;
      if (!isValidUser(userName, password1, uuid)) return null;

      const loginResponse = await handleLoginRequest(loginRequest, false);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
        loginResponse.isAuthenticated = true;
        const newToken = signUserToken(userName, uuid);
        loginResponse.token = newToken;
      } else {
        loginResponse.isAuthenticated = false;
      }
      fn(loginResponse);
    });

    socket.on("admin login", async (loginRequest: IuiLoginRequest, fn: (loginResponse: IuiLoginResponse) => void) => {
      console.log("admin login", loginRequest);
      const {uuid, userName, password1} = loginRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (password1.length < 3) return null;

      const loginResponse = await handleLoginRequest(loginRequest, true);
      if (loginResponse.loginStatus === LOGIN_RESPONSE.ok) {
        csm.setUserAsAdmin(userName, socket.id, uuid);
      } else {
        csm.unsetUserAsAdmin(userName);
      }
      fn(loginResponse);
    });

    socket.on("get games for admin", async (getGamesRequest: IuiUserData, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      console.log("get games for admin", getGamesRequest);
      const {uuid, userName} = getGamesRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;

      const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
      fn(getGamesResponse);
    });

    socket.on("re-create game statistics", async (reCreateGameStatisticsRequest: IuiReCreateGameStatisticsRequest, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      console.log("re-create game statistics", reCreateGameStatisticsRequest);
      const {uuid, userName} = reCreateGameStatisticsRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;

      await reCreateGameStats(reCreateGameStatisticsRequest);
      const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
      fn(getGamesResponse);
    });

    socket.on("re-create all game statistics", async (reCreateAllGameStatisticsRequest: IuiUserData, fn: (getGamesResponse: IuiGetGamesResponse) => void) => {
      console.log("re-create all game statistics", reCreateAllGameStatisticsRequest);
      const {uuid, userName} = reCreateAllGameStatisticsRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;

      await reCreateAllGameStats(userName);
      const getGamesResponse: IuiGetGamesResponse = await getGamesForAdmin(userName);
      fn(getGamesResponse);
    });

    socket.on("convert old data", async (convertRequest: IuiUserData, fn: (response: string[]) => void) => {
      console.log("convert old data", convertRequest);
      const {uuid, userName} = convertRequest;
      if (!isValidAdminUser(userName, uuid)) return null;
      if (!csm.isUserAdmin(userName, socket.id, uuid)) return null;

      const response = await convertOldData(userName);
      fn(response);
    });

    socket.on("create game", async (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => {
      const {uuid, userName, token} = createGameRequest;
      const isAuthenticated = isUserAuthenticated(token, userName, uuid);
      if (isAuthenticated) {
        const createGameResponse: IuiCreateGameResponse = await createGame(createGameRequest);
        if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
          const gameIdStr = createGameResponse.newGameId;
          socket.join(gameIdStr);
          csm.addUserToMap(createGameRequest.userName, socket.id, gameIdStr);
          io.emit("new game created", gameIdStr);
        }
        fn(createGameResponse);
      } else {
        return null;
      }
    });

    socket.on("get open games", async (getGameListRequest: IuiUserData, fn: (getGameListResponse: IuiGetGameListResponse) => void) => {
      const {userName, uuid, token} = getGameListRequest;
      const isAuthenticated = isUserAuthenticated(token, userName, uuid);
      if (isAuthenticated) {
        const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(getGameListRequest);
        fn(getGameListResponse);
      } else {
        return null;
      }
    });

    socket.on("join game", async (joinGameRequest: IuiJoinLeaveGameRequest, fn: (joinResponse: IuiJoinLeaveGameResponse) => void) => {
      const gameIdStr = joinGameRequest.gameId;
      const joinResponse: IuiJoinLeaveGameResponse = await joinGame(joinGameRequest);
      if (joinResponse.joinLeaveResult !== JOIN_LEAVE_RESULT.notOk) {
        socket.join(gameIdStr);
        csm.addUserToMap(joinGameRequest.userName, socket.id, gameIdStr);
        // notify other users
        io.emit("game list updated");
      }
      if (joinResponse.joinLeaveResult === JOIN_LEAVE_RESULT.lastOk) {
        // notify all games players about game start
        io.to(gameIdStr).emit("game begins", gameIdStr);
      }
      fn(joinResponse);
    });

    socket.on("leave game", async (leaveGameRequest: IuiJoinLeaveGameRequest, fn: (leaveResponse: IuiJoinLeaveGameResponse) => void) => {
      const leaveResponse: IuiJoinLeaveGameResponse = await leaveGame(leaveGameRequest);
      if (leaveResponse.joinLeaveResult === JOIN_LEAVE_RESULT.ok) {
        socket.leave(leaveGameRequest.gameId);
        // notify other users
        io.emit("game list updated");
      }
      fn(leaveResponse);
    });

    socket.on("check if ongoing game", async (checkIfOngoingGameRequest: IuiUserData, fn: (checkResponse: IuiCheckIfOngoingGameResponse) => void) => {
      console.log("check if ongoing game", checkIfOngoingGameRequest);
      const {userName, uuid, token} = checkIfOngoingGameRequest;
      const isAuthenticated = isUserAuthenticated(token, userName, uuid);
      if (isAuthenticated) {
        const checkResponse: IuiCheckIfOngoingGameResponse = await checkIfOngoingGame(checkIfOngoingGameRequest);
        switch (checkResponse.checkStatus) {
          case CHECK_GAME_STATUS.joinedGame:
          case CHECK_GAME_STATUS.onGoingGame:
          case CHECK_GAME_STATUS.observedGame: {
            const gameIdStr = checkResponse.gameId ?? "";
            const playerName = checkResponse.asAPlayer ?? "";
            socket.join(gameIdStr);
            csm.addUserToMap(playerName, socket.id, gameIdStr);
            const chatLine = playerName + " joined game!";
            console.log("sending new chat line", chatLine, gameIdStr);
            io.to(gameIdStr).emit("new chat line", chatLine);

            break;
          }
        }
        checkResponse.isAuthenticated = isAuthenticated;
        fn(checkResponse);
      } else {
        return null;
      }
    });

    socket.on("check game", async (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfoResponse: IuiGetGameInfoResponse) => void) => {
      // console.log("check game", getGameInfoRequest);
      if (getGameInfoRequest.gameId === "" || getGameInfoRequest.uuid === "") {
        return null;
      }
      const gameInfoResponse: IuiGetGameInfoResponse | null = await getGameInfo(getGameInfoRequest);
      // console.log("gameInfoResponse", gameInfoResponse);
      if (gameInfoResponse === null) {
        return null;
      }

      fn(gameInfoResponse);
    });

    socket.on("get round", async (getRoundObj: IuiGetRoundRequest, fn: (roundResponse: IuiGetRoundResponse) => void) => {
      console.log("get round", getRoundObj);
      if (getRoundObj.gameId === "") {
        return null;
      }
      const roundResponse: IuiGetRoundResponse | null = await getRound(getRoundObj);
      // console.log("roundResponse", roundResponse);
      if (roundResponse === null) {
        return null;
      }

      fn(roundResponse);
    });

    socket.on("make promise", async (makePromiseRequest: IuiMakePromiseRequest, fn: (promiseResponse: IuiMakePromiseResponse) => void) => {
      console.log("make promise", makePromiseRequest);
      const { gameId: gameIdStr, roundInd } = makePromiseRequest;
      if (!gameIdStr || !makePromiseRequest.uuid) {
        return null;
      }

      const promiseResponse: IuiMakePromiseResponse = await makePromise(makePromiseRequest);
      if (promiseResponse.promiseResponse === PROMISE_RESPONSE.evenPromiseNotAllowed) {
        const chatLine = "You can't promise " + promiseResponse.promise + " because even promises are not allowed!";
        socket.emit("new chat line", chatLine);
      } else if (promiseResponse.promiseResponse === PROMISE_RESPONSE.promiseOk) {
        const { promiser, promise, promiseTime } = promiseResponse;
        const promiseNotification: IuiPromiseMadeNotification = {
          playerName: promiser,
          promise: promise,
          currentRoundIndex: roundInd,
        };
        io.to(gameIdStr).emit("promise made", promiseNotification);

        const chatLine = `${promiser} promised ${promise} in ${(promiseTime/1000).toFixed(1)} seconds`;
        io.to(gameIdStr).emit("new chat line", chatLine);
      }
      fn(promiseResponse);
    });

    socket.on("play card", async (playCardRequest: IuiPlayCardRequest, fn: (playCardResponse: IuiPlayCardResponse) => void) => {
      console.log("play card", playCardRequest);
      const { gameId: gameIdStr, roundInd } = playCardRequest;
      if (!gameIdStr || !playCardRequest.uuid) {
        return null;
      }

      const playCardResponse: IuiPlayCardResponse = await playCard(playCardRequest);
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
        } = playCardResponse;
        const chatLine = `${playerName} hit card in ${(playTime/1000).toFixed(1)} seconds`;
        io.to(gameIdStr).emit("new chat line", chatLine);

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
        socket.to(gameIdStr).emit("card played", cardPlayedNotification);

        if (newPlayAfterHit) {
          const chatLine = `${winnerOfPlay} won this play`;
          io.to(gameIdStr).emit("new chat line", chatLine);
        }

        if (roundStatusAfterPlay === ROUND_STATUS.played && gameStatusAfterPlay === GAME_STATUS.onGoing) {
          const chatLine = `Round ${roundInd + 2} starts...`;
          io.to(gameIdStr).emit("new chat line", chatLine);
          const chatLine2 = `... and ${newDealer} is a dealer!`;
          io.to(gameIdStr).emit("new chat line", chatLine2);
        }

        if (roundStatusAfterPlay === ROUND_STATUS.played && gameStatusAfterPlay === GAME_STATUS.played) {
          const chatLine = "GAME OVER!";
          io.to(gameIdStr).emit("new chat line", chatLine);
          const chatLine2 = `${winnerOfGame} won the Game!`;
          io.to(gameIdStr).emit("new chat line", chatLine2);
        }
      }

      fn(playCardResponse);
    });

    socket.on("write chat", async (chatObj: IuiChatObj ) => {
      const gameIdStr = chatObj.gameId;
      const chatLine = chatObj.userName + ": " + chatObj.chatLine;
      console.log("sending new chat line", chatLine, gameIdStr);
      io.to(gameIdStr).emit("new chat line", chatLine);
    });

    socket.on("leave ongoing game", async (leaveOngoingGameRequest: IuiLeaveOngoingGameRequest, fn: (leaveOngoingGameResponse: IuiLeaveOngoingGameResponse) => void) => {
      const {gameId: gameIdStr, uuid} = leaveOngoingGameRequest;

      console.log("leaveOngoingGameRequest", leaveOngoingGameRequest);
      if (gameIdStr === "" || uuid === "") {
        return null;
      }

      const leaveOngoingGameResponse = await leaveOngoingGame(leaveOngoingGameRequest);
      const { leaveStatus, leaverName } = leaveOngoingGameResponse;
      if (leaveStatus !== LEAVE_ONGOING_GAME_RESULT.notOk) {
        if (leaveStatus !== LEAVE_ONGOING_GAME_RESULT.gameDismissed) {
          let chatLine = `${leaverName} has left the game!`;
          io.to(gameIdStr).emit("new chat line", chatLine);
          chatLine = `You can invite a new player to continue ${leaverName}'s game with these id's:`;
          io.to(gameIdStr).emit("new chat line", chatLine);
          chatLine = `GameId: ${gameIdStr}`;
          io.to(gameIdStr).emit("new chat line", chatLine);
          chatLine = `PlayerId: ${uuid}`;
          io.to(gameIdStr).emit("new chat line", chatLine);
        }

        socket.leave(gameIdStr);
        csm.removeUserFromMap(leaverName, socket.id, gameIdStr);
      }
      fn(leaveOngoingGameResponse);
    });

    socket.on("join ongoing game", async (joinRequest: IuiJoinOngoingGame, fn: (joinResponse: IuiJoinOngoingGameResponse) => void) => {
      const {gameId: gameIdStr, playerId} = joinRequest;

      console.log("joinRequest", joinRequest);
      if (gameIdStr === "" || playerId === "") {
        return null;
      }

      const playerToJoin = await getHumanPlayer(gameIdStr, playerId);
      if (playerToJoin) {
        const playAsName = playerToJoin.name;
        const playerIsActive = playerToJoin.active;
        if (playerIsActive) {
          // check socket status
          // don't let to join if socket active and it still responses
          if (csm.isUserConnected(playAsName)) {
            // ping sockets
            let pingOk = false;
            const sockets = csm.getUserSocketsFromMap(playAsName);
            if (sockets) {
              // eslint-disable-next-line no-cond-assign
              for (let it = sockets.values(), val = null; val=it.next().value;) {
                if (val !== undefined) {
                  const socketId = val;
                  pingOk = io.to(socketId).emit("hey");
                  console.log("join game by id - pinged socket "+socketId+" and result was: ", pingOk, gameIdStr, playAsName);
                }
              }
            }

            if (pingOk) {
              console.log("join game by id - joining failed because user was still active", gameIdStr, playAsName);
              return null;
            }
          }
        }

        // player has left the game or is disconnected -> let join
        const joinResponse = await joinOngoingGame(joinRequest);
        if (joinResponse.joinOk) {
          // remove previous player from game
          csm.removeUserFromMap(playAsName, "-1", gameIdStr);

          // join in the game
          socket.join(gameIdStr);
          csm.addUserToMap(playAsName, socket.id, gameIdStr);

          const chatLine = `player ${playAsName} connected again as new player`;
          io.to(gameIdStr).emit("new chat line", chatLine);
        }

        fn(joinResponse);
      } else {
        fn({
          joinOk: false,
        } as IuiJoinOngoingGameResponse);
      }
    });

    socket.on("get report data", async (request: IuiUserData, fn: (reportResponse: IuiPlayedGamesReport) => void) => {
      console.log("get report data", request);
      const {userName, uuid, token} = request;
      const isAuthenticated = isUserAuthenticated(token, userName, uuid);
      if (isAuthenticated) {
        const reportData = await getReportData();
        reportData.isAuthenticated = isAuthenticated;
        fn(reportData);
      } else {
        return null;
      }
    });

    socket.on("get game report", async (reportRequest: IuiGetOneGameReportRequest, fn: (reportResponse: IuiOneGameReport) => void) => {
      console.log("get game report", reportRequest);
      const reportData = await getOneGameReportData(reportRequest);
      if (!reportData) return null;

      fn(reportData);
    });
  });
}).catch((e: unknown) => {
  console.error("DATABASE ERROR", e);
});
