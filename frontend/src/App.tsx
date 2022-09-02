import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameRequest, IuiCheckIfOngoingGameResponse } from "./interfaces/IuiCheckIfOngoingGame";

const App = () => {
  const [gameStatus, setGameStatus] = useState(CHECK_GAME_STATUS.noGame);
  const [gameId, setGameId] = useState("");

  const { socket } = useSocket();

  useEffect(() => {
    const handleOnGoingResponse = (response: IuiCheckIfOngoingGameResponse) => {
      console.log("check response", response);
      setGameStatus(response.checkStatus);
      setGameId(response.gameId ?? "");
    };

    if (window.localStorage.getItem("uUID")) {
      console.log("has uUid:", window.localStorage.getItem("uUID"));
    } else {
      const uuid = uuidv4();
      console.log("uUID set: ", uuid);
      window.localStorage.setItem("uUID", uuid);
    }

    const checkGameRequest: IuiCheckIfOngoingGameRequest = {
      myId: window.localStorage.getItem("uUID") ?? "",
    };
    socket.emit("check if ongoing game", checkGameRequest, handleOnGoingResponse);

    socket.on("game begins", (gameId: string) => {
      console.log("game begins call");
      if (gameId !== "") {
        setGameStatus(CHECK_GAME_STATUS.onGoingGame);
        setGameId(gameId);
      }
    });

    return () => {
      socket.off("game begins");
    };
  }, [socket]);

  console.log("render app...");

  if (gameStatus === CHECK_GAME_STATUS.onGoingGame && gameId !== "") {
    return <GameTable gameId={gameId ?? ""} />;
  } else {
    return <HomeScreen />;
  }
};

export default App;
