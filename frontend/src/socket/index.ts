import React, { useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./ISocket";

interface Context {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io({
  query: {
    token: window.localStorage.getItem("token")
  }
});

export const SocketContext = React.createContext<Context>({
  socket,
});

export const useSocket = () => useContext(SocketContext);
