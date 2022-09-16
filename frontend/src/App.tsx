import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "./interfaces/IuiCheckIfOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameId, setGameId } from "./store/gameInfoSlice";
import { getUserName, isUserLoggedIn, setUserLoggedIn } from "./store/userSlice";
import { IuiUserData } from "./interfaces/IuiUser";

const App = () => {
  const [gameStatus, setGameStatus] = useState(CHECK_GAME_STATUS.noGame);
  const gameId = useSelector(getCurrentGameId);
  const userLoggedIn = useSelector(isUserLoggedIn);
  const userName = useSelector(getUserName);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const handleOnGoingResponse = useCallback((response: IuiCheckIfOngoingGameResponse) => {
    console.log("check response", response);
    setGameStatus(response.checkStatus);
    dispatch(setGameId(response.gameId ?? ""));
    dispatch(setUserLoggedIn({loggedIn: response.isAuthenticated ?? false, name: response.asAPlayer ?? ""}));
  }, [dispatch]);

  useEffect(() => {
    if (window.localStorage.getItem("uUID")) {
      console.log("has uUid:", window.localStorage.getItem("uUID"));
    } else {
      const uuid = uuidv4();
      console.log("uUID set: ", uuid);
      window.localStorage.setItem("uUID", uuid);
    }

    if (window.localStorage.getItem("token")) {
      console.log("has token:", window.localStorage.getItem("token"));
    } else {
      console.log("no token");
      dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
    }

    const checkGameRequest: IuiUserData = {
      uuid: window.localStorage.getItem("uUID") ?? "",
      userName: userName,
    };
    socket.emit("check if ongoing game", checkGameRequest, handleOnGoingResponse);

    socket.on("game begins", (gameId: string) => {
      console.log("game begins call");
      if (gameId !== "" && userLoggedIn) {
        setGameStatus(CHECK_GAME_STATUS.onGoingGame);
        dispatch(setGameId(gameId));
      }
    });

    return () => {
      socket.off("game begins");
    };
  }, [handleOnGoingResponse, userLoggedIn, userName, dispatch, socket]);

  const onJoin = () => {
    const checkGameRequest: IuiUserData = {
      uuid: window.localStorage.getItem("uUID") ?? "",
      userName: userName,
    };
    socket.emit("check if ongoing game", checkGameRequest, handleOnGoingResponse);
  };

  console.log("render app...");

  if (gameStatus === CHECK_GAME_STATUS.onGoingGame && gameId !== "" && userLoggedIn) {
    return <GameTable gameId={gameId ?? ""} />;
  } else {
    return (
      <HomeScreen onJoin={onJoin} />
    );
  }
};

export default App;
