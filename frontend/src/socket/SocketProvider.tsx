import React, { createContext, ReactNode, useMemo, useState } from "react";
import { io, Socket } from "socket.io-client";
import { ClientToServerEvents, ServerToClientEvents } from "./ISocket";
// import { ISocketContext, SocketContext } from ".";

export interface ISocketContext {
  socket: Socket<ServerToClientEvents, ClientToServerEvents> | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSocket: (newValue: any) => void
}

export const SocketContext = createContext<ISocketContext>({
  socket: null,
  // socket: io({
  //   query: {
  //     // this is set to per connection, so when we have authenticated,
  //     // we have to disconnect and connect again
  //     token: window.localStorage.getItem("token") ?? "",
  //   }
  // }),

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setSocket: () => {},
});

const PRWSocketCtxProvider = (props: { children?: ReactNode }) => {
  const [socket, setSocket] = useState(io({
    query: {
      // this is set to per connection, so when we have authenticated,
      // we have to disconnect and connect again
      token: window.localStorage.getItem("token") ?? "",
    }
  }));
  // const value = useMemo(
  //   () => ({socket, setSocket}), [socket]
  // );
  const value = {socket, setSocket};

  return (
    <SocketContext.Provider value={value}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default PRWSocketCtxProvider;
