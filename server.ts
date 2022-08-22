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

import createGame from "./backend/actions/createGame";
import { getOpenGamesList } from "./backend/actions/getGameList";
import { joinGame } from "./backend/actions/joinGame";
import { leaveGame } from "./backend/actions/leaveGame";
import { checkIfOngoingGame } from "./backend/actions/checkIfOngoingGame";
import { CREATE_GAME_STATUS, IuiCreateGameRequest, IuiCreateGameResponse } from "./frontend/src/interfaces/IuiNewGame";
import { IuiGetGameListRequest, IuiGetGameListResponse, IuiJoinLeaveGameRequest, IuiJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "./frontend/src/interfaces/IuiGameList";
import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameRequest, IuiCheckIfOngoingGameResponse } from "./frontend/src/interfaces/IuiCheckIfOngoingGame";
import { IuiChatObj } from "./frontend/src/interfaces/IuiChat";
import { IuiCardPlayedNotification, IuiGetGameInfoRequest, IuiGetGameInfoResponse, IuiGetRoundRequest, IuiGetRoundResponse, IuiMakePromiseRequest, IuiMakePromiseResponse, IuiPlayCardRequest, IuiPlayCardResponse, IuiPromiseMadeNotification, PLAY_CARD_RESPONSE, PROMISE_RESPONSE } from "./frontend/src/interfaces/IuiPlayingGame";
import { getGameInfo, getRound, makePromise, playCard } from "./backend/actions/playingGame";

// Routes
// not defined

const app: Application = express();
const server = http.createServer(app);
const io = new Server<ClientToServerEvents, ServerToClientEvents>(server);

dotenv.config();

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

    socket.on("create game", async (createGameRequest: IuiCreateGameRequest, fn: (createGameResponse: IuiCreateGameResponse) => void) => {
      const createGameResponse: IuiCreateGameResponse = await createGame(createGameRequest);
      if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
        const gameIdStr = createGameResponse.newGameId;
        socket.join(gameIdStr);
        csm.addUserToMap(createGameRequest.newGameMyName, socket.id, gameIdStr);
        io.emit("new game created", gameIdStr);
      }
      fn(createGameResponse);
    });

    socket.on("get games", async (getGameListRequest: IuiGetGameListRequest, fn: (getGameListResponse: IuiGetGameListResponse) => void) => {
      const getGameListResponse: IuiGetGameListResponse = await getOpenGamesList(getGameListRequest);
      fn(getGameListResponse);
    });

    socket.on("join game", async (joinGameRequest: IuiJoinLeaveGameRequest, fn: (joinResponse: IuiJoinLeaveGameResponse) => void) => {
      const gameIdStr = joinGameRequest.gameId;
      const joinResponse: IuiJoinLeaveGameResponse = await joinGame(joinGameRequest);
      if (joinResponse.joinLeaveResult !== JOIN_LEAVE_RESULT.notOk) {
        socket.join(gameIdStr);
        csm.addUserToMap(joinGameRequest.myName, socket.id, gameIdStr);
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

    socket.on("check if ongoing game", async (checkIfOngoingGameRequest: IuiCheckIfOngoingGameRequest, fn: (checkResponse: IuiCheckIfOngoingGameResponse) => void) => {
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
      fn(checkResponse);
    });

    socket.on("check game", async (getGameInfoRequest: IuiGetGameInfoRequest, fn: (gameInfoResponse: IuiGetGameInfoResponse) => void) => {
      // console.log("check game", getGameInfoRequest);
      if (getGameInfoRequest.gameId === "" || getGameInfoRequest.myId === "") {
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
      if (!gameIdStr || !makePromiseRequest.myId) {
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
      if (!gameIdStr || !playCardRequest.myId) {
        return null;
      }

      const playCardResponse = await playCard(playCardRequest);
      if (playCardResponse.playResponse === PLAY_CARD_RESPONSE.playOk) {
        const { playerName, playedFromSlot, newPlayAfterHit, gameStatusAfterPlay, roundStatusAfterPlay, playTime } = playCardResponse;
        const chatLine = `${playerName} hit card in ${(playTime/1000).toFixed(1)} seconds`;
        io.to(gameIdStr).emit("new chat line", chatLine);
        const cardPlayedNotification: IuiCardPlayedNotification = {
          playerName: playerName,
          playedFromSlot: playedFromSlot,
          currentRoundIndex: roundInd,
          newPlayAfterHit: newPlayAfterHit,
          gameStatusAfterPlay: gameStatusAfterPlay,
          roundStatusAfterPlay: roundStatusAfterPlay,
        };
        io.to(gameIdStr).emit("card played", cardPlayedNotification);
      }

      fn(playCardResponse);
    });

    socket.on("write chat", async (chatObj: IuiChatObj ) => {
      const gameIdStr = chatObj.gameId;
      const chatLine = chatObj.myName + ": " + chatObj.chatLine;
      console.log("sending new chat line", chatLine, gameIdStr);
      io.to(gameIdStr).emit("new chat line", chatLine);
    });
  });
});
