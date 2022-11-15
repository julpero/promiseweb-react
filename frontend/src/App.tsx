import React, { useCallback, useEffect, useState } from "react";
import { useSocket } from "./socket";

import "./App.css";
import { v4 as uuidv4 } from "uuid";

import HomeScreen from "./screens/HomeScreen";
import GameTable from "./screens/GameTable";

import { CHECK_GAME_STATUS, IuiCheckIfOngoingGameResponse } from "./interfaces/IuiCheckIfOngoingGame";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentGameId, setGameId } from "./store/gameInfoSlice";
import { getUser, setUserLoggedIn, setConnectionState } from "./store/userSlice";
import { IuiRefreshLoginResponse, IuiUserData, LOGIN_RESPONSE } from "./interfaces/IuiUser";
import { handleAuthenticatedRequest, handleUnauthenticatedRequest } from "./common/userFunctions";
import { IuiGameBeginsNotification } from "./interfaces/IuiPlayingGame";
import { setSpinnerVisible } from "./store/spinnerSlice";
import { Button, Modal } from "react-bootstrap";

const App = () => {
  const [gameStatus, setGameStatus] = useState(CHECK_GAME_STATUS.noGame);
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const gameId = useSelector(getCurrentGameId);
  const user = useSelector(getUser);

  const dispatch = useDispatch();

  const { socket } = useSocket();

  const getMyId = (): string => window.localStorage.getItem("uUID") ?? "";
  const getToken = (): string => window.localStorage.getItem("token") ?? "";

  const handleOnGoingResponse = useCallback((response: IuiCheckIfOngoingGameResponse) => {
    console.log("check response", response);
    if (response.isAuthenticated) {
      handleAuthenticatedRequest(response.token);
      setGameStatus(response.checkStatus);
      if (response.gameId) {
        dispatch(setGameId(response.gameId ?? ""));
      }
    } else {
      handleUnauthenticatedRequest(dispatch);
    }
  }, [dispatch]);


  useEffect(() => {
    const showDisconnect = () => {
      // console.log("going to show disconnected modal", user.isUserLoggedIn, user.connected);
      if (user.isUserLoggedIn && !user.connected) {
        setShowConnectionModal(true);
      }
    };

    if (window.localStorage.getItem("uUID")) {
      // console.log("has uUid:", window.localStorage.getItem("uUID"));
    } else {
      const uuid = uuidv4();
      // console.log("uUID set: ", uuid);
      window.localStorage.setItem("uUID", uuid);
    }

    if (window.localStorage.getItem("token")) {
      // console.log("has token:", window.localStorage.getItem("token"));
    } else {
      // console.log("no token");
      if (user.isUserLoggedIn) {
        dispatch(setUserLoggedIn({loggedIn: false, name: ""}));
      }
    }

    if (user.isUserLoggedIn) {
      const checkGameRequest: IuiUserData = {
        uuid: getMyId(),
        userName: user.userName,
        token: getToken(),
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
          console.log(loginResponse);
          dispatch(setSpinnerVisible(false));
          if (loginResponse.loginStatus === LOGIN_RESPONSE.ok && loginResponse.isAuthenticated) {
            handleAuthenticatedRequest(loginResponse.token);
            dispatch(setUserLoggedIn({loggedIn: loginResponse.isAuthenticated ?? false, name: loginResponse.myName ?? ""}));
          }
        });
      } else {
        dispatch(setSpinnerVisible(false));
      }
    }

    socket.on("game begins", (gameBeginsNotification: IuiGameBeginsNotification) => {
      // console.log("game begins call");
      if (gameBeginsNotification.gameId !== "" && user.isUserLoggedIn) {
        setGameStatus(gameBeginsNotification.asAObserver ? CHECK_GAME_STATUS.observedGame : CHECK_GAME_STATUS.onGoingGame);
        dispatch(setGameId(gameBeginsNotification.gameId));
      }
    });

    socket.on("disconnect", () => {
      // console.log("DISCONNECTED", user.isUserLoggedIn);
      if (user.isUserLoggedIn) {
        dispatch(setConnectionState(false));
        setTimeout(showDisconnect, 5000);
      }
    });

    socket.on("connect", () => {
      // console.log("CONNECTED", user.isUserLoggedIn);
      if (user.isUserLoggedIn) {
        setShowConnectionModal(false);
        dispatch(setConnectionState(true));
      }
    });

    return () => {
      socket.off("game begins");
      socket.off("disconnect");
      socket.off("connect");
    };
  }, [handleOnGoingResponse, user, dispatch, socket]);

  // console.log("render app...");

  return (
    <React.Fragment>
      {(((gameStatus === CHECK_GAME_STATUS.onGoingGame || gameStatus === CHECK_GAME_STATUS.observedGame) && gameId !== "" && user.isUserLoggedIn)) &&
        <GameTable />
      }
      {(!user.isUserLoggedIn || gameId === "" || (gameStatus !== CHECK_GAME_STATUS.onGoingGame && gameStatus !== CHECK_GAME_STATUS.observedGame)) &&
        <HomeScreen />
      }

      <Modal
        show={showConnectionModal}
      >
        <Modal.Header>
          <Modal.Title>
          Connection error!
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Ou nou...</p>
          <p>Something bad happened - your connection to the Promise Web backend has just disconnected.</p>
          <p>All you can do is just wait or refresh page and hope that all will be good again :)</p>
        </Modal.Body>
      </Modal>

    </React.Fragment>
  );
};

export default App;
