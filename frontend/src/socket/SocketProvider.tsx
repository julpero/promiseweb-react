import React, { ReactNode, useRef } from "react";
import { io } from "socket.io-client";
import { SocketContext } from ".";

const PRWSocketCtxProvider = (props: { children?: ReactNode }) => {
  const socketRef = useRef(io({ autoConnect: true }));

  return (
    <SocketContext.Provider value={{ socket: socketRef.current }}>
      {props.children}
    </SocketContext.Provider>
  );
};

export default PRWSocketCtxProvider;
