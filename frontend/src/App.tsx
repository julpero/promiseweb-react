import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "./interfaces/IuiCheckIfOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameId, setGameId } from "./store/gameInfoSlice";
import { getUser, setUserLoggedIn } from "./store/userSlice";
import { IuiRefreshLoginResponse, IuiUserData, LOGIN_RESPONSE } from "./interfaces/IuiUser";
import { handleUnauthenticatedRequest } from "./common/userFunctions";

const App = () => {
  const [gameStatus, setGameStatus] = useState(CHECK_GAME_STATUS.noGame);
  const gameId = useSelector(getCurrentGameId);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const handleOnGoingResponse = useCallback((response: IuiCheckIfOngoingGameResponse) => {
    console.log("check response", response);
    if (response.isAuthenticated) {
      window.localStorage.setItem("token", response.token ?? "");
      setGameStatus(response.checkStatus);
      dispatch(setGameId(response.gameId ?? ""));
      dispatch(setUserLoggedIn({loggedIn: response.isAuthenticated ?? false, name: response.asAPlayer ?? ""}));
    } else {
      handleUnauthenticatedRequest(dispatch);
    }
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

    if (user.isUserLoggedIn) {
      const checkGameRequest: IuiUserData = {
        uuid: window.localStorage.getItem("uUID") ?? "",
        userName: user.userName,
      };
      socket.emit("check if ongoing game", checkGameRequest, handleOnGoingResponse);
    } else {
      const myId = getMyId();
      const token = getToken();
      if (myId && token) {
        // check if token is still valid
        const loginRequest: IuiUserData = {
          userName: "dummy",
          uuid: myId,
          token: token,
        };
        socket.emit("do refresh login", loginRequest, (loginResponse: IuiRefreshLoginResponse) => {
          if (loginResponse.loginStatus === LOGIN_RESPONSE.ok && loginResponse.isAuthenticated) {
            window.localStorage.setItem("token", loginResponse.token ?? "");
            dispatch(setUserLoggedIn({loggedIn: loginResponse.isAuthenticated ?? false, name: loginResponse.myName ?? ""}));
          }
        });
      }
    }

    socket.on("game begins", (gameId: string) => {
      console.log("game begins call");
      if (gameId !== "" && user.isUserLoggedIn) {
        setGameStatus(CHECK_GAME_STATUS.onGoingGame);
        dispatch(setGameId(gameId));
      }
    });

    return () => {
      socket.off("game begins");
    };
  }, [handleOnGoingResponse, user, dispatch, socket]);

  const onJoin = () => {
    if (user.isUserLoggedIn) {
      const checkGameRequest: IuiUserData = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
      };
      socket.emit("check if ongoing game", checkGameRequest, handleOnGoingResponse);
    }
  };

  console.log("render app...");

  if (gameStatus === CHECK_GAME_STATUS.onGoingGame && gameId !== "" && user.isUserLoggedIn) {
    return <GameTable gameId={gameId ?? ""} />;
  } else {
    return (
      <HomeScreen onJoin={onJoin} />
    );
  }
};

export default App;
