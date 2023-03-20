import React, { useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./ISocket";

interface Context {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
}

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = import.meta.env.PROD
? io()
: io("http://localhost:5000", {
  transports: ["websocket"],
});

export const SocketContext = React.createContext<Context>({
  socket,
});

export const useSocket = () => useContext(SocketContext);
