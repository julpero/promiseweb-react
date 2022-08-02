import express from 'express';
import { Application, Request, Response } from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import connectDB from './backend/config/db';

import { INewGame } from "./frontend/src/interfaces/IGameOptions";

import bcrypt from 'bcrypt';


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

    socket.on("create game", (gameOptions: INewGame) => {
      console.log(gameOptions);
    })
  })
});

