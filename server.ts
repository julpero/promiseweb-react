import express from "express";
import { Application, Request, Response } from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import connectDB from "./backend/config/db";

import createGame from "./backend/actions/createGame";
import { getOpenGamesList } from "./backend/actions/getGameList";
import { joinGame } from "./backend/actions/joinGame";
import { leaveGame } from "./backend/actions/leaveGame";
import { checkIfOngoingGame } from "./backend/actions/checkIfOngoingGame";
import { CREATE_GAME_STATUS, ICreateGameRequest, ICreateGameResponse } from "./frontend/src/interfaces/INewGame";
import { IGetGameListRequest, IGetGameListResponse, IJoinLeaveGameRequest, IJoinLeaveGameResponse, JOIN_LEAVE_RESULT } from "./frontend/src/interfaces/IGameList";
import { CHECK_GAME_STATUS, ICheckIfOngoingGameRequest, ICheckIfOngoingGameResponse } from "./frontend/src/interfaces/ICheckIfOngoingGame";
import { IChatObj } from "./frontend/src/interfaces/IChat";
import { IGetGameInfoRequest, IGetGameInfoResponse, IGetRoundRequest, IGetRoundResponse } from "./frontend/src/interfaces/IPlayingGame";
import { getGameInfo, getRound } from "./backend/actions/playingGame";

// Routes
// not defined

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server);

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
    });

    socket.on("create game", async (createGameRequest: ICreateGameRequest, fn: (createGameResponse: ICreateGameResponse) => void) => {
      const createGameResponse: ICreateGameResponse = await createGame(createGameRequest);
      if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
        socket.join(createGameResponse.newGameId);
        io.emit("new game created", createGameResponse.newGameId);
      }
      fn(createGameResponse);
    });

    socket.on("get games", async (getGameListRequest: IGetGameListRequest, fn: (getGameListResponse: IGetGameListResponse) => void) => {
      const getGameListResponse: IGetGameListResponse = await getOpenGamesList(getGameListRequest);
      fn(getGameListResponse);
    });

    socket.on("join game", async (joinGameRequest: IJoinLeaveGameRequest, fn: (joinResponse: IJoinLeaveGameResponse) => void) => {
      const gameIdStr = joinGameRequest.gameId;
      const joinResponse: IJoinLeaveGameResponse = await joinGame(joinGameRequest);
      if (joinResponse.joinLeaveResult !== JOIN_LEAVE_RESULT.notOk) {
        socket.join(gameIdStr);
        // notify other users
        io.emit("game list updated");
      }
      if (joinResponse.joinLeaveResult === JOIN_LEAVE_RESULT.lastOk) {
        // notify all games players about game start
        io.to(gameIdStr).emit("game begins", gameIdStr);
      }
      fn(joinResponse);
    });

    socket.on("leave game", async (leaveGameRequest: IJoinLeaveGameRequest, fn: (leaveResponse: IJoinLeaveGameResponse) => void) => {
      const leaveResponse: IJoinLeaveGameResponse = await leaveGame(leaveGameRequest);
      if (leaveResponse.joinLeaveResult === JOIN_LEAVE_RESULT.ok) {
        socket.leave(leaveGameRequest.gameId);
        // notify other users
        io.emit("game list updated");
      }
      fn(leaveResponse);
    });

    socket.on("check if ongoing game", async (checkIfOngoingGameRequest: ICheckIfOngoingGameRequest, fn: (checkResponse: ICheckIfOngoingGameResponse) => void) => {
      const checkResponse: ICheckIfOngoingGameResponse = await checkIfOngoingGame(checkIfOngoingGameRequest);
      switch (checkResponse.checkStatus) {
        case CHECK_GAME_STATUS.joinedGame:
        case CHECK_GAME_STATUS.onGoingGame:
        case CHECK_GAME_STATUS.observedGame: {
          const gameIdStr = checkResponse.gameId ?? "";
          const playerName = checkResponse.asAPlayer ?? "";
          socket.join(gameIdStr);
          const chatLine = playerName + " joined game!";
          console.log("sending new chat line", chatLine, gameIdStr);
          io.to(gameIdStr).emit("new chat line", chatLine);

          break;
        }
      }
      fn(checkResponse);
    });

    socket.on("check game", async (getGameInfoRequest: IGetGameInfoRequest, fn: (gameInfoResponse: IGetGameInfoResponse) => void) => {
      console.log("check game", getGameInfoRequest);
      if (getGameInfoRequest.gameId === "" || getGameInfoRequest.myId === "") {
        return null;
      }
      const gameInfoResponse: IGetGameInfoResponse | null = await getGameInfo(getGameInfoRequest);
      console.log("gameInfoResponse", gameInfoResponse);
      if (gameInfoResponse === null) {
        return null;
      }

      fn(gameInfoResponse);
    });

    socket.on("get round", async (getRoundObj: IGetRoundRequest, fn: (roundResponse: IGetRoundResponse) => void) => {
      console.log("get round", getRoundObj);
      if (getRoundObj.gameId === "") {
        return null;
      }
      const roundResponse: IGetRoundResponse | null = await getRound(getRoundObj);
      console.log("roundResponse", roundResponse);
      if (roundResponse === null) {
        return null;
      }

      fn(roundResponse);
    });

    socket.on("write chat", async (chatObj: IChatObj ) => {
      const gameIdStr = chatObj.gameId;
      const chatLine = chatObj.myName + ": " + chatObj.chatLine;
      console.log("sending new chat line", chatLine, gameIdStr);
      io.to(gameIdStr).emit("new chat line", chatLine);
    });
  });
});
