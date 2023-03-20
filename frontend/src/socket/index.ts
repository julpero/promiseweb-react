import React, { useContext } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./ISocket";

interface Context {
  socket: Socket<ServerToClientEvents, ClientToServerEvents>,
}

// console.log("import.meta.env", import.meta.env);
// console.log("window.location.host", window.location.host);
const socketUrl = import.meta.env.PROD ? "window.location.host" : "http://localhost:5000";
console.log("socketUrl", socketUrl);

export const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(socketUrl, {
  transports: ["websocket"],
});

export const SocketContext = React.createContext<Context>({
  socket,
});

export const useSocket = () => useContext(SocketContext);
