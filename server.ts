import express from 'express';
import { Application, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './backend/config/db';

import createGame from './backend/actions/createGame';
import { getOpenGamesList } from './backend/actions/getGameList';
import { joinGame } from './backend/actions/joinGame';
import { leaveGame } from './backend/actions/leaveGame';
import { CREATE_GAME_STATUS, ICreateGameRequest, ICreateGameResponse } from "./frontend/src/interfaces/INewGame";
import { IGetGameListRequest, IGetGameListResponse, IJoinLeaveGameRequest, IJoinLeaveGameResponse } from "./frontend/src/interfaces/IGameList";


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
app.get('/', (req: Request, res: Response) => {
  res.sendFile('index.html');
});

const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  server.listen(PORT, () => {
    console.log('server listening on *:' + PORT);
  });

  io.on("connection", (socket: Socket) => {
    console.log("connected!", socket.id);
    socket.on("disconnect", () => {
      console.warn("user disconnected", socket.id);
    });

    socket.on("create game", async (createGameRequest: ICreateGameRequest, fn: Function) => {
      const createGameResponse: ICreateGameResponse = await createGame(createGameRequest);
      if (createGameResponse.responseStatus === CREATE_GAME_STATUS.ok) {
        socket.join(createGameResponse.newGameId);
        io.emit("new game created", createGameResponse.newGameId);
      }
      fn(createGameResponse);
    });

    socket.on("get games", async (getGameListRequest: IGetGameListRequest, fn: Function) => {
      const getGameListResponse: IGetGameListResponse = await getOpenGamesList(getGameListRequest);
      fn(getGameListResponse);
    });

    socket.on("join game", async (joinGameRequest: IJoinLeaveGameRequest, fn: Function) => {
      const joinResponse: IJoinLeaveGameResponse = await joinGame(joinGameRequest);
      fn(joinResponse);
    });

    socket.on("leave game", async (leaveGameRequest: IJoinLeaveGameRequest, fn: Function) => {
      const leaveResponse: IJoinLeaveGameResponse = await leaveGame(leaveGameRequest);
      fn(leaveResponse);
    });
  })
});

